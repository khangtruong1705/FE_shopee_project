import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { DOMAIN } from "../../util/config";
import styles from './ManageShop.module.css'
import { useTranslation } from 'react-i18next';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { jwtDecode } from 'jwt-decode';
import { Button, Col, Drawer, Form, Input, Row, Select, Space, message, Upload, Flex, Popconfirm } from 'antd';
import useOpenMessage from '../../customhook/useOpenMessage';
import ChatWithUser from '../../components/ChatWithUser/ChatWithUser';




const ManageShop = () => {
    const navigate = useNavigate();
    const [shopInfo, setShopInfo] = useState({});
    const [arrProducts, setArrProducts] = useState([]);
    const token = localStorage.getItem('token');
    const { email } = jwtDecode(token);
    const [shopLoading, setShopLoading] = useState(false);
    const [productLoading, setProductLoading] = useState({});
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const { Option } = Select;
    const { openMessage, contextHolder } = useOpenMessage();
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
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
            fetchData()
            setOpen(false);
            const message = {
                'message': 'Create New Product successfully!!',
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
        } else {
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
    }, [])
    return <>
        <div style={{ backgroundColor: '#f6f6f6', position: 'relative' }}>
            <div className="header py-5" style={{ backgroundColor: '#ffffff', }}>
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
                        <div className='ms-5'>
                            <div className="w-100" style={{ fontSize: '2.4vw', color: '#fb5530' }}>
                                <strong>
                                    <i className="fa-solid fa-shop" />:
                                </strong>
                                {shopInfo.name}
                            </div>
                            <div className="w-100" style={{ fontSize: '1.2vw', whiteSpace: 'nowrap', color: '#1677ff' }}>
                                <strong>
                                    <i className="fa-solid fa-house-user" />:
                                </strong>{shopInfo.email_owner}

                            </div>
                            <div className="w-100" style={{ fontSize: '1.1vw', color: '#2cbb00' }}>
                                <strong>
                                    <i className="fa-solid fa-phone-volume"></i>:
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
            <div className="body w-75 mx-auto" style={{ minHeight: '550px' }}>
                <div className='card' style={{ borderRadius: '0' }}>
                    <div className='card-body text-center' style={{ color: '#f85902', fontSize: '1.2vw' }} >
                        {t('yourproduct')}
                    </div>
                    <div className='card-footer' style={{ backgroundColor: '#f85902', borderRadius: '0' }}></div>
                </div>
                <div className='row' style={{ boxSizing: 'border-box' }}>
                    {arrProducts.length == 0 ? (<div className="mt-4 text-center mx-auto w-75 alert alert-info">Shop Chưa Có Sản Phẩm Nào !!!</div>) : (arrProducts?.map((product, index) => {
                        return <div className='col-lg-6 col-md-12 col-sm-12' key={index}>
                            <div className={`${styles.carditem} card m-1`}>
                                <div className="card-header" style={{ position: 'relative', textAlign: 'center' }}>
                                    <i
                                        style={{
                                            fontSize: '2.5vw',
                                            color: '#fb5530',
                                            position: 'absolute',
                                            left: '10px',
                                            top: '50%',
                                            transform: 'translateY(-50%)'
                                        }}
                                        className="fa-regular fa-calendar"
                                    />
                                    <p style={{ color: '#fb5530', fontSize: '1.8vw' }}><strong>{product.name}</strong></p>
                                </div>
                                <div className="card-body d-flex align-items-center justify-content-around" style={{ backgroundColor: '#ffffff' }}>
                                    <div>
                                        <table border="0" cellPadding="8" style={{ fontSize: '1vw' }}>
                                            <tbody>
                                                <tr>
                                                    <td
                                                        style={{
                                                            maxWidth: '10vw',
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis'
                                                        }}
                                                        className="text-start"
                                                    >
                                                        <strong>Description:</strong> {product.description}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-start">
                                                        <strong>Price:</strong> {product.price} VNĐ
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-start">
                                                        <strong>Create_at:</strong> {product.created_at}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className=''>
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
                                                        <img src={product.image} alt="avatar" className={styles.avatarImage} />
                                                        <div className={styles.uploadOverlay}>
                                                            {uploadButton(productLoading[product.product_id])}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    uploadButton(productLoading[product.product_id])
                                                )}
                                            </div>
                                        </Upload>
                                    </div>
                                </div>
                                <div className='card-footer' style={{ fontSize: '1vw' }}>
                                    <div className='d-flex justify-content-between w-100' >
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
                                        <div>
                                            <Button type="button"
                                                style={{ fontSize: '0.9vw' }}
                                                className="btn btn-primary"
                                                data-bs-toggle="modal"
                                                data-bs-target="#staticBackdrop"
                                                onClick={() => {
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
                                                                        'product_id': product.product_id,
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    }))}
                </div>
            </div>
            <div className={styles.sidebar}>
                <i
                    className={`${styles.sidebaricons} fas fa-house-chimney`}
                    onClick={() => {
                        navigate('/')
                    }}
                />
                <i className={`${styles.sidebaricons} fas fa-chart-simple`}
                    onClick={() => {
                        navigate(`/manageshop/chart/${shopInfo.email_owner}`, {
                            state: {
                                shop_id: shopInfo.shop_name_id
                            }
                        })
                    }}


                />
            </div>
        </div>
        <ChatWithUser></ChatWithUser>
    </>
};


export default ManageShop