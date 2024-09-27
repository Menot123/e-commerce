import React from 'react';
import './UserHeader.css';

import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import loginBackground from '/login-background.jpg'

const { Header } = Layout;

const navItems: any = ["Sản phẩm", "Giỏ hàng", "Dăng nhập"]

const items = new Array(3).fill(null).map((_, index) => ({
    key: index + 1,
    label: navItems[index],
}));

const UserHeader: React.FC = () => {
    const originalPath: string = import.meta.env.VITE_ORIGINAL_PATH as string;
    const navigate = useNavigate();
    // const {
    //     token: { colorBgContainer, borderRadiusLG },
    // } = theme.useToken();

    const backToLogin = () => {
        navigate(`${originalPath}/login`)
    }

    return (
        <Layout>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <img src={loginBackground} alt="Logo" className="store-logo" style={{ height: 50, marginRight: 20 }} />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['0']}
                    items={items}
                    style={{ flex: 1, minWidth: 0 }}
                    onClick={backToLogin}
                />
            </Header>
            {/* <Content style={{ padding: '0 48px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <div
                    style={{
                        background: colorBgContainer,
                        minHeight: 280,
                        padding: 24,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    Content
                </div>
            </Content> */}
        </Layout>
    );
};

export default UserHeader;