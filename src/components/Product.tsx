import React, { useEffect, useState } from 'react';
import './Product.css';
import axios from "axios";
import { Card, Col, Row, Button, Input, Pagination } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

type Category = {
    id: number;
    name: string;
    image: string;
    creationAt: Date;
    updatedAt: Date;
};

type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    creationAt: Date;
    updatedAt: Date;
    category: Category[];
};


// const products = [
//     { "id": 1, "title": "Sản phẩm 1", "description": "Đây là sản phẩm 1", "price": 100, "images": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
//     { "id": 2, "title": "Sản phẩm 2", "description": "Đây là sản phẩm 2", "price": 100, "images": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
//     { "id": 3, "title": "Sản phẩm 3", "description": "Đây là sản phẩm 3 Đây là sản phẩm 3", "price": 100, "images": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
//     { "id": 4, "title": "Sản phẩm 4", "description": "Đây là sản phẩm 4", "price": 100, "images": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
//     { "id": 5, "title": "Sản phẩm 5", "description": "Đây là sản phẩm 5", "price": 100, "images": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
//     { "id": 6, "title": "Sản phẩm 6", "description": "Đây là sản phẩm 6", "price": 100, "images": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
//     { "id": 7, "title": "Sản phẩm 7", "description": "Đây là sản phẩm 7", "price": 100, "images": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
//     { "id": 8, "title": "Sản phẩm 8", "description": "Đây là sản phẩm 8", "price": 100, "images": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
//     { "id": 9, "title": "Sản phẩm 9", "description": "Đây là sản phẩm 9", "price": 100, "images": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
//     { "id": 10, "title": "Sản phẩm 10", "description": "Đây là sản phẩm 10.", "price": 100, "images": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
//     { "id": 11, "title": "Sản phẩm 11", "description": "Đây là sản phẩm 11.", "price": 100, "images": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
//     { "id": 12, "title": "Sản phẩm 12", "description": "Đây là sản phẩm 12.", "price": 100, "images": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
//     { "id": 13, "title": "Sản phẩm 13", "description": "Đây là sản phẩm 13.", "price": 100, "images": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
//     { "id": 14, "title": "Sản phẩm 14", "description": "Đây là sản phẩm 14.", "price": 100, "images": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
//     { "id": 15, "title": "Sản phẩm 15", "description": "Đây là sản phẩm 15.", "price": 100, "images": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
//     { "id": 16, "title": "Sản phẩm 16", "description": "Đây là sản phẩm 16.", "price": 100, "images": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
//     { "id": 17, "title": "Sản phẩm 17", "description": "Đây là sản phẩm 17.", "price": 100, "images": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
//     { "id": 18, "title": "Sản phẩm 18", "description": "Đây là sản phẩm 18.", "price": 100, "images": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
//     { "id": 19, "title": "Sản phẩm 19", "description": "Đây là sản phẩm 19.", "price": 100, "images": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
//     { "id": 20, "title": "Sản phẩm 20", "description": "Đây là sản phẩm 20.", "price": 100, "images": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
//     { "id": 21, "title": "Sản phẩm 21", "description": "Đây là sản phẩm 21.", "price": 100, "images": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
//     { "id": 22, "title": "Sản phẩm 22", "description": "Đây là sản phẩm 22.", "price": 100, "images": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
//     { "id": 23, "title": "Sản phẩm 23", "description": "Đây là sản phẩm 23.", "price": 100, "images": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
//     { "id": 24, "title": "Sản phẩm 24", "description": "Đây là sản phẩm 24.", "price": 100, "images": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' },
//     { "id": 25, "title": "Sản phẩm 25", "description": "Đây là sản phẩm 25.", "price": 100, "images": 'https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg' }
// ]

const Product: React.FC = () => {

    // const productsAPI: string = import.meta.env.VITE_PRODUCT_API as string;

    const getFirstImageUrl = (images: string[]): string => {
        if (images.length == 1) return images[0].slice(2, -2);
        if (images.length > 1) return images[0]
        else return 'none';

    };

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 18; // Số lượng sản phẩm trên mỗi trang

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get<Product[]>('https://api.escuelajs.co/api/v1/products');
                setProducts(response.data);
            } catch (err) {
                setError('Có lỗi xảy ra khi tải dữ liệu');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);
    if (loading) {
        return <div>Đang tải...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
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
                            cover={<img alt={product.title} src={getFirstImageUrl(product.images)} style={{ height: '200px', objectFit: 'cover' }} />}
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
                                title={product.title}
                                description={
                                    <>
                                        <p className='ellipsis' style={{ margin: '0px', height: '50px' }}>{product.description}</p>
                                        <p style={{ margin: '0px', fontWeight: 'bold', color: '#1890ff' }}>
                                            ${product.price.toFixed(0)}
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