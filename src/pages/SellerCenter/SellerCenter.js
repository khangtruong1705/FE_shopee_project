import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { DOMAIN } from "../../util/config";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { jwtDecode } from 'jwt-decode';
import { Button, Col, Drawer, Form, Input, Row, Select, Space, message, Upload, Flex, Popconfirm } from 'antd';
import useOpenMessage from '../../customhook/useOpenMessage';
import axios from 'axios';
import styles from './ManageProducts/ManageProducts.module.css'


const SellerCenter = () => {
    const navigate =useNavigate();
    const [count, setCount] = useState(0);
    const [uploadProduct, setUploadProduct] = useState(false);
    const [shopInfo, setShopInfo] = useState({});
    const token = localStorage.getItem('token');
    const { email } = jwtDecode(token);
    const [shopLoading, setShopLoading] = useState(false);
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const { Option } = Select;
    const { openMessage, contextHolder } = useOpenMessage();
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const handleSubmit = async (values) => {
        console.log("Form values:", values);
        try {
            const data = {
                'shop_name_id': shopInfo.shop_name_id,
                'product_name': values.product_name,
                'price': values.price,
                'description': values.description,
                'category_id': values.type,
                'image': '',
                'description_detail': values.description_detail
            }
            await axios.post(`${DOMAIN}/api/products/add-product`, data);
            setOpen(false);
            const message = {
                'message': 'Create New Product successfully!!',
                'type': 'success'
            }
            setTimeout(() => {
                openMessage(message)
                setUploadProduct(prev => !prev);
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
        if (info.file.status === 'uploading') {
            setShopLoading(true);
            return;
        }

        if (info.file.status === 'done') {
            const newImageUrl = info.file.response?.url || info.file.response;
            setShopInfo(prev => ({
                ...prev,
                image: newImageUrl
            }));
        } else if (info.file.status === 'error') {
            message.error('Tải ảnh cửa hàng thất bại!');
        }

        setShopLoading(false);
        fetchData();

    };
    const fetchData = async () => {
        try {

            const res = await axios.get(`${DOMAIN}/api/shop-name/get-shop-by-email-owner/${email}`);
            const shopData = res.data;
            setShopInfo(res.data);
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
    }, [])
    return <>
        <div className="header py-5" style={{ backgroundColor: '#276ddf', }}>
            <div className='d-flex justify-content-between align-items-center w-75 mx-auto'>
                <div className="d-flex align-items-center justify-content-start w-50">
                    <Flex gap="middle" wrap>
                        <Upload
                            name="avatar"
                            showUploadList={false}
                            action={`${DOMAIN}/api/shop-name/upload-shop-avatar-by-shopid`}
                            data={{ 'shop_name_id': shopInfo.shop_name_id }}
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                        >
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '13vw',
                                height: '8vw'
                            }}>
                                {shopLoading || !shopInfo.image ? (
                                    uploadButton(shopLoading)
                                ) : (
                                    <div className={styles.imageWrapper}>
                                        <img
                                            src={shopInfo.image}
                                            alt="avatar"
                                            className={styles.avatarshop}
                                        />
                                        <div className={styles.uploadOverlay}>
                                            {uploadButton(shopLoading)}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Upload>
                    </Flex>
                    <div className='ms-1'>
                        <div className="w-100" style={{ fontSize: '2.4vw', color: 'white' }}>
                            <strong>
                                Tên Shop:
                                {shopInfo.name}
                            </strong>
                        </div>
                        <div className="w-100" style={{ fontSize: '1.1vw', color: 'white' }}>
                            <strong style={{ whiteSpace: 'nowrap' }}>
                                Chủ Shop:{shopInfo.email_owner}
                            </strong>

                        </div>
                        <div className="w-100" style={{ fontSize: '1vw', color: 'white' }}>
                            <strong>
                                Số điện thoại:
                            </strong>
                            {shopInfo.phone_owner}
                        </div>
                    </div>
                </div>
                <div className='w-25 text-end'>
                    <>
                        {contextHolder}
                        <Button
                            style={{ width: '9vw', fontSize: '0.9vw' }}
                            type="primary"
                            onClick={showDrawer}
                            icon={<PlusOutlined />}>
                            {t('newproduct')}
                        </Button>
                        <Drawer
                            title="Create a new product"
                            width='42vw'
                            onClose={onClose}
                            open={open}
                            styles={{
                                body: {
                                    paddingBottom: 80,
                                },
                            }}
                            extra={
                                <Space>
                                    <Button onClick={onClose}>Cancel</Button>

                                </Space>
                            }
                        >
                            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                                <Row gutter={16}>
                                    {formFields.map((field, idx) => (
                                        <Col span={field.span} key={idx}>
                                            <Form.Item name={field.name} label={field.label} rules={field.rules}>
                                                {field.component}
                                            </Form.Item>
                                        </Col>
                                    ))}
                                </Row>
                                <Form.Item style={{ textAlign: 'center' }}>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Drawer>
                    </>
                </div>
            </div>
        </div>
        <div className='row container-fluid text-center'>
            <div className='col-2 text-start pt-5' style={{ borderRight: "3px solid #276ddf" }}>
                <NavLink className="nav-link mb-3" to={`/sellercenter/${shopInfo.email_owner}/manageproduct`}><i style={{ color: '#0d6efd' }} className="fas fa-user me-2"></i>Quản Lý Sản Phẩm</NavLink>
                <NavLink className="nav-link mb-3" to={`/sellercenter/${shopInfo.email_owner}/viewsproductschart`}><i style={{ color: '#0d6efd' }} className="fas fa-user me-2"></i>Lượt Xem Sản Phẩm</NavLink>
                <NavLink className="nav-link mb-3" to={`/sellercenter/${shopInfo.email_owner}/paymentmethodchart`}><i style={{ color: '#0d6efd' }} className="fas fa-user me-2"></i>Phương Thức Thanh Toán</NavLink>
                <NavLink className="nav-link mb-3" to={`/sellercenter/${shopInfo.email_owner}/revenue`}><i style={{ color: '#0d6efd' }} className="fas fa-user me-2"></i>Doanh Thu</NavLink>
                <NavLink className="nav-link mb-3" to={`/sellercenter/${shopInfo.email_owner}/shippingarea`}><i style={{ color: '#0d6efd' }} className="fas fa-user me-2"></i>Khu Vực Vận Chuyển</NavLink>
            </div>
            <div className='col-10'>
                <div className='' style={{ minHeight: '700px' }}>

                    <Outlet context={{ count, setCount,uploadProduct,shopInfo}} />
                </div>
            </div>
        </div>
    </>
}
    ;
export default SellerCenter