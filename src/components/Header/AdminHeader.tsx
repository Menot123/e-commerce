// import React from 'react';
import { Layout, Menu } from 'antd';
import loginBackground from '/login-background.jpg'
import {
    UserOutlined,
    LaptopOutlined,
    LogoutOutlined
} from '@ant-design/icons';

const { Header } = Layout;

const AdminHeader = () => {
    return (
        <Layout className="layout">
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <img src={loginBackground} alt="Logo" className="store-logo" style={{ height: 50, marginRight: 20 }} />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
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
                    style={{ flex: 1, minWidth: 0 }}
                // onClick={navigateToPage}
                />

            </Header>
        </Layout>
    );
};

export default AdminHeader;