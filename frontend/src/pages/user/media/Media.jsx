import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import IconButton from '@mui/material/IconButton'
import InfoIcon from '@mui/icons-material/Info'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Input, Spin, Empty, message } from 'antd'
import { LoadingOutlined, SelectOutlined } from '@ant-design/icons'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDisplay, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import Rename from "./MediaRename"
import Delete from './MediaDelete'
import Caption from "./MediaCaption"
import { fetchAllMediasOfAlbum } from "../../../services/mediaService"
import { updateAlbum } from '../../../services/albumService'


function Media() {
    const { albumId } = useParams()
    const [columns, setColumns] = useState(3)
    const [medias, setMedias] = useState([])
    const [filteredMedias, setFilteredMedias] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchValue, setSearchValue] = useState('')

    const [activeSelect, setActiveSelect] = useState(false)
    const [selectedMedias, setSelectedMedias] = useState([])

    const [openDelete, setOpenDelete] = useState(false)
    const [openRename, setOpenRename] = useState(false)

    const [openCaption, setOpenCaption] = useState(false)
    const [selectedMediaCaption, setSelectedMediaCaption] = useState()

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 800) {
                setColumns(1)
            } else if (window.innerWidth > 800 && window.innerWidth <= 1250) {
                setColumns(2)
            } else {
                setColumns(4)
            }
        }

        window.addEventListener('resize', handleResize)
        handleResize()

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const data = await fetchAllMediasOfAlbum(albumId, localStorage.getItem('at'))
                setMedias(data)
                setFilteredMedias(data)
            } catch (err) {
                console.error(err.message)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [albumId])

    const handleSearch = (value) => {
        const searchTerm = value.toLowerCase().trim()
        if (!searchTerm) {
            setFilteredMedias(medias)
            return
        }
        
        const results = medias.filter(item => 
            item.media_name.toLowerCase().includes(searchTerm)
        )
        setFilteredMedias(results)
    }                                                                                                                     

    const handleClickSelect = () => {
        if (activeSelect) {
            setSelectedMedias([])
        }
        setActiveSelect(!activeSelect)
    }


    const handleClickMedia = (mediaId) => {
        if (activeSelect) {
            if (selectedMedias.includes(mediaId)) {
                setSelectedMedias(prev => prev.filter(id => id !== mediaId));
            } else {
                setSelectedMedias(prev => [...prev, mediaId])
            }
        }
    }

    const handleUpdateThumbnailUrl = async () => {
        const mediaId = selectedMedias[0]
        const thumbnailUrl = medias.find(media => media.media_id === mediaId).media_url
        try {
            const album = {
                album_id: albumId,
                thumbnail_url: thumbnailUrl
            }

            await updateAlbum(album, localStorage.getItem('at'))
            message.success('')
        } catch (err) {
            message.error('')
            console.log(err.message)
        }

    }

    const successDelete = async () => {
        fetchAllMediasOfAlbum(albumId, localStorage.getItem('at')).then(data => {
            setMedias(data)
            setFilteredMedias(data) 
            setActiveSelect(false)           
            setSelectedMedias([])
        })
        .catch(err => console.error(err.message))
    }

    const successRename = async () => {
        fetchAllMediasOfAlbum(albumId, localStorage.getItem('at')).then(data => {
            setMedias(data)
            setFilteredMedias(data) 
            setActiveSelect(false)           
            setSelectedMedias([])
        })
        .catch(err => console.error(err.message))
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            </div>
        )
    }

    return (
        <div className='flex flex-col items-center w-full h-full relative'>
            <div className='w-full max-w-[1860px] flex items-center gap-2.5 p-2'>
                <Input.Search
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onSearch={handleSearch}
                    placeholder='Tìm kiếm hình ảnh'
                    enterButton
                    allowClear
                    style={{ width: '100%' }}
                />

                <div 
                    className={`cursor-pointer py-1.5 px-2.5 w-[85px] rounded-2xl flex gap-1.5 items-center justify-center whitespace-nowrap transition-all duration-300 ease-in-out transform
                        ${activeSelect ? 'bg-red-500 hover:bg-red-400' : 'bg-blue-500 hover:bg-blue-400'}
                        text-white`}
                    onClick={handleClickSelect}
                >
                    <SelectOutlined />
                    <span>{activeSelect ? 'Hủy' : 'Chọn'}</span>
                </div>
            </div>

            <div className='w-full h-full max-w-[1860px] bg-[#20262E] p-2.5 overflow-auto'>
                {filteredMedias.length > 0 ? (
                    <ImageList variant="masonry" cols={columns} gap={20}>
                        {filteredMedias.map(({media_id, media_url, media_name}) => (
                            <ImageListItem key={media_id}>
                                <div className={`bg-[#10161d] p-2.5 rounded-2xl ${activeSelect ? 'cursor-pointer' : ''}`} onClick={() => handleClickMedia(media_id)}>                                
                                    <LazyLoadImage 
                                        src={media_url}
                                        alt={media_name}
                                        className="min-h-40 object-cover rounded-xl w-full"
                                    />

                                    <ImageListItemBar
                                        sx={{
                                            textAlign: 'left',
                                            borderTopLeftRadius: '16px',
                                            borderTopRightRadius: '16px',
                                            caretColor: 'transparent'
                                        }}
                                        title={<p className="caret-transparent">{media_name}</p>}
                                        position="top"
                                        actionIcon={
                                            <>
                                            <IconButton
                                                sx={{ color: 'white' }}
                                                aria-label={`info ${media_name}`}
                                                onClick={() => {
                                                    setOpenCaption(true)
                                                    setSelectedMediaCaption(media_id)
                                                }}
                                            >
                                                <InfoIcon />
                                            </IconButton>

                                            {activeSelect && <IconButton
                                            sx={{ color: 'white', position: 'absolute', top: 5, right: 0 }}
                                            >
                                            {selectedMedias.includes(media_id) ? <CheckCircleOutlineOutlinedIcon /> : <CircleOutlinedIcon/>}
                                            </IconButton>}
                                            </>
                                        }
                                        actionPosition="left"
                                    />
                                </div>
                            </ImageListItem>
                        ))}
                    </ImageList>
                ) : (
                    <div className="flex flex-col items-center justify-center w-full h-64">
                        <Empty 
                            description={<h2 className="text-white text-xl">Không tìm thấy dữ liệu</h2>}
                            image={Empty.PRESENTED_IMAGE_SIMPLE} 
                        />
                    </div>
                )}
            </div>

            {activeSelect && <div className='absolute bottom-0 w-full h-[48px] bg-slate-800 flex items-center gap-8 justify-center text-slate-200'>
                <button 
                    className={`
                        flex flex-col items-center gap-[3px] transition-colors duration-200 mt-[6px]
                        ${selectedMedias.length != 1 ? '!cursor-default text-gray-500 opacity-50' : 'hover:text-yellow-400'
                        }`
                    }                    
                    disabled={selectedMedias.length != 1}
                    onClick={() => setOpenRename(true)} 
                >
                    <FontAwesomeIcon icon={faPen} className='text-[17px]' />
                    <span className='text-xs'>Rename</span>
                </button>

                <button 
                    className={`
                        flex flex-col items-center gap-[3px] transition-colors duration-200 mt-[6px]
                        ${selectedMedias.length != 1 ? '!cursor-default text-gray-500 opacity-50' : 'hover:text-yellow-400'
                        }`
                    }                    
                    disabled={selectedMedias.length != 1}
                    onClick={handleUpdateThumbnailUrl} 
                >
                    <FontAwesomeIcon icon={faDisplay} className='text-[17px]' />
                    <span className='text-xs'>Set Cover</span>
                </button>

                <button 
                    className={`
                        flex flex-col items-center gap-[3px] transition-colors duration-200 mt-[6px]
                        ${selectedMedias.length == 0 ? '!cursor-default text-gray-500 opacity-50' : 'hover:text-rose-400'}`}
                    disabled={selectedMedias.length == 0}
                    onClick={() => setOpenDelete(true)}
                >
                    <FontAwesomeIcon icon={faTrash} className='text-[17px]' />
                    <span className='text-xs'>Delete</span>
                </button>
            </div>}

            <Delete
                openDelete={openDelete}
                selectedMedias={selectedMedias}
                setOpenDelete={setOpenDelete}
                onSuccess={successDelete}
            />

            <Rename
                openRename={openRename}
                setOpenRename={setOpenRename}
                selectedMedias={selectedMedias}
                onSuccess={successRename}
            />

            {selectedMediaCaption && <Caption
                openCaption={openCaption}
                setOpenCaption={setOpenCaption}
                selectedMediaId={selectedMediaCaption}
                setSelectedMediaId={setSelectedMediaCaption}
            />}
        </div>
    )
}


export default Media
