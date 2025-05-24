import { deleteAlbums } from "../../../services/albumService"
import { Modal, message } from "antd"
import { useState } from "react"
import { useSelector } from "react-redux"

const Delete = ({ openDelete, setOpenDelete, selectedAlbums, onSuccess }) => {
    const isDarkMode = useSelector((state) => state.app.mode) === 'dark'
    const [isLoading, setIsLoading] = useState(false)
    
    const handleDeleteAlbums = async () => {
        try {
            setIsLoading(true)
            await deleteAlbums(selectedAlbums, localStorage.getItem('at'))
            message.success('Deleted albums successfully.')
            setOpenDelete(false)
            onSuccess()
        } catch (err) {
            message.error('Failed to delete album. Please try again.')
            console.error(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    const modalStyles = `
        .album-delete-custom-modal .ant-modal-content {
            background-color: ${isDarkMode ? '#1e293b' : '#ffffff'};
            color: ${isDarkMode ? '#f8fafc' : '#1e293b'};
        }
        .album-delete-custom-modal .ant-modal-header {
            background-color: ${isDarkMode ? '#1e293b' : '#ffffff'};
            border-bottom: none;
        }
        .album-delete-custom-modal .ant-modal-footer {
            background-color: ${isDarkMode ? '#1e293b' : '#ffffff'};
            border-top: none;
        }
        .album-delete-custom-modal .ant-rate-star:not(.ant-rate-star-full) .ant-rate-star-first,
        .album-delete-custom-modal .ant-rate-star:not(.ant-rate-star-full) .ant-rate-star-second {
            color: ${isDarkMode ? '#475569' : '#cbd5e1'};
        }
        .album-delete-custom-modal .ant-rate-star-full .ant-rate-star-first,
        .album-delete-custom-modal .ant-rate-star-full .ant-rate-star-second {
            color: #fbbf24;
        }
    `

    const titleGradient = isDarkMode 
        ? 'bg-gradient-to-r from-cyan-400 to-purple-400' 
        : 'bg-gradient-to-r from-blue-600 to-purple-600';

    return (
        <>
            <style>{modalStyles}</style>
            <Modal
                open={openDelete}
                onCancel={() => setOpenDelete(false)}
                onOk={handleDeleteAlbums}
                confirmLoading={isLoading}
                okType="danger"
                cancelText={null}
                centered
                title={<h2 className={`text-xl font-semibold bg-clip-text text-transparent ${titleGradient} mb-4`}>
                    Delete Album
                </h2>}
                className="album-delete-custom-modal"
                closeIcon={null}
            >
                <p>
                    Are you sure you want to delete{" "}
                    <strong>{selectedAlbums.length}</strong> album{selectedAlbums.length > 1 ? "s" : ""}?
                </p>
            </Modal>
        </>
    )
}

export default Delete