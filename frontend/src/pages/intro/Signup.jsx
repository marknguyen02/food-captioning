import { Form, Input, Button, Spin } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, IdcardOutlined, CheckOutlined } from "@ant-design/icons";
import { signup } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useState, useEffect } from 'react';

function Signup() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFormVisible(true);
    }, 300);
  }, []);

  const handleSignup = async () => {
    try {
      const values = await form.validateFields();
      const { username, password, fullname, email } = values;

      setLoading(true);
      await signup({ username, password, fullname, email });

      message.success({
        content: 'Đăng ký thành công!',
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
            errors: ['Tên đăng nhập đã được sử dụng!']
          }
        ]);
      } else {
        form.setFields([
          {
            name: 'fullname',
            errors: ['Đã có lỗi xảy ra, vui lòng thử lại!']
          }
        ]);
      }
    }
  };

  return (
    <div className='flex h-full items-center justify-center p-5 bg-gradient-to-r from-blue-50 to-purple-50 not-md:p-2.5'>
      <div className={`flex h-full flex-col items-center !gap-6 transition-all duration-500 transform min-w-[320px] max-w-[650px] w-full not-md:max-w-full not-md:min-w-0 ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <p className='text-4xl not-md:text-3xl font-bold text-[#CC4156] !mb-2'>Đăng ký tài khoản</p>

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
              { required: true, message: 'Vui lòng nhập tên đăng nhập!' },
              { min: 6, message: 'Tên đăng nhập phải có ít nhất 6 ký tự!' }
            ]}
            className='!mb-6 text-left'
          >
            <Input
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder='Tên đăng nhập'
              className='!h-12 rounded-lg text-base'
              size="large"
              autoComplete="off"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu!' },
              { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự!' }
            ]}
            className='!mb-6 text-left'
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Mật khẩu"
              className='!h-12 rounded-lg text-base'
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Vui lòng nhập lại mật khẩu!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu không khớp!'));
                },
              }),
            ]}
            className='!mb-6 text-left'
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Nhập lại mật khẩu"
              className='!h-12 rounded-lg text-base'
              size="large"
            />
          </Form.Item>

          <Form.Item
            name='fullname'
            rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
            className='!mb-6 text-left'
          >
            <Input
              prefix={<IdcardOutlined className="text-gray-400" />}
              placeholder='Nhập họ và tên'
              className='!h-12 rounded-lg text-base'
              size="large"
            />
          </Form.Item>

          <Form.Item
            name='email'
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' }
            ]}
            className='text-left'
          >
            <Input
              prefix={<MailOutlined className="text-gray-400" />}
              placeholder='Nhập email'
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
                Đăng ký
            </Button>
          </Form.Item>


          <div className='flex items-center mb-6'>
            <div className='flex-1 h-px bg-gray-200'></div>
            <span className='!px-4 text-gray-400 text-sm'>hoặc</span>
            <div className='flex-1 h-px bg-gray-200'></div>
          </div>

          <Button
            onClick={() => navigate('/login')}
            className='!h-10'
            block
          >
            Đã có tài khoản
          </Button>
        </Form>

        <p className='text-gray-500 text-sm text-center !mt-4'>
          Bằng việc đăng ký, bạn đồng ý với các <a className='text-[#CC4156]'>Điều khoản</a> và <a className='text-[#CC4156]'>Chính sách</a> của chúng tôi
        </p>
      </div>
    </div>
  );
}

export default Signup;