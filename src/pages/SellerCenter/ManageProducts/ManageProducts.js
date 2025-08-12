import { useState, useEffect } from 'react'
import { useNavigate,useOutletContext } from "react-router-dom";
import axios from 'axios';
import { DOMAIN } from "../../../util/config";
import styles from './ManageProducts.module.css'
import { useTranslation } from 'react-i18next';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { jwtDecode } from 'jwt-decode';
import { Button, Col, Form, Input, Row, Select, Space, message, Upload, Flex, Popconfirm } from 'antd';
import useOpenMessage from '../../../customhook/useOpenMessage';
import ChatWithUser from '../../../components/ChatWithUser/ChatWithUser';




const ManageProducts = () => {
    const { uploadProduct } = useOutletContext();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [shopInfo, setShopInfo] = useState({});
    const [arrProducts, setArrProducts] = useState([]);
    const token = localStorage.getItem('token');
    const { email } = jwtDecode(token);
    const [productLoading, setProductLoading] = useState({});
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [form2] = Form.useForm();
    const { Option } = Select;
    const { openMessage, contextHolder } = useOpenMessage();
    const confirm = async (product) => {
        try {
            const res = await axios.delete(`${DOMAIN}/api/products/delete-product-by-productid`, {
                data: {
                    product_id: product.product_id,
                    category_id: product.category_id,
                    image: product.image
                }
            });
            fetchData()
            message.success(`${res.data.message}`);
        } catch (e) {
            console.log(e);
            message.error('Delete Fail');
        }
    };
    const cancel = e => {
        console.log(e);
        message.error('Click on No');
    };
    const uploadButton = (isLoading = false) => (
        <button style={{ border: '1px dashed black', borderRadius: '50px', background: 'none' }} type="button">
            {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );
    const beforeUpload = file => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };
    const handleChange = async (info, index = null, product = null) => {
        if (product && index !== null) {
            const id = product.product_id;

            if (info.file.status === 'uploading') {
                product.image = false;
                setProductLoading(prev => ({ ...prev, [id]: true }));
                return;
            }
            if (info.file.status === 'done') {
                const newImageUrl = info.file.response?.url || info.file.response;
                setArrProducts(prev => {
                    const updated = [...prev];
                    updated[index] = {
                        ...updated[index],
                        image: newImageUrl
                    };
                    return updated;
                });
            } else if (info.file.status === 'error') {
                message.error('Tải ảnh sản phẩm thất bại!');
            }

            setProductLoading(prev => ({ ...prev, [id]: false }));
            fetchData();
        }
    };
    const fetchData = async () => {
        try {

            const res = await axios.get(`${DOMAIN}/api/shop-name/get-shop-by-email-owner/${email}`);
            const shopData = res.data;
            setShopInfo(res.data);
            const response = await axios.get(`${DOMAIN}/api/products/get-products-by-shop-name-id`, {
                params: {
                    shop_name_id: shopData.shop_name_id
                }
            });
            setArrProducts(response.data);
        } catch (error) {

            console.error('Error fetching products:', error);
        }
    };
    const categories = ["Thời Trang Nam", "Thiết Bị Điện Tử", "Máy Tính Và Laptop",
        "Máy Ảnh", "Đồng Hồ", "Giày Dép Nam", "Thiết Bị Điện Gia Dụng", "Thể Thao Và Du Lịch",
        "Ôtô, Xe Máy, Xe Đạp", "Thời Trang Nữ", "Mẹ Và Bé", "Nhà Cửa Và Đời Sống", "Sắc Đẹp",
        "Sức Khỏe", "Túi, Ví Nữ", "Giày Dép Nữ", "Phụ kiện, Trang Sức Nữ", "Bách Khoa Online",
        "Nhà Sách Online", "Điện Thoại"];
    const formFields = [
        {
            name: 'product_name',
            label: 'Product Name',
            rules: [{ required: true, message: 'Please enter product name' }],
            component: <Input placeholder="Please enter product name" />,
            span: 12,
        },
        {
            name: 'price',
            label: 'Price',
            rules: [{ required: true, message: 'Please enter price' }],
            component: <Input type="number" addonAfter="VNĐ" placeholder="Please enter price" />,
            span: 12,
        },
        {
            name: 'description',
            label: 'Description',
            rules: [{ required: true, message: 'Please enter description' }],
            component: <Input placeholder="Please enter description" />,
            span: 12,
        },
        {
            name: 'type',
            label: 'Type (category)',
            rules: [{ required: true, message: 'Please choose the type' }],
            component: (
                <Select placeholder="Please choose the type">
                    {categories.map((category, index) => (
                        <Option key={index + 1} value={index + 1}>
                            {category}
                        </Option>
                    ))}
                </Select>
            ),
            span: 12,
        },
        {
            name: 'description_detail',
            label: 'Description Detail',
            rules: [{ required: true, message: 'Please enter description detail' }],
            component: <Input.TextArea rows={4} placeholder="Please enter description detail" />,
            span: 24,
        },
    ];
    useEffect(() => {
        fetchData()
    }, [uploadProduct])
    return <>
        <div style={{ backgroundColor: '#f6f6f6' }}>
            <div className='mt-4'>
                {arrProducts.length === 0 ? (
                    <div className="mt-4 text-center mx-auto w-75 alert alert-info">
                        Shop Chưa Có Sản Phẩm Nào !!!
                    </div>
                ) : (
                    <table
                        style={{
                            fontSize: '1vw',
                            borderCollapse: 'collapse',
                            width: '100%',
                        }}
                    >
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left', }}>STT</th>
                                <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left',width: '20%' }}>Hình ảnh</th>
                                <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left', width: '30%' }}>Name</th>
                                <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'right', width: '20%' }}>Price</th>
                                <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center', width: '20%' }}>Create_at</th>
                                <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center', width: '10%' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrProducts.map((product, index) => (
                                <tr key={product.product_id}>
                                    <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'right' }}>
                                        {index + 1}
                                    </td>
                                    <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                                        <Upload
                                            name="avatar"
                                            className={styles.avatarproduct}
                                            showUploadList={false}
                                            action={`${DOMAIN}/api/products/upload-product-avatar`}
                                            data={{
                                                product_id: product.product_id,
                                                category_id: product.category_id
                                            }}
                                            beforeUpload={beforeUpload}
                                            onChange={(info) => handleChange(info, index, product)}
                                        >
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                                {product.image ? (
                                                    <div className={styles.imageWrapper}>
                                                        <img style={{ width: '3vw', height: '3vw' }} src={product.image} alt="avatar" className={styles.avatarImage} />
                                                        <div className={styles.uploadOverlay}>
                                                            {uploadButton(productLoading[product.product_id])}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    uploadButton(productLoading[product.product_id])
                                                )}
                                            </div>
                                        </Upload>
                                    </td>
                                    <td
                                        style={{
                                            border: '1px solid #ccc',
                                            padding: '8px',
                                            maxWidth: '10vw',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}
                                    >
                                        {product.name}
                                    </td>
                                    <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'right' }}>
                                        {product.price}
                                    </td>
                                    <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                                        {product.created_at}
                                    </td>
                                    <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }} >
                                        <div className='card-footer' style={{ fontSize: '1vw' }}>
                                            <div className='d-flex justify-content-between w-100' >
                                                 <div>
                                                    <Button type="button"
                                                        style={{ fontSize: '0.9vw' }}
                                                        className="btn btn-primary mx-2"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#staticBackdrop"
                                                        onClick={() => {
                                                             setSelectedProduct(product);
                                                            form2.setFieldsValue({
                                                                product_name: product.name,
                                                                price: product.price,
                                                                description: product.description,
                                                                type: product.category_id,
                                                                description_detail: product.detailed_description,
                                                            });
                                                        }}
                                                    >{t('edit')}
                                                    </Button>
                                                    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                                        <div className="modal-dialog">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Chỉnh Sửa Sản Phẩm</h1>
                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                                                </div>
                                                                <div className="modal-body">
                                                                    <Form form={form2} layout="vertical" onFinish={async (values) => {
                                                                        try {
                                                                            const data = {
                                                                                'shop_name_id': shopInfo.shop_name_id,
                                                                                'product_name': values.product_name,
                                                                                'product_id': selectedProduct.product_id,
                                                                                'price': values.price,
                                                                                'description': values.description,
                                                                                'category_id': values.type,

                                                                                'description_detail': values.description_detail
                                                                            }
                                                                            console.log('xxxx', data)
                                                                            const res = await axios.put(`${DOMAIN}/api/products/edit-product-by-productid`, data);
                                                                            fetchData()
                                                                            const modalElement = document.getElementById('staticBackdrop');
                                                                            const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
                                                                            modalInstance?.hide();
                                                                            const message = {
                                                                                'message': 'Edit Product successfully!!',
                                                                                'type': 'success'
                                                                            }
                                                                            setTimeout(() => {
                                                                                openMessage(message)
                                                                            }, 300);
                                                                        } catch (error) {
                                                                            console.error('Error sending token to backend:', error);
                                                                            setOpen(false);
                                                                            const message = {
                                                                                'message': 'Create New Product Failed!!',
                                                                                'type': 'error'
                                                                            }
                                                                            setTimeout(() => {
                                                                                openMessage(message)
                                                                            }, 300);
                                                                        }
                                                                    }}>
                                                                        <Row gutter={16}>
                                                                            <Col span={12}>
                                                                                <Form.Item
                                                                                    name="product_name"
                                                                                    label="Product Name"
                                                                                    rules={[{ required: true, message: 'Please enter product name' }]}
                                                                                >
                                                                                    <Input placeholder="Please enter product name" />
                                                                                </Form.Item>
                                                                            </Col>
                                                                            <Col span={12}>
                                                                                <Form.Item
                                                                                    name="price"
                                                                                    label="Price"
                                                                                    rules={[{ required: true, message: 'Please enter price' }]}
                                                                                >
                                                                                    <Input
                                                                                        type="number"
                                                                                        addonAfter="VNĐ"
                                                                                        placeholder="Please enter price"
                                                                                    />
                                                                                </Form.Item>
                                                                            </Col>
                                                                        </Row>
                                                                        <Row gutter={16}>
                                                                            <Col span={12}>
                                                                                <Form.Item
                                                                                    name="description"
                                                                                    label="Description"
                                                                                    rules={[{ required: true, message: 'Please enter description' }]}
                                                                                >
                                                                                    <Input
                                                                                        placeholder="Please enter price"
                                                                                    />
                                                                                </Form.Item>
                                                                            </Col>
                                                                            <Col span={12}>
                                                                                <Form.Item
                                                                                    name="type"
                                                                                    label="Type (category)"
                                                                                    rules={[{ required: true, message: 'Please choose the type' }]}
                                                                                >
                                                                                    <Select placeholder="Please choose the type">
                                                                                        {categories.map((category, index) => (
                                                                                            <Option key={index + 1} value={index + 1}>
                                                                                                {category}
                                                                                            </Option>
                                                                                        ))}
                                                                                    </Select>
                                                                                </Form.Item>
                                                                            </Col>
                                                                        </Row>
                                                                        <Row gutter={16}>
                                                                            <Col span={24}>
                                                                                <Form.Item
                                                                                    name="description_detail"
                                                                                    label="Description Detail"
                                                                                    rules={[
                                                                                        {
                                                                                            required: true,
                                                                                            message: 'please enter url description detail',
                                                                                        },
                                                                                    ]}
                                                                                >
                                                                                    <Input.TextArea rows={4} placeholder="please enter description detail" />
                                                                                </Form.Item>
                                                                            </Col>
                                                                        </Row>
                                                                        <Form.Item className="modal-footer">
                                                                            <Button danger data-bs-dismiss="modal" className='mx-2'>Close</Button>
                                                                            <Button
                                                                                htmlType="submit"
                                                                                type='primary'>Submit</Button>
                                                                        </Form.Item>
                                                                    </Form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Popconfirm
                                                    title="Delete the product"
                                                    description="Are you sure to delete this product?"
                                                    onConfirm={() => confirm(product, index)}
                                                    onCancel={cancel}
                                                    okText="Yes"
                                                    cancelText="No"
                                                >
                                                    <Button
                                                        danger
                                                        style={{ fontSize: '0.9vw' }}
                                                    >{t('delete')}</Button>
                                                </Popconfirm>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
        <ChatWithUser></ChatWithUser>
    </>
};


export default ManageProducts