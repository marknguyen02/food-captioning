import { deleteAlbums } from "../../../services/albumService"
import { Modal, message } from "antd"
import { useState } from "react"

const Delete = ({ openDelete, setOpenDelete, selectedAlbums, onSuccess }) => {
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
        .custom-modal .ant-modal-content {
            background-color: #1e293b;
            color: #f8fafc;
        }
        .custom-modal .ant-modal-header {
            background-color: #1e293b;
            border-bottom: none;
        }
        .custom-modal .ant-modal-footer {
            background-color: #1e293b;
            border-top: none;
        }
        .custom-modal .ant-rate-star:not(.ant-rate-star-full) .ant-rate-star-first,
        .custom-modal .ant-rate-star:not(.ant-rate-star-full) .ant-rate-star-second {
            color: #475569;
        }
        .custom-modal .ant-rate-star-full .ant-rate-star-first,
        .custom-modal .ant-rate-star-full .ant-rate-star-second {
            color: #fbbf24;

        }

        .custom-modal .ant-modal-close {
            display: none !important;
        }
    `

    return (
        <>
            <style>{modalStyles}</style>
            <Modal
                open={openDelete}
                onCancel={() => setOpenDelete(false)}
                onOk={handleDeleteAlbums}
                confirmLoading={isLoading}
                okText="Delete"
                okType="danger"
                cancelText="Cancel"
                centered
                title={<h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 mb-4">
                    Rename Album
                </h2>}
                className="custom-modal"
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
