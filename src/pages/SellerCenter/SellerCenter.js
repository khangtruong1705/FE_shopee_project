import { NavLink, Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { DOMAIN } from "../../util/config";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { jwtDecode } from 'jwt-decode';
import { Button, Col, Drawer, Form, Row, Space, message, Upload, Flex } from 'antd';
import useOpenMessage from '../../customhook/useOpenMessage';
import axios from 'axios';
import styles from './ManageProducts/ManageProducts.module.scss'
import { formFields } from './SellerCenterRawData';

const SellerCenter = () => {
    const [count, setCount] = useState(0);
    const [uploadProduct, setUploadProduct] = useState(false);
    const [shopInfo, setShopInfo] = useState({});
    const token = localStorage.getItem('token');
    const { email } = jwtDecode(token);
    const [shopLoading, setShopLoading] = useState(false);
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
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
            setShopInfo(res.data);
        } catch (error) {

            console.error('Error fetching products:', error);
        }
    };
    useEffect(() => {
        fetchData()
    }, [])
    return <>
        <div className="header py-5" style={{ backgroundColor: '#eaeffb', }}>
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
                        <div className="w-100" style={{ fontSize: '2.4vw' }}>
                            <strong>
                                Tên Shop:
                                {shopInfo.name}
                            </strong>
                        </div>
                        <div className="w-100" style={{ fontSize: '1.1vw' }}>
                            <strong style={{ whiteSpace: 'nowrap' }}>
                                Chủ Shop:{shopInfo.email_owner}
                            </strong>

                        </div>
                        <div className="w-100" style={{ fontSize: '1vw' }}>
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
                <NavLink className="nav-link mb-3" to={`/sellercenter/${shopInfo.email_owner}/manageproduct`}>
                    <img style={{ width: '1.5vw', height: '1.5vw' }} src={process.env.PUBLIC_URL + '/asset/images/list.webp'}></img>
                    <span className='mx-2' style={{ fontSize: '0.9vw' }}>Quản Lý Sản Phẩm</span>
                </NavLink>
                <NavLink className="nav-link mb-3" to={`/sellercenter/${shopInfo.email_owner}/viewsproductschart`}>
                    <img style={{ width: '1.5vw', height: '1.5vw' }} src={process.env.PUBLIC_URL + '/asset/images/chart.webp'}></img>
                    <span className='mx-2' style={{ fontSize: '0.9vw' }}>Lượt Xem Sản Phẩm</span>
                </NavLink>
                <NavLink className="nav-link mb-3" to={`/sellercenter/${shopInfo.email_owner}/paymentmethodchart`}>
                    <img style={{ width: '1.5vw', height: '1.5vw' }} src={process.env.PUBLIC_URL + '/asset/images/chart.webp'}></img>
                    <span className='mx-2' style={{ fontSize: '0.9vw' }}>Phương Thức Thanh Toán</span>
                </NavLink>
                <NavLink className="nav-link mb-3" to={`/sellercenter/${shopInfo.email_owner}/revenue`}>
                    <img style={{ width: '1.5vw', height: '1.5vw' }} src={process.env.PUBLIC_URL + '/asset/images/chart.webp'}></img>
                    <span className='mx-2' style={{ fontSize: '0.9vw' }}> Doanh Thu</span>
                </NavLink>
                <NavLink className="nav-link mb-3" to={`/sellercenter/${shopInfo.email_owner}/shippingarea`}>
                    <img style={{ width: '1.5vw', height: '1.5vw' }} src={process.env.PUBLIC_URL + '/asset/images/chart.webp'}></img>
                    <span className='mx-2' style={{ fontSize: '0.9vw' }}> Khu Vực Vận Chuyển</span>
                </NavLink>
            </div>
            <div className='col-10'>
                <div className='' style={{ minHeight: '700px' }}>

                    <Outlet context={{ count, setCount, uploadProduct, shopInfo }} />
                </div>
            </div>
        </div>
    </>
}
    ;
export default SellerCenter