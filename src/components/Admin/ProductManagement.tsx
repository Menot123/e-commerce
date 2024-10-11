import React from 'react';
import './ProductManagement.css';
import loginBackground from '/login-background.jpg'

const ProductManagement: React.FC = () => {
    return (
        <div className='admin-container'>
            <img src={loginBackground} alt="Admin Background" />
        </div>
    );
};

export default ProductManagement;