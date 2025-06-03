import { useState, useEffect } from 'react'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { DOMAIN } from '../../../util/config';
import { Popconfirm, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { QuestionCircleOutlined } from '@ant-design/icons';





const PurchaseOrder = () => {
    const { t } = useTranslation();
    const token = localStorage.getItem('token')
    const { user_id } = jwtDecode(token);
    const [orderList, setOrderList] = useState([])
    const deletePurchaseOrder = async (data) => {
        try {
            const response = await axios.put(`${DOMAIN}/api/order-items/delete-purchase-order-status-by-orderitemid`, data);
            fetchData()
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }
    const fetchData = async () => {
        try {
            const response = await axios.get(`${DOMAIN}/api/order-items/get-purchase-order-by-userid/${user_id}`);
            setOrderList(response.data); // Gán dữ liệu vào arrMain
        } catch (error) {
            console.error('Error fetching products:', error);
            setOrderList([]);
        }
    };
    useEffect(() => {
        console.log('orderList', orderList)
        fetchData()
    }, [])
    return <>
        <div className="container pt-5">
            <div>
                {orderList && orderList.length > 0 ? (
                    orderList.map((item, index) => (
                        <div key={index} className="mb-4 card">
                            <h5>{t('order')} #{item.order_item.order_item_id}</h5>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>{t('product')}</th>
                                        <th>{t('price')}</th>
                                        <th>{t('quantity')}</th>
                                        <th>{t('totalprice')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {item.order_item.items_list?.map((child, i) => (
                                        <tr key={i}>
                                            <td>{child.product_name}</td>
                                            <td>{Number(child.price).toLocaleString()}đ</td>
                                            <td>{child.quantity}</td>
                                            <td>{(child.price * child.quantity).toLocaleString()}đ</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className='text-start'>
                                <strong>{t('subtotal')}:</strong> {Number(item.payment.total_amount).toLocaleString()}đ<br />
                                <strong>{t('paymentmethod')}</strong> {item.payment.payment_method}<br />
                                <strong>{t('paymentstatus')}:</strong> {item.payment.payment_status}
                            </div>
                            <div className='text-end p-2'>
                                <Popconfirm
                                    title="Delete the task"
                                    description="Are you sure to delete this order?"
                                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                    onConfirm={() => {
                                        const data = {
                                            'order_item_id': item.order_item.order_item_id
                                        }
                                        deletePurchaseOrder(data)
                                    }}
                                >
                                    <Button danger>{t('delete')}</Button>
                                </Popconfirm>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="alert alert-info">Bạn Chưa Có Order Nào !!!</div>
                )}
            </div>
        </div>
    </>

};




export default PurchaseOrder