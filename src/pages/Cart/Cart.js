import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Cart.module.css' // Import CSS Module
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react'
import { DOMAIN } from '../../util/config';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';

const Cart = () => {
    const { t } = useTranslation();
    const token = localStorage.getItem('token')
    const { user_id } = jwtDecode(token);
    const [orderList, setOrderList] = useState([]);
    const location = useLocation();
    const scrollToProductId = location.state?.scrollToProductId;
    const navigate = useNavigate();
    const [isSelectAll, setIsSelectAll] = useState(false);
    const increaseQuantity = (index) => {
        const updatedOrders = orderList.map((order, i) =>
            i === index ? { ...order, quantity: order.quantity + 1 } : order
        );
        setOrderList(updatedOrders);
    };
    const decreaseQuantity = (index) => {
        const updatedOrders = orderList.map((order, i) =>
            i === index ? { ...order, quantity: Math.max(1, order.quantity - 1) } : order
        );
        setOrderList(updatedOrders);
    };


    const createOrderItems = async (data) => {
        try {
            const response = await axios.post(`${DOMAIN}/api/order-items/create-order-items-by-userid`, data);
            console.log(response.data);
            return response.data
        } catch (error) {
            console.error('Error fetching products:', error);
        }

    }
    const fetchData = async () => {
        try {
            const response = await axios.get(`${DOMAIN}/api/carts/get-cart-by-userid/${user_id}`);
            console.log(response.data);
            const ordersWithQuantity = response.data.map(order => ({
                ...order,
                quantity: 1 // Khởi tạo quantity mặc định là 1
            }));

            setOrderList(ordersWithQuantity); // Gán dữ liệu vào arrMain
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const deleteOrder = async (order_id) => {
        try {
            const response = await axios.delete(`${DOMAIN}/api/carts/delete-order-product-by-orderid/${order_id}`);
            console.log(response.data);
            fetchData()
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };


    const handleCheckboxChange = (index) => {
        const updatedOrderList = [...orderList];
        updatedOrderList[index].isChecked = !updatedOrderList[index].isChecked;
        setOrderList(updatedOrderList);
    };

    const handleSelectAll = () => {
        const newValue = !isSelectAll;
        setIsSelectAll(newValue);

        const updatedOrderList = orderList.map(order => ({
            ...order,
            isChecked: newValue,
        }));
        setOrderList(updatedOrderList);
    };
    const handleBuy = () => {
        const orderDetails = orderList
            .filter(order => order.isChecked) // Chỉ lấy các đơn hàng được check
            .map(order => ({
                product_id: order.product_id,
                product_name: order.product_name,
                price: order.price,
                quantity: order.quantity,
                total_price: order.quantity * order.price
            }));

        return orderDetails;
    };


    useEffect(() => {
        fetchData()
        console.log('sdsadasd', scrollToProductId)
        if (scrollToProductId) {
            const el = document.getElementById({ scrollToProductId });
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [scrollToProductId])

    return <>
        <div className='w-75 mx-auto pt-5 '>
            <div className='card' style={{ backgroundColor: '#ffffff' }}>
                <div className='card-body d-flex '>
                    <div className="form-check mb-3 d-flex justify-content-end">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="selectAllCheckbox"
                            checked={isSelectAll}
                            onChange={handleSelectAll}
                        />
                    </div>
                    <div className={styles.item}><strong>{t('product')}</strong></div>
                    <div className={styles.item}><strong>{t('unitprice')}</strong></div>
                    <div className={styles.item}><strong>{t('quantity')}</strong></div>
                    <div className={styles.item}><strong>{t('totalprice')}</strong></div>
                    <div className={styles.item}><strong>{t('actions')}</strong></div>
                </div>
            </div>
            <div>
                {orderList?.map((order, index) => {
                    const totalPrice = order.quantity * order.price
                    return <div
                        id={order.product_id}
                        className={`${styles.coupon} card mt-5`}
                        key={index}
                        style={{ border: 'none', borderRadius: '0' }}>
                        <div className={styles.coupontopbefore}>

                        </div>
                        <div className='card-header' style={{ borderRadius: '0' }}>
                            {order.shop_name}
                        </div>
                        <div className='card-body d-flex justify-content-between'>
                            <div className={styles.item}>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox" defaultValue
                                        id="flexCheckDefault"
                                        checked={order.isChecked}
                                        onChange={() => handleCheckboxChange(index)}
                                    />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        Default checkbox
                                    </label>
                                </div>
                                {order.product_name}
                            </div>
                            <div className={styles.item}>₫{order.price.toLocaleString('vi-VN')}</div>
                            <div className={styles.item}>
                                <Button onClick={() => decreaseQuantity(index)}>-</Button>
                                {order.quantity}
                                <Button onClick={() => increaseQuantity(index)}>+</Button>
                            </div>
                            <div className={styles.item}>₫{(totalPrice).toLocaleString('vi-VN')}</div>
                            <div className={styles.item} >
                                <Popconfirm
                                    title="Delete the task"
                                    description="Are you sure to delete this task?"
                                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                    onConfirm={() => {
                                        deleteOrder(order.order_id)
                                    }}
                                >
                                    <Button danger>{t('delete')}</Button>
                                </Popconfirm>
                            </div>
                        </div>
                        <div className='card-footer'>
                            Giảm ₫300.000 phí vận chuyển đơn tối thiểu ₫0; Giảm ₫500.000 phí vận chuyển đơn tối thiểu ₫500.000
                        </div>
                        <div className={styles.coupontopafter}>

                        </div>
                    </div>
                })}
            </div>
            <div className=' my-5 text-end'>
                <div>
                    <Button shape="round" dashed onClick={async () => {
                        const ordertList = handleBuy()
                        const data = {
                            'ordertList': ordertList,
                            'user_id': user_id,
                        }
                        if (ordertList.length > 0) {
                            let res = await createOrderItems(data)
                            console.log('ressss', res)
                            navigate(`/payments?order_item_id=${res.order_item_id}`)
                        } else {
                            alert('Bạn vẫn chưa chọn sản phẩm nào để mua.')
                        }
                    }}>{t('purchase')}</Button>
                </div>
            </div>
        </div>


    </>

};


export default Cart