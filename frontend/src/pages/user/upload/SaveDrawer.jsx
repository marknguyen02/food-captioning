import { useState, useEffect, useCallback, useMemo } from "react"
import { Drawer, Input, AutoComplete, Button, Checkbox, message } from "antd"
import { CloseOutlined, SearchOutlined } from '@ant-design/icons'
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { fetchAllAlbums } from "../../../services/albumService"
import { createMediaMetadata, addMediaFile } from "../../../services/mediaService"
import Creation from "../album/AlbumCreation"
import { useSelector } from "react-redux"

const SaveDrawer = ({ openSaveCard, setOpenSaveCard, hasSaved, setHasSaved, caption, file }) => {
    const isDarkMode = useSelector((state) => state.app.mode) === 'dark'
    
    // State management
    const [allAlbums, setAllAlbums] = useState([])
    const [filteredAlbums, setFilteredAlbums] = useState([])
    const [selectedId, setSelectedId] = useState()
    const [searchValue, setSearchValue] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [mediaName, setMediaName] = useState('')
    const [columns, setColumns] = useState(3)
    const [openCreation, setOpenCreation] = useState(false)   
    const [isLoadingButton, setIsLoadingButton] = useState(false)

    const searchOptions = useMemo(() => 
        allAlbums.map(collection => ({
            value: collection.album_name,
            label: collection.album_name,
            id: collection.album_id
        })), [allAlbums]
    )

    const themeClasses = useMemo(() => ({
        drawer: isDarkMode ? "!bg-[#1E293B]" : "!bg-gray-50",
        text: isDarkMode ? 'text-gray-200' : 'text-gray-700',
        input: isDarkMode 
            ? 'bg-gray-800 border-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:border-cyan-500' 
            : 'bg-white border-gray-300 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-cyan-600',
        closeIcon: isDarkMode 
            ? '!text-white hover:!text-red-600' 
            : '!text-gray-700 hover:!text-red-600',
        searchIcon: isDarkMode ? "text-gray-400" : "text-gray-500",
        albumBg: isDarkMode ? 'bg-[#263957]' : 'bg-[#E6EEF9]',
        albumText: isDarkMode ? "text-gray-300 text-sm" : "text-gray-700 text-sm",
        emptyState: isDarkMode ? 'text-gray-400' : 'text-gray-500',
        checkbox: isDarkMode ? "text-white" : "text-gray-800"
    }), [isDarkMode])

    const fetchAlbumsData = useCallback(async () => {
        if (!openSaveCard) return
        
        try {
            setIsLoading(true)
            const data = await fetchAllAlbums(localStorage.getItem('at'))
            setAllAlbums(data)
            setFilteredAlbums(data)
        } catch (err) {
            console.error(err.message)
            message.error("Không thể tải danh sách album")
        } finally {
            setIsLoading(false)
        }
    }, [openSaveCard])

    const handleResize = useCallback(() => {
        const width = window.innerWidth
        setColumns(width <= 550 ? 1 : width <= 1024 ? 2 : 3)
    }, [])

    const handleSearch = useCallback((value) => {
        setSearchValue(value)
        
        if (!value) {
            setFilteredAlbums(allAlbums)
            return
        }

        const searchTerm = value.toLowerCase()
        const filtered = allAlbums.filter(collection => 
            collection.album_name.toLowerCase().includes(searchTerm)
        )
        setFilteredAlbums(filtered)
    }, [allAlbums])

    const handleSelectCollection = useCallback((value, option) => {
        setSearchValue(value)
        setSelectedId(option.id)
        
        const selected = allAlbums.filter(c => c.album_id === option.id)
        if (selected.length > 0) {
            setFilteredAlbums(selected)
        }
    }, [allAlbums])

    const handleAlbumClick = useCallback((albumId) => {
        setSelectedId(prevId => prevId === albumId ? undefined : albumId)
    }, [])

    const handleSaveFile = useCallback(async () => {
        if (!selectedId) {
            message.error("Please select an album.")
            return
        }

        if (hasSaved) {
            message.error('You have already saved a file.')
            return
        }

        const formData = {
            album_id: selectedId,
            media_type: caption.label,
            caption: caption.caption,
            media_name: mediaName || 'Untitled',
            ...(caption.name && { name: caption.name }),
            ...(caption.instructions?.length > 0 && { instructions: caption.ingredients }),
            ...(caption.ingredients?.length > 0 && { ingredients: caption.instructions }),
        }

        setIsLoadingButton(true)
        try {
            const response = await addMediaFile(file, localStorage.getItem('at'))
            formData.media_url = response.media_url
            await createMediaMetadata(formData, localStorage.getItem('at'))
            setHasSaved(true)
            message.success("Saved successfully!")
        } catch (err) {
            message.error("Failed to save. Please try again!")
            console.log(err.message)
        } finally {
            setIsLoadingButton(false)
            resetForm()
        }
    }, [selectedId, hasSaved, caption, mediaName, file, setHasSaved])

    const resetForm = useCallback(() => {
        setMediaName('')
        setSelectedId()
        setSearchValue('')
        setOpenSaveCard(false)
    }, [setOpenSaveCard])

    const handleCreateAlbumSuccess = useCallback(async () => {
        try {
            const data = await fetchAllAlbums(localStorage.getItem('at'))
            setAllAlbums(data)
            setFilteredAlbums(data)
            setOpenCreation(false)
        } catch (err) {
            console.error(err.message)
        }
    }, [])

    useEffect(() => {
        fetchAlbumsData()
    }, [fetchAlbumsData])

    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [handleResize])

    return (
        <>
            <Drawer 
                title={
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-400">
                        Chọn Album
                    </span>
                }
                open={openSaveCard}
                onClose={resetForm}
                placement="right"
                width="min(750px, 100vw)"
                className={themeClasses.drawer}
                loading={isLoading}
                extra={
                    <Button 
                        type="primary" 
                        onClick={handleSaveFile} 
                        loading={isLoadingButton} 
                    >
                        Save
                    </Button>
                }
                closeIcon={
                    <CloseOutlined 
                        className={`hover:scale-105 transform ${themeClasses.closeIcon}`} 
                    />
                }
            >
                <div className={`flex flex-col gap-5 w-full h-full overflow-auto ${themeClasses.text}`}>
                    <Input
                        placeholder="Enter the image name"
                        className={`p-3 rounded-xl transition-all duration-300 ${themeClasses.input}`}
                        onChange={(e) => setMediaName(e.target.value)}
                        value={mediaName}
                        allowClear={false}
                    />
                    
                    <AutoComplete
                        value={searchValue}
                        options={searchOptions}
                        onChange={handleSearch}
                        onSelect={handleSelectCollection}
                        className="w-full"
                        placeholder="Search album"
                        allowClear={false}
                        filterOption={false}
                    >
                        <Input 
                            suffix={<SearchOutlined className={themeClasses.searchIcon} />}
                            placeholder="Search album"
                            className={`p-3 rounded-xl transition-all duration-300 ${themeClasses.input}`}
                        />
                    </AutoComplete>
                    
                    {filteredAlbums.length > 0 && (
                        <ImageList 
                            cols={columns} 
                            gap={columns === 1 ? 8 : columns === 2 ? 12 : 20} 
                            className="!p-4 sm:!p-2 lg:!p-3 mt-1.5 max-h-full not-md:!gap-[18px]"
                        >
                            {filteredAlbums.map(({ album_id, album_name, thumbnail_url }) => (
                                <ImageListItem 
                                    key={album_id} 
                                    className={`relative cursor-pointer rounded-xl transition-transform transform hover:scale-105 
                                        shadow-xl max-w-full ${selectedId === album_id ? 'ring-4 ring-cyan-500' : 'opacity-90'}`}
                                    onClick={() => handleAlbumClick(album_id)}
                                >
                                    <div className={`flex flex-col justify-center p-2 rounded-xl ${themeClasses.albumBg}`}>
                                        <LazyLoadImage 
                                            src={thumbnail_url}
                                            className="h-40 w-full max-w-full object-cover rounded-lg aspect-square"
                                        />
                                        <ImageListItemBar
                                            title={<p className={themeClasses.albumText}>{album_name}</p>}
                                            position="below"
                                            className="rounded-b-xl text-center"
                                        />
                                    </div>
                                    <div className="absolute top-2 right-2">
                                        <Checkbox 
                                            checked={selectedId === album_id} 
                                            className={themeClasses.checkbox} 
                                        />
                                    </div>
                                </ImageListItem>
                            ))}
                        </ImageList>
                    )}
                    
                    {filteredAlbums.length === 0 && !isLoading && (
                        <div className={`flex flex-col items-center justify-center p-8 gap-4 ${themeClasses.emptyState}`}>
                            <h2>Album not found</h2>
                            <Button
                                type="primary"
                                onClick={() => setOpenCreation(true)}
                            >
                                Create new album
                            </Button>
                        </div>
                    )}
                </div>
            </Drawer>

            <Creation
                openCreation={openCreation}
                setOpenCreation={setOpenCreation}
                onSuccess={handleCreateAlbumSuccess}
            />
        </>
    )
}

export default SaveDrawer