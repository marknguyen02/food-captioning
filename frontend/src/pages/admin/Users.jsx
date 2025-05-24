import { useState, useEffect } from 'react';
import {
    Table,
    Input,
    Button,
    Space,
    Modal,
    Select,
    Tag,
    Typography,
    Tooltip,
    Card,
    notification,
    message
} from 'antd';
import {
    SearchOutlined,
    LockOutlined,
    UnlockOutlined,
    FilterOutlined,
    TeamOutlined,
    ExportOutlined
} from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { fetchAllUsers, changeRole, lockOrUnlockUser } from '../../services/adminService';

const { Text } = Typography;
const { Option } = Select;

const Users = () => {
    const [searchText, setSearchText] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [modalAction, setModalAction] = useState('');
    const [newRole, setNewRole] = useState('');
    const [exporting, setExporting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await fetchAllUsers(localStorage.getItem('at'));
                setDataSource(userData);
            } catch (err) {
                console.log(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleModalConfirm = () => {
        if (modalAction === 'lock') {
            lockUser(selectedUserId);
        } else if (modalAction === 'unlock') {
            unlockUser(selectedUserId);
        } else if (modalAction === 'changeRole') {
            changeUserRole(selectedUserId, newRole);
        }
        setIsModalVisible(false);
        setSelectedUserId(null);
    };

    const lockUser = async (userId) => {
        try {
            await lockOrUnlockUser(userId, localStorage.getItem('at'));
            setDataSource(prev =>
                prev.map(user => user.key === userId ? { ...user, locked: true } : user)
            );
            notification.success({
                message: 'Account Locked',
                description: `Account ${dataSource.find(u => u.key === userId)?.username} has been locked.`
            });
        } catch (err) {
            message.error(err.message);
        }
    };

    const unlockUser = async (userId) => {
        try {
            await lockOrUnlockUser(userId, localStorage.getItem('at'));
            setDataSource(prev =>
                prev.map(user => user.key === userId ? { ...user, locked: false } : user)
            );
            notification.success({
                message: 'Account Unlocked',
                description: `Account ${dataSource.find(u => u.key === userId)?.username} has been unlocked.`
            });
        } catch (err) {
            message.error(err.message);
        }
    };

    const changeUserRole = async (userId, role) => {
        try {
            await changeRole({ user_id: userId, new_role: role }, localStorage.getItem('at'));
            setDataSource(prev => 
                prev.map(user => user.key === userId ? { ...user, role } : user)
            );
            notification.success({
                message: 'Role Updated',
                description: `Account ${dataSource.find(u => u.key === userId)?.username} has been updated to ${role}.`
            });
        } catch (err) {
            message.error(err.message);
            console.log(err.message);
        }
    };

    const handleExportExcel = () => {
        try {
            setExporting(true);
            
            const exportData = filteredData.map((user, index) => ({
                'No.': index + 1,
                'Username': user.username,
                'Full Name': user.fullname,
                'Email': user.email,
                'Role': user.role.charAt(0).toUpperCase() + user.role.slice(1),
                'Status': user.locked ? 'Locked' : 'Active',
            }));

            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.json_to_sheet(exportData);

            const columnWidths = [
                { wch: 8 },
                { wch: 20 },
                { wch: 25 },
                { wch: 30 },
                { wch: 12 },
                { wch: 12 },
            ];
            worksheet['!cols'] = columnWidths;

            XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');

            const currentDate = new Date().toISOString().split('T')[0];
            const filename = `users_export_${currentDate}.xlsx`;

            XLSX.writeFile(workbook, filename);
        } catch (err) {
            message.error('Failed to export data');
        } finally {
            setExporting(false);
        }
    };

    const filteredData = dataSource.filter(item => {
        const matchSearch = item.username.toLowerCase().includes(searchText.toLowerCase());
        const matchRole = roleFilter === 'all' || item.role === roleFilter;
        return matchSearch && matchRole;
    });

    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            align: 'center',
            render: (text) => <Text strong>{text}</Text>,
            ellipsis: true,
        },
        {
            title: 'Full Name',
            dataIndex: 'fullname',
            key: 'fullname',
            align: 'center',
            ellipsis: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            align: 'center',
            ellipsis: true,
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            align: 'center',
            render: (role) => {
                const color = role.toLowerCase() === 'admin' ? 'blue' : 'green';
                const toPascalCase = (str) =>
                    str
                        .toLowerCase()
                        .split(/[_\s]/)
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join('');

                return <Tag color={color}>{toPascalCase(role)}</Tag>;
            }
        },
        {
            title: 'Actions',
            key: 'action',
            align: 'center',
            fixed: 'right',
            width: 120,
            render: (_, record) => (
                <Space size="small">
                    {!record.locked ? (
                        <Tooltip title="Lock Account">
                            <Button
                                type="primary"
                                className="!bg-green-500 hover:!bg-green-600"
                                icon={<UnlockOutlined />}
                                size="small"
                                onClick={() => {
                                    setSelectedUserId(record.key);
                                    setModalAction('lock');
                                    setIsModalVisible(true);
                                }}
                            />
                        </Tooltip>
                    ) : (
                        <Tooltip title="Unlock Account">
                            <Button
                                danger
                                icon={<LockOutlined />}
                                size="small"
                                onClick={() => {
                                    setSelectedUserId(record.key);
                                    setModalAction('unlock');
                                    setIsModalVisible(true);
                                }}
                            />
                        </Tooltip>
                    )}
                    <Tooltip title="Assign Role">
                        <Button
                            icon={<TeamOutlined />}
                            size="small"
                            onClick={() => {
                                setSelectedUserId(record.key);
                                setNewRole(record.role);
                                setModalAction('changeRole');
                                setIsModalVisible(true);
                            }}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <div className="flex flex-col gap-2.5 h-full w-full max-w-[3000px]">
            <Card className="shadow-sm">
                <div className="flex gap-3 justify-between">
                    <Input
                        placeholder="Search by username..."
                        prefix={<SearchOutlined className="text-gray-400" />}
                        allowClear
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <div className='flex gap-3 items-center max-w-[500px]'>
                        <Select
                            defaultValue="all"
                            style={{ width: 150 }}
                            onChange={(value) => setRoleFilter(value)}
                            suffixIcon={<FilterOutlined />}
                        >
                            <Option value="all">All Roles</Option>
                            <Option value="admin">Admin</Option>
                            <Option value="user">User</Option>
                        </Select>

                        <Button 
                            type="default" 
                            icon={<ExportOutlined />}
                            onClick={handleExportExcel}
                            loading={exporting}
                            disabled={filteredData.length === 0}
                        >
                            Export
                        </Button>
                    </div>
                </div>
            </Card>

            <Card className="shadow-sm">
                <div className="overflow-x-auto">
                    <Table
                        columns={columns}
                        dataSource={filteredData}
                        loading={loading}
                        pagination={false}
                        scroll={{ x: 'max-content' }}
                        size="middle"
                        rowClassName="hover:bg-gray-50"
                    />
                </div>
            </Card>

            <Modal
                title={modalAction === 'lock' ? "Lock Account" : "Unlock Account"}
                open={isModalVisible && (modalAction === 'lock' || modalAction === 'unlock')}
                onOk={handleModalConfirm}
                onCancel={() => setIsModalVisible(false)}
                okText={modalAction === 'lock' ? "Lock" : "Unlock"}
                cancelText="Cancel"
                okButtonProps={{ danger: modalAction === 'lock' }}
            >
                <p>
                    Are you sure you want to {modalAction} the account of user <Text strong>{dataSource.find(u => u.key === selectedUserId)?.username}</Text>?
                </p>
            </Modal>

            <Modal
                title="Assign User Role"
                open={isModalVisible && modalAction === 'changeRole'}
                onOk={handleModalConfirm}
                onCancel={() => setIsModalVisible(false)}
                okText="Update"
                cancelText="Cancel"
            >
                <div className="mb-4">
                    <p>Select role for user <Text strong>{dataSource.find(u => u.key === selectedUserId)?.username}</Text>:</p>
                </div>
                <Select
                    style={{ width: '100%' }}
                    value={newRole}
                    onChange={(value) => setNewRole(value)}
                >
                    <Option value="admin">Admin</Option>
                    <Option value="user">User</Option>
                </Select>
            </Modal>
        </div>
    );
};

export default Users;