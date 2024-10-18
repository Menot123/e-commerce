import React, { useEffect, useState } from 'react';
import './TypeManagement.css';
// import loginBackground from '/login-background.jpg'
import axios from "axios";
import { Table, Button, Modal, Form, Input, Space, message } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

type Category = {
    id: number;
    name: string;
    image: string;
    creationAt: Date;
    updatedAt: Date;
};


const TypeManagement: React.FC = () => {

    const categoriesAPI: string = import.meta.env.VITE_CATEGORY_API as string;

    // const [categories, setCategories] = useState<category[]>([
    //     {
    //         id: 1,
    //         images: ["https://m.media-amazon.com/images/I/719baS3kW5L._AC_SX569_.jpg"],
    //         title: "loại sản phẩm 1",
    //         description: "Mô tả cho loại sản phẩm 1",
    //         price: 100,
    //         category: {
    //             id: 1,
    //             name: 'Loai 1',
    //             image: 'https://m.media-amazon.com/images/',
    //             creationAt: new Date(),
    //             updatedAt: new Date(),
    //         },
    //         creationAt: new Date(),
    //         updatedAt: new Date(),
    //     }
    // ]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [pageSize, setPageSize] = useState(5);

    useEffect(() => {
        const fetchcategories = async () => {
            try {
                const response = await axios.get<Category[]>(categoriesAPI);
                setCategories(response.data);
            } catch (err) {
                console.log('Có lỗi xảy ra khi tải dữ liệu');
            }
        };

        fetchcategories();
    }, []);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const [form] = Form.useForm();

    const showAddModal = () => {
        form.resetFields();
        setSelectedCategory(null);
        setIsEditMode(false);
        setIsModalVisible(true);
    };

    const showEditModal = (category: Category) => {
        setSelectedCategory(category);
        setIsEditMode(true);
        setIsModalVisible(true);
        form.setFieldsValue(category);
    };

    const handleDelete = (id: number) => {
        setCategories(categories.filter((category) => category.id !== id));
        message.success("Xóa loại sản phẩm thành công!");
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSave = () => {
        form.validateFields().then((values) => {
            if (isEditMode && selectedCategory) {
                setCategories(
                    categories.map((category) =>
                        category.id === selectedCategory.id ? { ...selectedCategory, ...values } : category
                    )
                );
                message.success("Cập nhật loại sản phẩm thành công!");
            } else {
                const newcategory = {
                    id: Math.max(...categories.map((p) => p.id)) + 1,
                    ...values,
                };
                setCategories([...categories, newcategory]);
                message.success("Thêm loại sản phẩm thành công!");
            }
            setIsModalVisible(false);
        });
    };

    const paginationChange = (page: number, pageSize: number) => {
        console.log(page)
        if (pageSize) {
            setPageSize(pageSize);
        }
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
            render: (text: string) => <img src={text} alt="category" style={{ width: 50 }} />,
        },
        {
            title: "Tên loại sản phẩm",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Hành động",
            key: "actions",
            render: (_: any, record: Category) => (
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
        <div className='category-manage-container'>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={showAddModal}
                style={{ marginBottom: 16 }}
            >
                Thêm loại sản phẩm
            </Button>
            <Table
                columns={columns}
                dataSource={categories}
                pagination={{
                    pageSize: pageSize,
                    total: categories.length,
                    onChange: (page: number, pageSize: number) => paginationChange(page, pageSize),
                    showSizeChanger: true,
                    pageSizeOptions: ["5", "10", "20", "50", "100"],
                }}
                rowKey="id" />

            <Modal
                title={isEditMode ? "Cập nhật thông tin loại loại sản phẩm" : "Thêm loại loại sản phẩm"}
                open={isModalVisible}
                onCancel={handleCancel}
                onOk={handleSave}
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="ID" name="id">
                        <Input disabled={true} />
                    </Form.Item>
                    <Form.Item
                        label="URL ảnh loại sản phẩm"
                        name="image"
                        rules={[{ required: true, message: "Vui lòng nhập url hình ảnh!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Tên loại sản phẩm"
                        name="name"
                        rules={[{ required: true, message: "Vui lòng nhập tên loại sản phẩm!" }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default TypeManagement;