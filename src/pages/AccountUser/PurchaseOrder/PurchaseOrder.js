import { useState, useEffect } from 'react'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { DOMAIN } from '../../../util/config';

const PurchaseOrder = () => {
    const token = localStorage.getItem('token')
    const { user_id } = jwtDecode(token);
    const [orderList, setOrderList] = useState([])
    const fetchData = async () => {
        try {
            const response = await axios.get(`${DOMAIN}/api/order-items/get-purchase-order-by-userid/${user_id}`);
            setOrderList(response.data); // Gán dữ liệu vào arrMain
        } catch (error) {
            console.error('Error fetching products:', error);
            setOrderList([]);
        }
    };
    const deletePurchaseOrder = async (data) => {
        try {
            const response = await axios.put(`${DOMAIN}/api/order-items/delete-purchase-order-status-by-orderitemid`,data);
            console.log(response.data);
            fetchData()
        } catch (error) {
            console.error('Error fetching products:', error);
        }

    }
    useEffect(() => {
        fetchData()
        console.log('xxxx', orderList)
    }, [])
    return <>
        <div className="container pt-5">
            <div>
                {orderList?.map((item, index) => (
                    <div key={index} className="mb-4 card">
                        <h5>Đơn hàng #{item.order_item.order_item_id}</h5>

                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Tên sản phẩm</th>
                                    <th>Giá</th>
                                    <th>Số lượng</th>
                                    <th>Tổng tiền</th>
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
                        {/* Thông tin thanh toán */}
                        <div className='text-start'>
                            <strong>Tổng thanh toán:</strong> {Number(item.payment.total_amount).toLocaleString()}đ<br />
                            <strong>Phương thức thanh toán:</strong> {item.payment.payment_method}<br />
                            <strong>Trạng thái thanh toán:</strong> {item.payment.payment_status}
                        </div>
                        <div className='text-end p-2'>
                            <button onClick={() => {

                               const data = {
                                   'order_item_id': item.order_item.order_item_id
                                }
                                console.log('data',data)
                                deletePurchaseOrder(data)
                            }}>Hủy Đơn</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>


    </>

};


export default PurchaseOrder