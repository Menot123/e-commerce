import React, { useState, useEffect } from 'react';
import './UserHeader.css';

import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import loginBackground from '/login-background.jpg'
import Cookies from 'js-cookie';

const { Header } = Layout;

// const navItems: any = ["Sản phẩm", "Giỏ hàng", "Dăng nhập"]
// const items = new Array(3).fill(null).map((_, index) => ({
//     key: index + 1,
//     label: navItems[index],
// }));

const UserHeader: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loggedName, setLoggedName] = useState<string>('');

    useEffect(() => {
        if (Cookies.get('isLoggedIn') === 'true') {
            const storedLoggedName = String(Cookies.get('name'));
            setIsLoggedIn(true)
            setLoggedName(storedLoggedName);
        }
    }, []);

    const originalPath: string = import.meta.env.VITE_ORIGINAL_PATH as string;
    const navigate = useNavigate();
    // const {
    //     token: { colorBgContainer, borderRadiusLG },
    // } = theme.useToken();

    const navigateToPage = (element: any) => {
        // San pham
        if (element.key == 1) {
            navigate(`${originalPath}/products`)
        }
        // Gio hang
        if (element.key == 2) {

        }
        // Dang nhap
        if (element.key == 3) {
            navigate(`${originalPath}/login`)
        }
        // Dang xuat
        if (element.key == 4) {
            Cookies.remove('isLoggedIn');
            Cookies.remove('name');
            Cookies.remove('role');
            setIsLoggedIn(false)
            setLoggedName('')
            navigate(`${originalPath}/`)
        }
    }

    const backToHome = () => {
        navigate(`${originalPath}/`)
    }

    return (
        <Layout>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <img onClick={backToHome} src={loginBackground} alt="Logo" className="store-logo" style={{ height: 50, marginRight: 20 }} />
                {
                    isLoggedIn
                        ?
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['0']}
                            items={[
                                { key: 1, label: "Sản phẩm" },
                                { key: 2, label: "Giỏ hàng" },
                                {
                                    key: 3, label: loggedName,
                                    children: [
                                        {
                                            key: 4,
                                            label: 'Đăng xuất'
                                        },
                                    ],
                                }
                            ]}
                            style={{ flex: 1, minWidth: 0 }}
                            onClick={navigateToPage}
                        />
                        :
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['0']}
                            items={[
                                { key: 1, label: "Sản phẩm" },
                                { key: 2, label: "Giỏ hàng" },
                                { key: 3, label: "Đăng nhập" }
                            ]}
                            style={{ flex: 1, minWidth: 0 }}
                            onClick={navigateToPage}
                        />
                }

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