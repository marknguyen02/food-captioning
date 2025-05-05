import { useState, useEffect } from "react";
import { Drawer, Input, AutoComplete, Button, Checkbox } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { fetchAllAlbums } from "../../../services/albumService";
import { createMediaMetadata, addMediaFile } from "../../../services/mediaService";
import { message } from "antd";
import Creation from "../album/AlbumCreation";


const SaveDrawer = ({ openSaveCard, setOpenSaveCard, hasSaved, setHasSaved, caption, file }) => {
    const [allAlbums, setAllAlbums] = useState([]);
    const [filteredAlbums, setFilteredAlbums] = useState([]);
    const [selectedId, setSelectedId] = useState();
    const [searchValue, setSearchValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [mediaName, setMediaName] = useState();
    const [searchOptions, setSearchOptions] = useState([]);
    const [columns, setColumns] = useState(3);
    const [openCreation, setOpenCreation] = useState(false);   

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAllAlbums(localStorage.getItem('at'));
                setAllAlbums(data);
                setFilteredAlbums(data);

                const options = data.map(collection => ({
                    value: collection.album_name,
                    label: collection.album_name,
                    id: collection.album_id
                }));
                setSearchOptions(options);
            } catch (error) {
                console.error('Error fetching Albums:', error);
            }
        };

        if (openSaveCard) {
            fetchData();
        }
    }, [openSaveCard]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 256) {
                setColumns(1);
            } else if (window.innerWidth <= 1024) {
                setColumns(2);
            } else {
                setColumns(3);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSearch = (value) => {
        setSearchValue(value);

        if (!value) {
            setFilteredAlbums(allAlbums);
            return;
        }

        const searchTerm = value.toLowerCase();
        const filtered = allAlbums.filter(collection => 
            collection.album_name.toLowerCase().includes(searchTerm)
        );

        setFilteredAlbums(filtered);
    };

    const handleSelectCollection = (value, option) => {
        setSearchValue(value);
        setSelectedId(option.id);

        const selected = allAlbums.filter(c => c.album_id === option.id);
        if (selected.length > 0) {
            setFilteredAlbums(selected);
        }
    };

    const handleSaveFile = async () => {
        if (!selectedId) {
            message.error("Please select an album.");
            return;
        }

        if (hasSaved) {
            message.error('You have already saved a file.');
            return;
        }

        const formData = {
            album_id: selectedId,
            media_type: caption.label,
            caption: caption.title,
            ...(caption.instructions.length > 0 && { instructions: caption.ingredients }),
            ...(caption.ingredients.length > 0 && { ingredients: caption.instructions }),
        };

        if (mediaName) {
            formData.media_name = mediaName;
        } else {
            formData.media_name = 'Untitled';
        }

        setIsLoading(true);
        try {
            const response = await addMediaFile(file, localStorage.getItem('at'));
            formData.media_url = response.media_url;
            await createMediaMetadata(formData, localStorage.getItem('at'));
            setHasSaved(true);
            message.success({ content: "Saved successfully!" }); 
        } catch (err) {
            message.error({ content: "Failed to save. Please try again!" });
            console.log(err.message);
        } finally {
            setIsLoading(false);
            setMediaName();
            setSelectedId();
            setSearchValue('');
            setOpenSaveCard(false);
        }
    };

    const resetAndCloseDrawer = () => {
        setOpenSaveCard(false);
        setMediaName();
        setSelectedId();
        setSearchValue('');
    };

    const successCreateAlbum = () => {
        fetchAllAlbums(localStorage.getItem('at')).then(data => {
            setAllAlbums(data)
            setFilteredAlbums(data)
            setOpenCreation(false)
        })
        .catch(err => console.error(err.message))
    }

    return (
        <>
            <Drawer 
                title={
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-400">
                        Chọn Album
                    </span>
                }
                open={openSaveCard}
                onClose={resetAndCloseDrawer}
                placement="right"
                width="min(650px, 100vw)"
                className="!bg-[#1E293B]"
                extra={
                    <Button 
                        type="primary" 
                        onClick={handleSaveFile} 
                        loading={isLoading} 
                        disabled={isLoading}
                    >
                        Lưu
                    </Button>
                }
            >
                <div className="flex flex-col gap-5 w-full h-full overflow-auto">
                    <Input
                        placeholder="Nhập tên hình ảnh"
                        className="p-3 bg-gray-800 border-gray-700 rounded-xl text-gray-300 placeholder-gray-400 
                            focus:outline-none focus:border-cyan-500 transition-all duration-300"
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
                        placeholder="Tìm kiếm album"
                        allowClear={false}
                        filterOption={false}
                    >
                        <Input 
                            suffix={<SearchOutlined className="text-gray-400" />}
                            placeholder="Tìm kiếm album"
                            className="p-3 bg-gray-800 border-gray-700 rounded-xl text-gray-300 placeholder-gray-400 
                                focus:outline-none focus:border-cyan-500 transition-all duration-300"
                        />
                    </AutoComplete>
                    <ImageList 
                        cols={columns} 
                        gap={columns === 1 ? 8 : columns === 2 ? 12 : 20} 
                        className="!p-4 sm:!p-2 lg:!p-3 mt-1.5 max-h-full"
                    >
                        {filteredAlbums.map(({ album_id, album_name, thumbnail_url }) => (
                            <ImageListItem 
                                key={album_id} 
                                className={`relative cursor-pointer rounded-xl transition-transform transform hover:scale-105 
                                    shadow-xl max-w-full ${selectedId === album_id ? 'ring-4 ring-cyan-500' : 'opacity-90'}`}
                                onClick={() => {
                                    setSelectedId(selectedId === album_id ? undefined : album_id);
                                }}
                            >
                                <div className="flex flex-col justify-center bg-[#1E293B] p-2 rounded-xl">
                                    <LazyLoadImage 
                                        src={thumbnail_url}
                                        className="h-40 w-full max-w-full object-cover rounded-lg aspect-square"
                                    />
                                    <ImageListItemBar
                                        title={<p className="text-gray-300 text-sm">{album_name}</p>}
                                        position="below"
                                        className="text-gray-300 rounded-b-xl text-center"
                                    />
                                </div>
                                <div className="absolute top-2 right-2">
                                    <Checkbox checked={selectedId === album_id} className="text-white" />
                                </div>
                            </ImageListItem>
                        ))}
                    </ImageList>
                    {filteredAlbums.length === 0 && (
                        <div className="flex flex-col items-center justify-center p-8 text-gray-400 gap-4">
                            <h2>Không có album nào</h2>
                            <Button
                                type="primary"
                                onClick={() => setOpenCreation(true)}
                            >
                                Tạo mới album
                            </Button>
                        </div>
                    )}
                </div>
            </Drawer>

            <Creation
                openCreation={openCreation}
                setOpenCreation={setOpenCreation}
                onSuccess={successCreateAlbum}
            />
        </>

    );
};

export default SaveDrawer;