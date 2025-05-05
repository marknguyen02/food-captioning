import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { createAlbum } from "../../../services/albumService";


const Creation = ({ openCreation, setOpenCreation, onSuccess }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleCreate = async (formData) => {
        setLoading(true);
        try {
            await createAlbum(formData, localStorage.getItem('at'));
            setOpenCreation(false); 
            form.resetFields();
            onSuccess();
        } catch (err) {
            form.setFields([
                {
                    name: 'album_name',
                    errors: [err.response?.data?.detail || 'Có lỗi xảy ra khi tạo bộ sưu tập']
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const modalStyles = `
        .custom-modal .ant-modal-content {
            background-color: #1e293b;
            color: #f8fafc;
        }
        .custom-modal .ant-modal-header {
            background-color: #1e293b;
            border-bottom: 1px solid #334155;
        }
        .custom-modal .ant-modal-footer {
            background-color: #1e293b;
            border-top: 1px solid #334155;
        }
        .custom-modal .ant-modal-close-x {
            
        }
        .custom-modal .ant-rate-star:not(.ant-rate-star-full) .ant-rate-star-first,
        .custom-modal .ant-rate-star:not(.ant-rate-star-full) .ant-rate-star-second {
            color: #475569;
        }
        .custom-modal .ant-rate-star-full .ant-rate-star-first,
        .custom-modal .ant-rate-star-full .ant-rate-star-second {
            color: #fbbf24;
        }
    `

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
                className="custom-modal"
            >
                <h2 className="text-center text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 mb-4">
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
                            disabled={loading}
                            className="!bg-[#3A59D1]"
                        >
                            Tạo mới
                        </Button>
                    </div>
                </Form>
            </Modal>
        </>

    );
}


export default Creation;