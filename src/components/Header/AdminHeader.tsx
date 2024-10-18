import React from 'react';
// import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import loginBackground from '/login-background.jpg'
import { useNavigate } from 'react-router-dom';
import {
    UserOutlined,
    LaptopOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import './AdminHeader.css';
import Cookies from 'js-cookie';

const { Header } = Layout;

const AdminHeader: React.FC = () => {
    // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    // useEffect(() => {
    //     if (Cookies.get('isLoggedIn') === 'true') {
    //         const storedLoggedName = String(Cookies.get('name'));
    //         setIsLoggedIn(true)
    //     }
    // }, []);

    const originalPath: string = import.meta.env.VITE_ORIGINAL_PATH as string;
    const navigate = useNavigate();

    const navigateToPage = (element: any) => {
        // Quan ly san pham
        if (element.key == 1) {
            navigate(`${originalPath}/admin/product-management`)
        }
        // Quan ly loai san pham
        if (element.key == 2) {
            navigate(`${originalPath}/admin/type-management`)
        }
        // Dang xuat
        if (element.key == 3) {
            Cookies.remove('isLoggedIn');
            Cookies.remove('name');
            Cookies.remove('role');
            Cookies.remove('cart');
            // setIsLoggedIn(false)
            navigate(`${originalPath}/login`)
        }
    }

    const backToHome = () => {
        navigate(`${originalPath}/admin`)
    }

    return (
        <Layout className="layout">
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <img onClick={backToHome} src={loginBackground} alt="Logo" className="store-logo" style={{ height: 50, marginRight: 20 }} />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['0']}
                    items={[
                        {
                            key: 1,
                            label: "Quản lý sản phẩm",
                            icon: <UserOutlined />
                        },
                        {
                            key: 2,
                            label: "Quản lý loại sản phẩm",
                            icon: <LaptopOutlined />
                        },
                        {
                            key: 3,
                            label: "Đăng xuất",
                            icon: <LogoutOutlined />
                        }
                    ]}
                    onClick={navigateToPage}
                    style={{ flex: 1, minWidth: 0 }}
                // onClick={navigateToPage}
                />

            </Header>
        </Layout>
    );
};

export default AdminHeader;