import { useState } from "react"
import { Modal, Form, Input, Button } from "antd"
import { createAlbum } from "../../../services/albumService"
import { CloseOutlined } from "@ant-design/icons"
import { useSelector } from "react-redux"

const Creation = ({ openCreation, setOpenCreation, onSuccess }) => {
    const isDarkMode = useSelector((state) => state.app.mode) === 'dark'
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)

    const handleCreate = async (formData) => {
        try {
            setLoading(true)
            await createAlbum(formData, localStorage.getItem('at'))
            setOpenCreation(false) 
            form.resetFields()
            onSuccess()
        } catch (err) {
            form.setFields([
                {
                    name: 'album_name',
                    errors: [err.response?.data?.detail || 'Có lỗi xảy ra khi tạo bộ sưu tập']
                }
            ])
        } finally {
            setLoading(false)
        }
    }

    const modalStyles = `
        .album-creation-custom-modal .ant-modal-content {
            background-color: ${isDarkMode ? '#1e293b' : '#ffffff'};
            color: ${isDarkMode ? '#f8fafc' : '#1e293b'};
        }
        .album-creation-custom-modal .ant-modal-header {
            background-color: ${isDarkMode ? '#1e293b' : '#ffffff'};
            border-bottom: none;
        }
        .album-creation-custom-modal .ant-modal-footer {
            background-color: ${isDarkMode ? '#1e293b' : '#ffffff'};
            border-top: none;
        }
        .album-creation-custom-modal .ant-rate-star:not(.ant-rate-star-full) .ant-rate-star-first,
        .album-creation-custom-modal .ant-rate-star:not(.ant-rate-star-full) .ant-rate-star-second {
            color: ${isDarkMode ? '#475569' : '#cbd5e1'};
        }
        .album-creation-custom-modal .ant-rate-star-full .ant-rate-star-first,
        .album-creation-custom-modal .ant-rate-star-full .ant-rate-star-second {
            color: #fbbf24;
        }
        .album-creation-custom-modal .ant-form-item-explain-error {
            color: ${isDarkMode ? '#fca5a5' : '#dc2626'};
        }
    `

    const titleGradient = isDarkMode 
        ? 'bg-gradient-to-r from-cyan-400 to-purple-400' 
        : 'bg-gradient-to-r from-blue-600 to-purple-600';

    const closeIconClass = isDarkMode 
        ? '!text-white hover:scale-110 transform hover:!text-red-500' 
        : '!text-gray-600 hover:scale-110 transform hover:!text-red-500';

    return (
        <>
            <style>{modalStyles}</style>
            <Modal
                open={openCreation}
                onCancel={() => {
                    setOpenCreation(false)
                    form.resetFields()
                }}
                footer={null}
                centered
                width={500}
                closeIcon={<CloseOutlined className={closeIconClass} />}
                className="album-creation-custom-modal"
            >
                <h2 className={`text-center text-xl font-semibold bg-clip-text text-transparent ${titleGradient} mb-4`}>
                    Tạo mới bộ sưu tập
                </h2>
                
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleCreate}
                    requiredMark={false}
                >
                    <Form.Item
                        name="album_name" 
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên bộ sưu tập!',
                            },
                        ]}
                    >
                        <Input
                            placeholder="Nhập tên bộ sưu tập"
                        />
                    </Form.Item>

                    <div className="flex justify-center mt-6">
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            className="!bg-[#3A59D1]"
                        >
                            Tạo mới
                        </Button>
                    </div>
                </Form>
            </Modal>
        </>
    )
}

export default Creation