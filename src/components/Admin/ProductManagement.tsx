import React, { useState } from 'react';
import './ProductManagement.css';
// import loginBackground from '/login-background.jpg'
import { Table, Button, Modal, Form, Input, Select, Space, message } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

interface Product {
    id: number;
    image: string;
    name: string;
    description: string;
    price: number;
    category: string;
}

const { Option } = Select;

const ProductManagement: React.FC = () => {

    const [products, setProducts] = useState<Product[]>([
        {
            id: 1,
            image: "https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg",
            name: "Sản phẩm 1",
            description: "Mô tả cho sản phẩm 1",
            price: 100,
            category: "ao",
        },
        {
            id: 2,
            image: "https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg",
            name: "Sản phẩm 2",
            description: "Mô tả cho sản phẩm 2",
            price: 100,
            category: "quan",
        },
        {
            id: 3,
            image: "https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg",
            name: "Sản phẩm 3",
            description: "Mô tả cho sản phẩm 3",
            price: 100,
            category: "bo",
        },

        // Có thể thêm các sản phẩm khác
    ]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const [form] = Form.useForm();

    const showAddModal = () => {
        form.resetFields();
        setSelectedProduct(null);
        setIsEditMode(false);
        setIsModalVisible(true);
    };

    const showEditModal = (product: Product) => {
        setSelectedProduct(product);
        setIsEditMode(true);
        setIsModalVisible(true);
        form.setFieldsValue(product);
    };

    const handleDelete = (id: number) => {
        setProducts(products.filter((product) => product.id !== id));
        message.success("Xóa sản phẩm thành công!");
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSave = () => {
        form.validateFields().then((values) => {
            if (isEditMode && selectedProduct) {
                setProducts(
                    products.map((product) =>
                        product.id === selectedProduct.id ? { ...selectedProduct, ...values } : product
                    )
                );
                message.success("Cập nhật sản phẩm thành công!");
            } else {
                const newProduct = {
                    id: Math.max(...products.map((p) => p.id)) + 1,
                    ...values,
                };
                setProducts([...products, newProduct]);
                message.success("Thêm sản phẩm thành công!");
            }
            setIsModalVisible(false);
        });
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Ảnh",
            dataIndex: "image",
            key: "image",
            render: (text: string) => <img src={text} alt="product" style={{ width: 50 }} />,
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Đơn giá",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Loại sản phẩm",
            dataIndex: "category",
            key: "category",
        },
        {
            title: "Hành động",
            key: "actions",
            render: (_: any, record: Product) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => showEditModal(record)}
                    >
                        Edit
                    </Button>
                    <Button
                        type="primary"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record.id)}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div className='product-manage-container'>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={showAddModal}
                style={{ marginBottom: 16 }}
            >
                Thêm sản phẩm
            </Button>
            <Table
                columns={columns}
                dataSource={products}
                pagination={{
                    pageSize: 5,
                    total: products.length,
                    showSizeChanger: true,
                    pageSizeOptions: ["5", "10", "20", "50", "100"],
                }}
                rowKey="id" />

            <Modal
                title={isEditMode ? "Cập nhật thông tin sản phẩm" : "Thêm sản phẩm"}
                open={isModalVisible}
                onCancel={handleCancel}
                onOk={handleSave}
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="ID" name="id">
                        <Input disabled={true} />
                    </Form.Item>
                    <Form.Item
                        label="URL ảnh sản phẩm"
                        name="image"
                        rules={[{ required: true, message: "Vui lòng nhập url hình ảnh!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Tên sản phẩm"
                        name="name"
                        rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Mô tả"
                        name="description"
                        rules={[{ required: true, message: "Vui lòng nhập mô tả sản phẩm!" }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item
                        label="Đơn giá"
                        name="price"
                        rules={[{ required: true, message: "Vui lòng nhập giá tiền sản phẩm!" }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        label="Loại sản phẩm"
                        name="category"
                        rules={[{ required: true, message: "Vui lòng chọn loại sản phẩm!" }]}
                    >
                        <Select placeholder="Chọn loại sản phẩm">
                            <Option value="ao">Áo</Option>
                            <Option value="quan">Quần</Option>
                            <Option value="bo">Bộ</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ProductManagement;