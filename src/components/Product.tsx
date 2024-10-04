import React, { useState } from 'react';
import './Product.css';
import { Card, Col, Row, Button, Input, Pagination } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';


const products = [
    { "id": 1, "name": "Sản phẩm 1", "description": "Đây là sản phẩm 1", "price": 100, "imageUrl": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
    { "id": 2, "name": "Sản phẩm 2", "description": "Đây là sản phẩm 2", "price": 100, "imageUrl": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
    { "id": 3, "name": "Sản phẩm 3", "description": "Đây là sản phẩm 3 Đây là sản phẩm 3", "price": 100, "imageUrl": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
    { "id": 4, "name": "Sản phẩm 4", "description": "Đây là sản phẩm 4", "price": 100, "imageUrl": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
    { "id": 5, "name": "Sản phẩm 5", "description": "Đây là sản phẩm 5", "price": 100, "imageUrl": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
    { "id": 6, "name": "Sản phẩm 6", "description": "Đây là sản phẩm 6", "price": 100, "imageUrl": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
    { "id": 7, "name": "Sản phẩm 7", "description": "Đây là sản phẩm 7", "price": 100, "imageUrl": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
    { "id": 8, "name": "Sản phẩm 8", "description": "Đây là sản phẩm 8", "price": 100, "imageUrl": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
    { "id": 9, "name": "Sản phẩm 9", "description": "Đây là sản phẩm 9", "price": 100, "imageUrl": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
    { "id": 10, "name": "Sản phẩm 10", "description": "Đây là sản phẩm 10.", "price": 100, "imageUrl": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
    { "id": 11, "name": "Sản phẩm 11", "description": "Đây là sản phẩm 11.", "price": 100, "imageUrl": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
    { "id": 12, "name": "Sản phẩm 12", "description": "Đây là sản phẩm 12.", "price": 100, "imageUrl": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
    { "id": 13, "name": "Sản phẩm 13", "description": "Đây là sản phẩm 13.", "price": 100, "imageUrl": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
    { "id": 14, "name": "Sản phẩm 14", "description": "Đây là sản phẩm 14.", "price": 100, "imageUrl": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
    { "id": 15, "name": "Sản phẩm 15", "description": "Đây là sản phẩm 15.", "price": 100, "imageUrl": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
    { "id": 16, "name": "Sản phẩm 16", "description": "Đây là sản phẩm 16.", "price": 100, "imageUrl": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
    { "id": 17, "name": "Sản phẩm 17", "description": "Đây là sản phẩm 17.", "price": 100, "imageUrl": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
    { "id": 18, "name": "Sản phẩm 18", "description": "Đây là sản phẩm 18.", "price": 100, "imageUrl": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
    { "id": 19, "name": "Sản phẩm 19", "description": "Đây là sản phẩm 19.", "price": 100, "imageUrl": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
    { "id": 20, "name": "Sản phẩm 20", "description": "Đây là sản phẩm 20.", "price": 100, "imageUrl": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
    { "id": 21, "name": "Sản phẩm 21", "description": "Đây là sản phẩm 21.", "price": 100, "imageUrl": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
    { "id": 22, "name": "Sản phẩm 22", "description": "Đây là sản phẩm 22.", "price": 100, "imageUrl": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
    { "id": 23, "name": "Sản phẩm 23", "description": "Đây là sản phẩm 23.", "price": 100, "imageUrl": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
    { "id": 24, "name": "Sản phẩm 24", "description": "Đây là sản phẩm 24.", "price": 100, "imageUrl": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
    { "id": 25, "name": "Sản phẩm 25", "description": "Đây là sản phẩm 25.", "price": 100, "imageUrl": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' }
]

const Product: React.FC = () => {
    // return (

    //     // <div className='product-container'>
    //     //     {/* <img src={loginBackground} alt="Sản phẩm Background" /> */}
    //     // </div>
    // );

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 18; // Số lượng sản phẩm trên mỗi trang

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleAddToCart = (productId: number) => {
        console.log(`Added product ${productId} to cart`);
    };

    return (
        <div style={{ padding: '30px' }}>
            {/* Input search */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                <Input.Search
                    placeholder="Tìm sản phẩm theo tên"
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{ width: '500px', marginRight: '0px' }}
                />
            </div>

            {/* List product */}
            <Row gutter={[16, 16]}>
                {paginatedProducts.map((product) => (
                    <Col xs={24} sm={12} md={6} lg={4} key={product.id}>
                        <Card
                            hoverable
                            cover={<img alt={product.name} src={product.imageUrl} style={{ height: '200px', objectFit: 'cover' }} />}
                            style={{ fontSize: '14px', padding: '10px' }}
                            actions={[
                                <Button
                                    type="primary"
                                    icon={<ShoppingCartOutlined />}
                                    onClick={() => handleAddToCart(product.id)}
                                >
                                    Thêm
                                </Button>,
                            ]}
                        >
                            <Card.Meta
                                title={product.name}
                                description={
                                    <>
                                        <p style={{ margin: '0px', height: '50px' }}>{product.description}</p>
                                        <p style={{ margin: '0px', fontWeight: 'bold', color: '#1890ff' }}>
                                            {product.price.toFixed(0)} VNĐ
                                        </p>
                                    </>
                                }
                            />
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Pagination */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={filteredProducts.length}
                    onChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
};

export default Product;