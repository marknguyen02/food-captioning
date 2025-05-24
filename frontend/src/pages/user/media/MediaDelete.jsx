import { deleteMedias } from "../../../services/mediaService"
import { Modal, message } from "antd"
import { useState } from "react"
import { useSelector } from "react-redux"

const Delete = ({ openDelete, setOpenDelete, selectedMedias, onSuccess }) => {
    const isDarkMode = useSelector((state) => state.app.mode) === 'dark'
    
    const [isLoading, setIsLoading] = useState(false)

    const handleDeleteMedias = async () => {
        try {
            setIsLoading(true)
            await deleteMedias(selectedMedias, localStorage.getItem('at'))
            message.success('Deleted medias successfully.')
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
        .media-delete-model .ant-modal-content {
            background-color: ${isDarkMode ? '#1e293b' : '#ffffff'};
            color: ${isDarkMode ? '#f8fafc' : '#1e293b'};
        }
        .media-delete-model .ant-modal-header {
            background-color: ${isDarkMode ? '#1e293b' : '#ffffff'};
            border-bottom: none !important;
        }
        .media-delete-model .ant-modal-footer {
            background-color: ${isDarkMode ? '#1e293b' : '#ffffff'};
            border: none !important;
        }
        .media-delete-model .ant-rate-star:not(.ant-rate-star-full) .ant-rate-star-first,
        .media-delete-model .ant-rate-star:not(.ant-rate-star-full) .ant-rate-star-second {
            color: ${isDarkMode ? '#475569' : '#cbd5e1'};
        }
        .media-delete-model .ant-rate-star-full .ant-rate-star-first,
        .media-delete-model .ant-rate-star-full .ant-rate-star-second {
            color: #fbbf24;
        }
        .media-delete-model .ant-modal-close {
            display: none !important;
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
                onOk={handleDeleteMedias}
                confirmLoading={isLoading}
                okText="Delete"
                okType="danger"
                cancelText="Cancel"
                centered
                title={<h2 className={`text-xl font-semibold bg-clip-text text-transparent ${titleGradient} mb-4`}>
                    Delete Media
                </h2>}
                className="media-delete-model"
            >
                <p>
                    Are you sure you want to delete{" "}
                    <strong>{selectedMedias.length}</strong> media{selectedMedias.length > 1 ? "s" : ""}?
                </p>
            </Modal>
        </>
    )
}

export default Delete