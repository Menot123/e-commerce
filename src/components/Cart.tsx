import React, { useState } from "react";
import { Table, InputNumber, Button, Space, Typography, message, Modal } from "antd";
import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const { Title } = Typography;

interface CartItem {
    id: number;
    image: string;
    name: string;
    price: number;
    quantity: number;
}

const Cart: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([
        { id: 1, image: "https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg", name: "Sản phẩm A", price: 100000, quantity: 2 },
        { id: 2, image: "https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg", name: "Sản phẩm B", price: 200000, quantity: 1 },
    ])

    const [modalVisible, setModalVisible] = useState(false);
    const [modalImage, setModalImage] = useState("");

    const showModal = (image: string) => {
        setModalVisible(true);
        setModalImage(image);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleDeleteItem = (id: number) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
        message.success("Đã xóa sản phẩm khỏi giỏ hàng.");
    };

    const handleQuantityChange = (id: number, quantity: number) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: quantity } : item
            )
        );
    };

    const totalAmount = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const columns = [
        {
            title: "STT",
            dataIndex: "id",
            key: "id",
            render: (index: number) => index,
        },
        {
            title: "Hình ảnh",
            dataIndex: "image",
            key: "image",
            render: (image: string) => <img src={image} style={{ width: 50, height: 50, cursor: "pointer" }} onClick={() => showModal(image)} alt="Product" />,
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Đơn giá",
            dataIndex: "price",
            key: "price",
            render: (price: number) => `${price.toLocaleString()} VND`,
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
            render: (quantity: number, record: CartItem) => (
                <InputNumber
                    min={1}
                    value={quantity}
                    onChange={(value) => handleQuantityChange(record.id, value ?? 1)}
                />
            ),
        },
        {
            title: "Thành tiền",
            key: "total",
            render: (record: CartItem) => {
                const itemTotal = record.price * record.quantity;
                return `${itemTotal.toLocaleString()} VND`;
            },
        },
        {
            title: "Hành động",
            key: "action",
            render: (record: CartItem) => (
                <Space size="middle">
                    <Button
                        icon={<DeleteOutlined />}
                        danger
                        onClick={() => handleDeleteItem(record.id)}
                    >
                        Xóa
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: "20px", maxWidth: "1000px", margin: "auto" }}>
            <Title level={2}>
                <ShoppingCartOutlined /> Giỏ hàng của bạn
            </Title>

            <Table
                dataSource={cartItems}
                columns={columns}
                rowKey="id"
                pagination={false}
                summary={() => (
                    <Table.Summary.Row>
                        <Table.Summary.Cell index={0} colSpan={4}>
                            <strong>Tổng số tiền:</strong>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={1}>
                            <strong>{totalAmount.toLocaleString()} VND</strong>
                        </Table.Summary.Cell>
                    </Table.Summary.Row>
                )}
            />

            <div style={{ marginTop: "20px", textAlign: "right" }}>
                <Button type="primary" size="large" onClick={() => message.success("Đặt hàng thành công!")}>
                    Đặt hàng
                </Button>
            </div>

            <Modal visible={modalVisible} onCancel={handleCloseModal} footer={null}>
                <img src={modalImage} alt="product" style={{ width: "100%" }} />
            </Modal>
        </div>
    );
};

export default Cart;