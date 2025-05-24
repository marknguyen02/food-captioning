import { Form, Input, Button, Spin, message, Modal, Progress } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, IdcardOutlined, CheckOutlined } from "@ant-design/icons";
import { signup } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Signup() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formVisible, setFormVisible] = useState(false);
    const [termsVisible, setTermsVisible] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [passwordChecks, setPasswordChecks] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false
    });

    useEffect(() => {
        setTimeout(() => {
            setFormVisible(true);
        }, 300);
    }, []);

    const checkPasswordStrength = (password) => {
        if (!password) {
            setPasswordStrength(0);
            setPasswordChecks({
                length: false,
                number: false,
                special: false
            });
            return;
        }

        const checks = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
        };

        setPasswordChecks(checks);

        const score = Object.values(checks).filter(Boolean).length;
        setPasswordStrength((score / 5) * 100);
    };

    const validateStrongPassword = (_, value) => {
        if (!value) {
            return Promise.reject(new Error('Please enter your password!'));
        }

        const errors = [];
        
        if (value.length < 8) {
            errors.push('at least 8 characters');
        }
        if (!/\d/.test(value)) {
            errors.push('at least 1 number');
        }
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) {
            errors.push('at least 1 special character');
        }

        if (errors.length > 0) {
            return Promise.reject(new Error(`Password must have: ${errors.join(', ')}`));
        }

        return Promise.resolve();
    };

    const getPasswordStrengthColor = () => {
        if (passwordStrength < 40) return '#ff4d4f';
        if (passwordStrength < 70) return '#faad14';
        return '#52c41a';
    };

    const getPasswordStrengthText = () => {
        if (passwordStrength === 0) return '';
        if (passwordStrength < 40) return 'Weak';
        if (passwordStrength < 70) return 'Medium';
        return 'Strong';
    };

    const handleSignup = async () => {
        try {
            const values = await form.validateFields();
            const { username, password, fullname, email } = values;

            setLoading(true);
            await signup({ username, password, fullname, email });

            message.success({
                content: 'Signup successful!',
                icon: <CheckOutlined style={{ color: '#52c41a' }} />
            });

            setFormVisible(false);
            setTimeout(() => {
                navigate('/login');
            }, 500);
        } catch (err) {
            setLoading(false);
            if (err?.response?.status === 400) {
                form.setFields([
                    {
                        name: 'username',
                        errors: ['Username is already taken!']
                    }
                ]);
            } else {
                form.setFields([
                    {
                        name: 'fullname',
                        errors: ['An error occurred. Please try again!']
                    }
                ]);
            }
        }
    };

    return (
        <div className='flex h-full items-center justify-center p-5 not-md:p-2.5'>
            <div className={`flex h-full flex-col items-center !gap-6 transition-all duration-500 transform min-w-[320px] max-w-[650px] w-full not-md:max-w-full not-md:min-w-0 ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <p className='text-4xl not-md:text-3xl font-bold text-[#CC4156] !mb-2'>Create Account</p>

                <Form
                    form={form}
                    className='flex flex-col w-full not-md:w-full bg-white rounded-2xl border border-[#d4d4d4] !p-8 not-md:!p-4 shadow-lg'
                    layout="vertical"
                    requiredMark={false}
                    onFinish={handleSignup}
                >
                    <Form.Item
                        name='username'
                        rules={[
                            { required: true, message: 'Please enter your username!' },
                            { min: 6, message: 'Username must be at least 6 characters!' }
                        ]}
                        className='!mb-6 text-left'
                    >
                        <Input
                            prefix={<UserOutlined className="text-gray-400" />}
                            placeholder='Username'
                            className='!h-12 rounded-lg text-base'
                            size="large"
                            autoComplete="off"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ validator: validateStrongPassword }]}
                        className='text-left'
                    >
                        <Input.Password
                            prefix={<LockOutlined className="text-gray-400" />}
                            placeholder="Password"
                            className='!h-12 rounded-lg text-base'
                            size="large"
                            onChange={(e) => checkPasswordStrength(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            { required: true, message: 'Please confirm your password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Passwords do not match!'));
                                },
                            }),
                        ]}
                        className='!mb-6 text-left'
                    >
                        <Input.Password
                            prefix={<LockOutlined className="text-gray-400" />}
                            placeholder="Confirm Password"
                            className='!h-12 rounded-lg text-base'
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name='fullname'
                        rules={[{ required: true, message: 'Please enter your full name!' }]}
                        className='!mb-6 text-left'
                    >
                        <Input
                            prefix={<IdcardOutlined className="text-gray-400" />}
                            placeholder='Full Name'
                            className='!h-12 rounded-lg text-base'
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name='email'
                        rules={[
                            { required: true, message: 'Please enter your email!' },
                            { type: 'email', message: 'Invalid email address!' }
                        ]}
                        className='text-left'
                    >
                        <Input
                            prefix={<MailOutlined className="text-gray-400" />}
                            placeholder='Email'
                            className='!h-12 rounded-lg text-base'
                            size="large"
                            type='email'
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button 
                            block 
                            type="primary" 
                            htmlType="submit"
                            disabled={loading}
                            loading={loading}
                            className='!h-10'
                        >
                            Sign Up
                        </Button>
                    </Form.Item>

                    <div className='flex items-center mb-6'>
                        <div className='flex-1 h-px bg-gray-200'></div>
                        <span className='!px-4 text-gray-400 text-sm'>or</span>
                        <div className='flex-1 h-px bg-gray-200'></div>
                    </div>

                    <Button
                        onClick={() => navigate('/login')}
                        className='!h-10'
                        block
                    >
                        Already have an account
                    </Button>
                </Form>

                <p className='text-gray-500 text-sm text-center !mt-4'>
                    By signing up, you agree to our{' '}
                    <a onClick={() => setTermsVisible(true)} className='text-[#CC4156] cursor-pointer'>Terms</a> and{' '}
                    <a className='text-[#CC4156]'>Privacy Policy</a>.
                </p>

                <Modal
                    title="Terms and Conditions"
                    open={termsVisible}
                    onCancel={() => setTermsVisible(false)}
                    footer={null}
                >
                    <p>This is where your terms and conditions would go.</p>
                </Modal>
            </div>
        </div>
    );
}

export default Signup;