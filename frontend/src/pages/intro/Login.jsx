import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { login } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';


function Login() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [formVisible, setFormVisible] = useState(false);
    
    useEffect(() => {
        setTimeout(() => {
        setFormVisible(true);
        }, 300);
    }, []);

    const handleLogin = async (formData) => {
        setLoading(true);
        try {
            const accessToken = await login(formData.username, formData.password);
            localStorage.setItem('at', accessToken);
            setFormVisible(false);
            navigate('/', {replace: true});
            window.location.reload();
        } catch (err) {
            setLoading(false);
            if (err.response && err.response.status === 400) {
                form.setFields([{
                    name: 'password',
                    errors: ['Tài khoản hoặc mật khẩu không chính xác']
                }]);
            } else {
                form.setFields([{
                    name: 'password',
                    errors: [err.message]
                }]);
            }
        }
    }

    return (
        <div className='flex items-center justify-center min-h-[80vh]'>
            <div 
                className={`flex flex-col items-center gap-6 transition-all duration-500 transform ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{
                    maxWidth: '450px',
                    width: '100%'
                }}
            >
                
                <h1 className='text-xl font-bold text-[#CC4156] mb-2'>Đăng nhập ngay</h1>
                
                <Form
                    form={form}
                    onFinish={handleLogin}
                    className='flex flex-col w-full bg-white rounded-2xl border border-gray-200 !p-8 shadow-lg'
                    layout="vertical"
                >
                    <Form.Item
                        name='username'
                        rules={[{
                            required: true,
                            message: 'Vui lòng nhập tên đăng nhập!'
                        }]}
                    >
                        <Input
                            prefix={<UserOutlined className="text-gray-400" />}
                            placeholder='Tên đăng nhập'
                            className='h-12 rounded-lg text-base'
                            size="large"
                        />
                    </Form.Item>
                    
                    <Form.Item
                        name="password"
                        rules={[{
                            required: true,
                            message: 'Vui lòng nhập mật khẩu!'
                        }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="text-gray-400" />}
                            placeholder="Mật khẩu"
                            className='h-12 rounded-lg text-base'
                            size="large"
                        />
                    </Form.Item>
                    
                    <div className='flex justify-end mb-4'>
                        <a className='text-[#CC4156] hover:text-[#FF6B81] transition-colors'>
                            Quên mật khẩu?
                        </a>
                    </div>
                    
                    <Form.Item>
                        <Button 
                            block 
                            type="primary" 
                            htmlType="submit"
                            className='!h-10 rounded-lg'
                            disabled={loading}
                            loading={loading}
                        >
                            Đăng nhập
                        </Button>
                    </Form.Item>
                    
                    <div className='flex items-center mb-6'>
                        <div className='flex-1 h-px bg-gray-200'></div>
                        <span className='!px-4 text-gray-400 text-sm'>hoặc</span>
                        <div className='flex-1 h-px bg-gray-200'></div>
                    </div>
                    
                    <Form.Item className='mt-3'>
                        <Button 
                            block 
                            onClick={() => navigate('/signup')}
                            className='!h-10'
                        >
                            Tạo tài khoản mới
                        </Button>
                    </Form.Item>
                </Form>
                
                <p className='text-gray-500 text-sm text-center mt-4'>
                    Bằng việc đăng nhập, bạn đồng ý với các <a className='text-[#CC4156]'>Điều khoản</a> và <a className='text-[#CC4156]'>Chính sách</a> của chúng tôi
                </p>
            </div>
        </div>
    );
}


export default Login;