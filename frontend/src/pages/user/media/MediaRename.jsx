import { updateMedia } from "../../../services/mediaService"
import { Modal, Form, message, Input, Button } from 'antd'
import { useState } from "react"
import { useSelector } from "react-redux"

const Rename = ({ openRename, setOpenRename, selectedMedias, onSuccess }) => {
    const isDarkMode = useSelector((state) => state.app.mode) === 'dark'
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false)
    
    const handleRename = async (formData) => {
        try {
            setIsLoading(true)
            const media = {
                media_id: selectedMedias[0],
                media_name: formData.media_name
            }
            await updateMedia(media, localStorage.getItem('at'))
            message.success('Rename the media successfully.')
            form.resetFields() 
            setOpenRename(false)
            onSuccess()
        } catch (err) {
            form.setFields([
                {
                    name: 'media_name',
                    errors: ['Có lỗi xảy ra khi đổi tên ảnh này']
                }
            ]);
            console.log(err.message);
        } finally {
            setIsLoading(false)
        }
    }
    
    const modalStyles = `
        .media-rename-model .ant-modal-content {
            background-color: ${isDarkMode ? '#1e293b' : '#ffffff'};
            color: ${isDarkMode ? '#f8fafc' : '#1e293b'};
        }
        .media-rename-model .ant-modal-header {
            background-color: ${isDarkMode ? '#1e293b' : '#ffffff'};
            border-bottom: 1px solid ${isDarkMode ? '#334155' : '#e2e8f0'};
        }
        .media-rename-model .ant-modal-footer {
            background-color: ${isDarkMode ? '#1e293b' : '#ffffff'};
            border-top: 1px solid ${isDarkMode ? '#334155' : '#e2e8f0'};
        }
        .media-rename-model .ant-modal-close-x {
            color: ${isDarkMode ? '#e2e8f0' : '#64748b'};
        }
        .media-rename-model .ant-rate-star:not(.ant-rate-star-full) .ant-rate-star-first,
        .media-rename-model .ant-rate-star:not(.ant-rate-star-full) .ant-rate-star-second {
            color: ${isDarkMode ? '#475569' : '#cbd5e1'};
        }
        .media-rename-model .ant-rate-star-full .ant-rate-star-first,
        .media-rename-model .ant-rate-star-full .ant-rate-star-second {
            color: #fbbf24;
        }
        .media-rename-model .ant-input {
            background-color: ${isDarkMode ? '#374151' : '#ffffff'};
            border-color: ${isDarkMode ? '#4b5563' : '#d1d5db'};
            color: ${isDarkMode ? '#f9fafb' : '#111827'};
        }
        .media-rename-model .ant-input:hover {
            border-color: ${isDarkMode ? '#6b7280' : '#9ca3af'};
        }
        .media-rename-model .ant-input:focus {
            border-color: ${isDarkMode ? '#3b82f6' : '#3b82f6'};
            box-shadow: 0 0 0 2px ${isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.2)'};
        }
        .media-rename-model .ant-form-item-explain-error {
            color: ${isDarkMode ? '#fca5a5' : '#dc2626'};
        }
    `

    const titleGradient = isDarkMode 
        ? 'bg-gradient-to-r from-cyan-400 to-purple-400' 
        : 'bg-gradient-to-r from-blue-600 to-purple-600';

    return (
        <>
            <style>{modalStyles}</style>
            <Modal
                open={openRename}
                onCancel={() => {
                    setOpenRename(false)
                    form.resetFields() 
                }}
                footer={null}
                centered
                width={500}
                className="media-rename-model"
            >
                <h2 className={`text-center text-xl font-semibold bg-clip-text text-transparent ${titleGradient} mb-4`}>
                    Rename Media
                </h2>
                
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleRename}
                    requiredMark={false}
                >
                    <Form.Item
                        name="media_name" 
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên mới!',
                            },
                        ]}
                    >
                        <Input
                            placeholder="Nhập tên mới"
                        />
                    </Form.Item>

                    <div className="flex justify-center mt-6">
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isLoading}
                            className="!bg-[#3A59D1]"
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