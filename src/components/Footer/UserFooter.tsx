import React from 'react';
import './UserFooter.css';

import { Layout } from 'antd';

const { Footer } = Layout;

const UserFooter: React.FC = () => {
    return (
        <Layout>
            <Footer style={{ textAlign: 'center' }}>
                E-Commerce APP ©{new Date().getFullYear()} Created by me
            </Footer>
        </Layout>
    );
};

export default UserFooter;