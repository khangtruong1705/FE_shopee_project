import { useState, useEffect } from 'react'
import { useOutletContext } from "react-router-dom";
import axios from 'axios';
import { DOMAIN } from "../../../util/config";
import styles from './ManageProducts.module.scss'
import { useTranslation } from 'react-i18next';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { jwtDecode } from 'jwt-decode';
import { Button, Col, Form, Row, message, Upload, Popconfirm } from 'antd';
import useOpenMessage from '../../../customhook/useOpenMessage';
import ChatWithUser from '../../../components/ChatWithUser/ChatWithUser';
import { formFields } from '../SellerCenterRawData';
import { columns, thStyle } from './ManageProductsRawData'


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
    const { openMessage } = useOpenMessage();
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
            await axios.put(`${DOMAIN}/api/products/edit-product-by-productid`, data);
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
    }
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
                    <div>
                        <div className='my-3' style={{ fontSize: '1.7vw', fontWeight: '700', color: '#1250dc' }}>Sản Phẩm của Shop</div>
                        <table style={{ fontSize: '1vw', borderCollapse: 'collapse', width: '100%', }}>
                            <thead>
                                <tr>
                                    {columns.map((col, idx) => (
                                        <th key={idx} style={{ ...thStyle, width: col.width }}>
                                            {col.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {arrProducts.map((product, index) => (
                                    <tr key={product.product_id}>
                                        <td style={{ ...thStyle }}>
                                            {index + 1}
                                        </td>
                                        <td style={{ ...thStyle }}>
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
                                        <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                                            {product.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
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
                                                                        <Form form={form2} layout="vertical" onFinish={handleSubmit}>
                                                                            <Row gutter={16}>
                                                                                {formFields.map((field, idx) => (
                                                                                    <Col span={field.span} key={idx}>
                                                                                        <Form.Item name={field.name} label={field.label} rules={field.rules}>
                                                                                            {field.component}
                                                                                        </Form.Item>
                                                                                    </Col>
                                                                                ))}
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
                    </div>
                )}
            </div>
        </div>
        <ChatWithUser></ChatWithUser>
    </>
};


export default ManageProducts