import React, { useEffect } from 'react';
import './Login.css';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ComponentProps } from '../props/ComponentProps';
import Cookies from 'js-cookie';

const Login: React.FC<ComponentProps> = (props) => {


    const originalPath: string = import.meta.env.VITE_ORIGINAL_PATH as string;

    const navigate = useNavigate();

    useEffect(() => {
        if (Cookies.get('isLoggedIn') === 'true') {
            if (Cookies.get('role') === 'admin') {
                navigate(`${originalPath}/admin`);
            }
            else {
                navigate(`${originalPath}/`);
            }
        }
    }, []);

    const onFinish = (values: any) => {
        if (values.username === 'admin' && values.password === 'admin') {
            props.toastAlert('success', "Đăng nhập thành công tài khoản admin")
            Cookies.set('isLoggedIn', 'true', { expires: 7 }); // 7 days
            Cookies.set('role', 'admin', { expires: 7 }); // 7 days
            Cookies.set('name', 'Admin', { expires: 7 }); // 7 days
            navigate(`${originalPath}/admin`);
        }
        else if (values.username === 'customer' && values.password === 'customer') {
            props.toastAlert('success', "Đăng nhập thành công tài khoản khách")
            Cookies.set('isLoggedIn', 'true', { expires: 7 }); // 7 days
            Cookies.set('role', 'customer', { expires: 7 }); // 7 days
            Cookies.set('name', 'Người dùng', { expires: 7 }); // 7 days
            navigate(`${originalPath}/`);
        }
        else {
            props.toastAlert('error', "Tài khoản hoặc mật khẩu không chính xác")
        }
        // console.log('Received values of form: ', values);
    };

    return (
        <div className='login-container'>
            <div className="login-wrapper">
                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    style={{ padding: '40px' }}
                >
                    <h1>Đăng nhập</h1>
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Hãy nhập tài khoản của bạn!' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Tài khoản" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Flex justify="space-between" align="center">
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Lưu tài khoản</Checkbox>
                            </Form.Item>
                            <a href="">Quên mật khẩu</a>
                        </Flex>
                    </Form.Item>

                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            Đăng nhập
                        </Button>
                        hoặc <a href="/e-commerce/">Về trang chủ</a>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;