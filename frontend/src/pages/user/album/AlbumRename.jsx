import { updateAlbum } from "../../../services/albumService"
import { Modal, Form, message, Input, Button } from 'antd'
import { useState } from "react"
import { useSelector } from "react-redux"


const Rename = ({
    openRename,
    setOpenRename,
    selectedAlbums,
    onSuccess
}) => {
    const isDarkMode = useSelector((state) => state.app.mode) === 'dark'
    const [form] = Form.useForm()
    const [isLoading, setIsLoading] = useState(false)
    
    const handleRename = async (formData) => {
        try {
            setIsLoading(true)
            const album = {
                album_id: selectedAlbums[0],
                album_name: formData.album_name
            }
            await updateAlbum(album, localStorage.getItem('at'))
            message.success('Rename the album successfully.')
            form.resetFields() 
            setOpenRename(false)
            onSuccess()
        } catch (err) {
            form.setFields([
                {
                    name: 'album_name',
                    errors: ['Có lỗi xảy ra khi đổi tên album này']
                }
            ])
            console.log(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    // Dark mode styles
    const darkModalStyles = `
        .album-rename-custom-modal-dark .ant-modal-content {
            background-color: #1e293b
            color: #f8fafc
        }
        .album-rename-custom-modal-dark .ant-modal-header {
            background-color: #1e293b
            border-bottom: 1px solid #334155
        }
        .album-rename-custom-modal-dark .ant-modal-footer {
            background-color: #1e293b
            border-top: 1px solid #334155
        }
        .album-rename-custom-modal-dark .ant-modal-close-x {
            color: #f8fafc
        }
        .album-rename-custom-modal-dark .ant-input {
            background-color: #334155
            border-color: #475569
            color: #f8fafc
        }
        .album-rename-custom-modal-dark .ant-input:focus,
        .album-rename-custom-modal-dark .ant-input:hover {
            border-color: #3A59D1
            box-shadow: 0 0 0 2px rgba(58, 89, 209, 0.2)
        }
        .album-rename-custom-modal-dark .ant-form-item-explain-error {
            color: #ef4444
        }
    `

    // Light mode styles
    const lightModalStyles = `
        .album-rename-custom-modal-light .ant-modal-content {
            background-color: #ffffff
            color: #1f2937
        }
        .album-rename-custom-modal-light .ant-modal-header {
            background-color: #ffffff
            border-bottom: 1px solid #e5e7eb
        }
        .album-rename-custom-modal-light .ant-modal-footer {
            background-color: #ffffff
            border-top: 1px solid #e5e7eb
        }
        .album-rename-custom-modal-light .ant-modal-close-x {
            color: #374151
        }
        .album-rename-custom-modal-light .ant-input {
            background-color: #ffffff
            border-color: #d1d5db
            color: #1f2937
        }
        .album-rename-custom-modal-light .ant-input:focus,
        .album-rename-custom-modal-light .ant-input:hover {
            border-color: #3A59D1
            box-shadow: 0 0 0 2px rgba(58, 89, 209, 0.2)
        }
        .album-rename-custom-modal-light .ant-form-item-explain-error {
            color: #dc2626
        }
    `

    return (
        <>
            <style>{isDarkMode ? darkModalStyles : lightModalStyles}</style>
            <Modal
                open={openRename}
                onCancel={() => {
                    setOpenRename(false)
                    form.resetFields() 
                }}
                footer={null}
                centered
                width={500}
                className={isDarkMode ? "album-rename-custom-modal-dark" : "album-rename-custom-modal-light"}
            >
                <h2 className={`text-center text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 mb-4 ${!isDarkMode ? 'from-blue-600 to-purple-600' : ''}`}>
                    Rename Album
                </h2>
                
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleRename}
                    requiredMark={false}
                >
                    <Form.Item
                        name="album_name" 
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên mới!',
                            },
                        ]}
                    >
                        <Input
                            placeholder="Nhập tên mới"
                            className={isDarkMode ? '' : 'light-input'}
                        />
                    </Form.Item>

                    <div className="flex justify-center mt-6">
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isLoading}
                            className="!bg-[#3A59D1] hover:!bg-[#2d47a8] transition-colors duration-200"
                        >
                            Rename
                        </Button>
                    </div>
                </Form>
            </Modal>
        </>
    )
}

export default Rename