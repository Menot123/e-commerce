import React from 'react';
import './AdminFooter.css';

import { Layout } from 'antd';

const { Footer } = Layout;

const AdminFooter: React.FC = () => {
    return (
        <Layout>
            <Footer style={{ textAlign: 'center' }}>
                E-Commerce APP ©{new Date().getFullYear()} Created by me
            </Footer>
        </Layout>
    );
};

export default AdminFooter;