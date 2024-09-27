import React from 'react';
import './UserFooter.css';

import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer } = Layout;

const UserFooter: React.FC = () => {
    const items = new Array(3).fill(null).map((_, index) => ({
        key: index + 1,
        label: `nav ${index + 1}`,
    }));
    return (
        <Layout>
            <Footer style={{ textAlign: 'center' }}>
                E-Commerce APP ©{new Date().getFullYear()} Created by me
            </Footer>
        </Layout>
    );
};

export default UserFooter;