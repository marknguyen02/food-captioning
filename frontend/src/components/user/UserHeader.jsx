import { faBell, faUser, faCog, faSignOutAlt, faEnvelope, faLock, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover, Modal, Input, Button, Form, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { deleteState } from "../../redux/appSlice";
import { useState } from "react";
import { deleteAccount, logout, updateAccount } from "../../services/authService";   
import { useNavigate } from "react-router-dom";

function UserHeader() {
    const { fullname, username, email } = useSelector((state) => state.app.user) || {};
    const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
    const [isChangeEmailModalOpen, setIsChangeEmailModalOpen] = useState(false);

    const popoverStyles = `
        .ant-popover-content .ant-popover-inner {
            background-color: #1F2A44 !important;
        }
    `;

    return (
        <div className="flex items-center justify-end p-2 h-full w-full bg-[#1F2937]">
            <div className="flex items-center gap-6 sm:gap-4">
                <>
                    <style>{popoverStyles}</style>
                    <Popover
                        content={<NotificationsPopoverContent />}
                        trigger="click"
                        classNames={{ root: 'custom-popover-notifications' }}
                    >
                        <FontAwesomeIcon 
                            icon={faBell} 
                            className="text-[20px] text-gray-100 cursor-pointer p-2 rounded-full hover:text-blue-400 hover:bg-[#1F2937] hover:animate-pulse transition-all duration-300"
                        />
                    </Popover>
                </>
                <>
                    <style>{popoverStyles}</style>
                    <Popover 
                        content={<MainPopoverContent 
                            fullname={fullname} 
                            username={username} 
                            email={email} 
                            openAccountModal={() => {
                                setIsAccountModalOpen(true)
                                setIsSettingsModalOpen(false)
                            }}
                            openSettingsModal={() => {
                                setIsSettingsModalOpen(true)
                                setIsAccountModalOpen(false)
                            }}
                        />} 
                        trigger="click" 
                        classNames={{ root: 'custom-popover' }}
                    >
                        <img 
                            src="/avatar.png" 
                            className="h-[40px] sm:h-[36px] rounded-full cursor-pointer ring-2 ring-gray-700 hover:ring-4 hover:ring-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:scale-105 transition-all duration-300 text-transparent"
                        />
                    </Popover>
                </>
                <AccountModal 
                    isOpen={isAccountModalOpen} 
                    onClose={() => setIsAccountModalOpen(false)} 
                    fullname={fullname} 
                    username={username} 
                    email={email} 
                />
                <SettingsModal 
                    isOpen={isSettingsModalOpen} 
                    onClose={() => {setIsSettingsModalOpen(false)}}
                    openChangePasswordModal={() => {setIsChangePasswordModalOpen(true)}}
                    openChangeEmailModal={() => {setIsChangeEmailModalOpen(true)}}
                />
                <ChangePasswordModal 
                    isOpen={isChangePasswordModalOpen} 
                    onClose={() => setIsChangePasswordModalOpen(false)} 
                />
                <ChangeEmailModal 
                    isOpen={isChangeEmailModalOpen} 
                    onClose={() => setIsChangeEmailModalOpen(false)} 
                />
            </div>
        </div>
    );
}

const NotificationsPopoverContent = () => {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: "New Feature Released",
            message: "Check out the new dashboard customization options!",
            timestamp: "2 minutes ago",
        },
        {
            id: 2,
            title: "Password Changed",
            message: "Your password was successfully updated.",
            timestamp: "1 hour ago",
        },
        {
            id: 3,
            title: "System Maintenance",
            message: "Scheduled maintenance on May 4, 2025, from 2 AM to 4 AM.",
            timestamp: "1 day ago",
        },
    ]);

    return (
        <div className="w-80 max-w-[90vw] bg-[#1F2A44] rounded-xl transition-all duration-300">
            <div className="py-2.5 text-center border-b border-gray-700 flex justify-between items-center px-4">
                <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                    Notifications
                </span>
            </div>
            <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                    <div className="py-4 text-center text-gray-400">
                        No notifications
                    </div>
                ) : (
                    notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className="group px-4 py-3 hover:bg-[#374151] hover:bg-opacity-80 rounded-xl transition-all duration-300"
                        >
                            <div className="flex-1">
                                <p className="text-base text-gray-100 font-medium group-hover:text-blue-400">
                                    {notification.title}
                                </p>
                                <p className="text-sm text-gray-400">
                                    {notification.message}
                                </p>
                                <p className="text-xs text-gray-500 italic mt-1">
                                    {notification.timestamp}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
};

const MainPopoverContent = ({ fullname, openAccountModal, openSettingsModal }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = async () => {
        await logout();
        localStorage.removeItem('at');
        dispatch(deleteState());
        navigate('/');
    };

    return (
        <div className="w-56 max-w-[90vw] bg-[#1F2A44] rounded-xl transition-all duration-300">
            <div className="py-2.5 text-left border-b border-gray-700 px-2.5">
                <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                    {fullname || "User"}
                </span>
            </div>
            <div className="py-3 flex flex-col gap-2">
                <button 
                    className="group flex items-center gap-3 px-2 py-2 w-full text-gray-100 hover:bg-[#374151] hover:bg-opacity-80 hover:text-blue-400 rounded-xl transition-all duration-300 hover:scale-105 transform"
                    onClick={openAccountModal}
                >
                    <FontAwesomeIcon icon={faUser} className="text-gray-100" />
                    <span className="text-base">Account</span>
                </button>
                <button 
                    className="flex items-center gap-3 px-2 py-2 w-full text-gray-100 hover:bg-[#374151] hover:bg-opacity-80 hover:text-blue-400 rounded-xl transition-all duration-300 hover:scale-105 transform"
                    onClick={openSettingsModal}
                >
                    <FontAwesomeIcon icon={faCog} className="text-gray-100 w-4 group-hover:text-blue-400" />
                    <span className="text-base">Settings</span>
                </button>
                <button
                    className="flex items-center gap-3 px-2 py-2 w-full text-red-500 hover:bg-red-900/30 hover:text-red-400 rounded-xl transition-all duration-300 hover:scale-105 transform"
                    onClick={handleLogout}
                >
                    <FontAwesomeIcon icon={faSignOutAlt} className="text-red-500 w-4" />
                    <span className="text-base">Logout</span>
                </button>
            </div>
        </div>
    );
};

const AccountModal = ({ isOpen, onClose, fullname, username, email }) => {
    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            footer={null}
            centered
            className="custom-modal"
            styles={{
                content: {
                    backgroundColor: '#1F2937',
                    border: '1px solid #4B5563',
                    borderRadius: '12px',
                    padding: '24px',
                },
            }}
        >
            <div className="text-center mb-6">
                <h2 className="text-xl font-semibold">
                    Account Details
                </h2>
            </div>
            <div className="space-y-4">
                {[
                    { icon: faUser, label: "Username", value: username || "N/A" },
                    { icon: faUser, label: "Full Name", value: fullname || "N/A" },
                    { icon: faEnvelope, label: "Email", value: email || "N/A" },
                ].map(({ icon, label, value }) => (
                    <div key={label} className="flex items-center gap-3 p-3 bg-[#2D3748] rounded-lg shadow-sm border border-gray-700">
                        <FontAwesomeIcon icon={icon} className="text-gray-400 w-5" />
                        <div className="flex-1">
                            <span className="text-sm text-gray-400 font-medium">{label}</span>
                            <p className="text-base text-gray-100 font-semibold">{value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Modal>
    );
};

const SettingsModal = ({ isOpen, onClose, openChangePasswordModal, openChangeEmailModal }) => {
    const handleDeleteAccount = () => {
        Modal.confirm({
            title: "Are you sure you want to delete your account?",
            content: "This action cannot be undone.",
            okText: "Delete",
            okType: "danger",
            cancelText: "Cancel",
            onOk: async () => {
                await deleteAccount(localStorage.getItem('at'));
                await logout();
                localStorage.removeItem('at');
                window.location.reload();
            }
        });
    };

    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            footer={null}
            centered
            className="custom-modal"
            styles={{
                content: {
                    backgroundColor: '#1F2937',
                    border: '1px solid #4B5563',
                    borderRadius: '12px',
                    padding: '24px',
                },
            }}
        >
            <div className="text-center mb-6">
                <h2 className="text-xl font-semibold">
                    Settings
                </h2>
            </div>
            <div className="space-y-2">
                <button
                    className="flex items-center gap-3 px-3 py-3 w-full text-gray-100 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 transform bg-[#223d63]"
                    onClick={openChangePasswordModal}
                >
                    <FontAwesomeIcon icon={faLock} className="text-gray-100 w-5" />
                    <span className="text-base">Change Password</span>
                </button>
                <button
                    className="flex items-center gap-3 px-3 py-3 w-full text-gray-100 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 transform bg-[#223d63]"
                    onClick={openChangeEmailModal}
                >
                    <FontAwesomeIcon icon={faEnvelope} className="text-gray-100 w-5 group-hover:text-blue-400" />
                    <span className="text-base">Change Email</span>
                </button>
                <button
                    className="flex items-center gap-3 px-3 py-3 w-full text-red-500 hover:bg-red-900/30 hover:text-red-400 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 transform bg-[#223d63]"
                    onClick={handleDeleteAccount}
                >
                    <FontAwesomeIcon icon={faTrash} className="text-red-500 w-5" />
                    <span className="text-base">Delete Account</span>
                </button>
            </div>
        </Modal>
    );
};

const ChangePasswordModal = ({ isOpen, onClose }) => {
    const [form] = Form.useForm();

    const handleChangePassword =  async (values) => {
        const formData = {
            current_password: values.password,
            new_password: values.newPassword
        }
        try {
            await updateAccount(formData, localStorage.getItem('at'));
            message.success("Password changed successfully");
            form.resetFields();
            onClose();
        } catch (err) {
            const errorDetail = err.response?.data?.detail;
            if (errorDetail) {
                const formattedErrors = Object.keys(errorDetail).map(field => ({
                    name: field,
                    errors: [errorDetail[field]]
                }));
                form.setFields(formattedErrors);
            } else {
                form.setFields([{ name: 'password', errors: ["Something went wrong"] }]);
            }
        }
    };

    return (
        <Modal
            open={isOpen}
            onCancel={() => {
                onClose();
                form.resetFields();
            }}
            footer={null}
            centered
            className="custom-modal"
            styles={{
                content: {
                    backgroundColor: '#1F2937',
                    border: '1px solid #4B5563',
                    borderRadius: '12px',
                    padding: '24px',
                },
            }}
        >
            <div className="text-center mb-6">
                <h2 className="text-xl font-semibold">
                    Change Password
                </h2>
            </div>
            <Form 
                form={form} 
                onFinish={handleChangePassword} 
                layout="vertical"
                className='flex flex-col gap-2.5'
            >
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: "Please enter current password" }]}
                >
                    <Input.Password
                        prefix={<FontAwesomeIcon icon={faLock} className="text-gray-400 mr-2" />}
                        placeholder="Current Password"
                        className="!h-10 bg-[#374151] text-gray-100 border-gray-600 rounded-lg"
                    />
                </Form.Item>
                <Form.Item
                    name="newPassword"
                    rules={[
                        { required: true, message: "Please enter new password" },
                        { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự' }
                    ]}
                >
                    <Input.Password
                        prefix={<FontAwesomeIcon icon={faLock} className="text-gray-400 mr-2" />}
                        placeholder="New Password"
                        className="!h-10 bg-[#374151] text-gray-100 border-gray-600 rounded-lg"
                    />
                </Form.Item>
                <Form.Item
                    name="confirmPassword"
                    rules={[
                        { required: true, message: "Please confirm new password" },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error("Passwords do not match"));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        prefix={<FontAwesomeIcon icon={faLock} className="text-gray-400 mr-2" />}
                        placeholder="Confirm New Password"
                        className="!h-10 bg-[#374151] text-gray-100 border-gray-600 rounded-lg"
                    />
                </Form.Item>
                <Form.Item className="!mb-0">
                    <div className="flex justify-end gap-2">
                        <Button
                            onClick={onClose}
                            className="bg-[#374151] text-gray-100 hover:bg-[#4B5563] border-none rounded-lg"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="bg-blue-500 hover:bg-blue-600 border-none rounded-lg"
                        >
                            Change Password
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
};

const ChangeEmailModal = ({ isOpen, onClose }) => {
    const [form] = Form.useForm();

    const handleChangeEmail = async (values) => {
        const formData = { 
            current_password: values.password,
            email: values.email
        }

        try {
            await updateAccount(formData, localStorage.getItem('at'));
            message.success("Email changed successfully");
            form.resetFields();
            onClose();
        } catch (err) { 
            const errorDetail = err.response?.data?.detail;
            if (errorDetail) {
                const formattedErrors = Object.keys(errorDetail).map(field => ({
                    name: field,
                    errors: [errorDetail[field]]
                }));
                form.setFields(formattedErrors);
            } else {
                form.setFields([{ name: 'password', errors: ["Something went wrong"] }]);
            }
        }
    };

    return (
        <Modal
            open={isOpen}
            onCancel={() => {
                onClose();
                form.resetFields();
            }}
            footer={null}
            centered
            className="custom-modal"
            styles={{
                content: {
                    backgroundColor: '#1F2937',
                    border: '1px solid #4B5563',
                    borderRadius: '12px',
                    padding: '24px',
                },
            }}
        >
            <div className="text-center mb-6">
                <h2 className="text-xl font-semibold">
                    Change Email
                </h2>
            </div>
            <Form 
                form={form} 
                onFinish={handleChangeEmail} 
                layout="vertical"
                className="flex flex-col gap-2.5"
            >
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: "Please enter new email" }, { type: "email", message: "Invalid email" }]}
                >
                    <Input
                        prefix={<FontAwesomeIcon icon={faEnvelope} className="text-gray-400 mr-2" />}
                        placeholder="New Email"
                        className="!h-10 bg-[#374151] text-gray-100 border-gray-600 rounded-lg"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: "Please enter password" }]}
                >
                    <Input.Password
                        prefix={<FontAwesomeIcon icon={faLock} className="text-gray-400 mr-2" />}
                        placeholder="Password"
                        className="!h-10 bg-[#374151] text-gray-100 border-gray-600 rounded-lg"
                    />
                </Form.Item>
                <Form.Item className="!mb-0">
                    <div className="flex justify-end gap-2">
                        <Button
                            onClick={onClose}
                            className="bg-[#374151] text-gray-100 hover:bg-[#4B5563] border-none rounded-lg"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="bg-blue-500 hover:bg-blue-600 border-none rounded-lg"
                        >
                            Change Email
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UserHeader;