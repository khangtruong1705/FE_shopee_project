import { NavLink, useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import styles from './Payment.module.css' // Import CSS Module
import axios from 'axios';
import { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode';
import { DOMAIN } from '../../util/config';
import { useFormik } from 'formik'
import * as yup from 'yup';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';


const Payment = () => {

    const frm = useFormik({
        initialValues: {
            name: '',
            phone: '',
            province: '',
            address: ''
        }, validationSchema: yup.object().shape({
            name: yup.string().required('Name can not be blank!'),
            phone: yup.string().required('Phone can not be blank!').matches(/^[0-9]+$/, 'Phone must be digits only!'),
            province: yup.string().required('Please choose city!').notOneOf([''], 'Please choose city!!'),
            address: yup.string().required('address can not be blank!')
        }),
        onSubmit: async (values) => {
            try {
                setshippingInfo(values)
                setBindingShippingInfo(true)
                alert('Thông tin vận chuyển đã được xác nhận')
            } catch (error) {
                console.error('Error:', error.response.data.detail);
            }
        }
    });
    const location = useLocation();
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const orderItemId = searchParams.get('order_item_id');
    const navigate = useNavigate()
    const [arrMain, setArrMain] = useState();
    const [shippingInfo, setshippingInfo] = useState({});
    const [shippingPrice, setshippingPrice] = useState(0);
    const [voucherPrice, setVoucherPrice] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState(0);
    const [shippingMethod, setShippingMethod] = useState(0);
    const [bindingShippingInfo, setBindingShippingInfo] = useState(false)
    const token = localStorage.getItem('token')
    const { user_id } = jwtDecode(token);
    const fetchData = async () => {
        try {
            const response = await axios.get(`${DOMAIN}/api/order-items/get-order-items-by-userid/${user_id}`);
            setArrMain(response.data.items_list);
        } catch (error) {
            console.error('Error fetching products:', error);
            setArrMain([])
        }
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchData();
        }, 500); 
        return () => clearTimeout(timer);
    }, [])
    useEffect(() => {
       
        window.history.pushState(null, null, window.location.href);
        const handlePopstate = (event) => {
            event.preventDefault();
            const confirmLeave = window.confirm(
                'The Current Order Will Be Deleted.'
            );
            if (confirmLeave) {
                const status = {
                    'user_id': user_id,
                    'status_update': 'cancel'
                }
                updateOrderItemsStatus(status)
                const timer = setTimeout(() => {
                    navigate('/');
                }, 500);
                return () => clearTimeout(timer);
            } else {
                window.history.pushState(null, null, window.location.href);
            }
        };

        window.addEventListener('popstate', handlePopstate);

        return () => {
            window.removeEventListener('popstate', handlePopstate);
        };
    }, [navigate]);


    const merchandiseSubtotal = (arrMain || []).reduce((total_price, item) => {
        return total_price + (item.total_price || 0);
    }, 0);
    const totalPayment = () => {
        const totalPayment = merchandiseSubtotal + shippingPrice - voucherPrice
        return totalPayment
    };
    const createPaymentAndShipping = async (data) => {
        try {
            const response = await axios.post(`${DOMAIN}/api/payments/create-payment-and-shipping`, data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }

    }
    const updateOrderItemsStatus = async (status) => {
        try {
            const response = await axios.put(`${DOMAIN}/api/order-items/update_order_items_status-by-userid`, status);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }

    }
    const getShippingPrice = (value) => {
        switch (value) {
            case "Tiêu chuẩn":
                return 100000;
            case "Nhanh":
                return 250000;
            case "Hỏa tốc":
                return 500000;
            default:
                return 0;
        }
    };
    const getVoucherPrice = (value) => {
        switch (value) {
            case "1":
                return 50000;
            case "2":
                return 100000;
            case "3":
                return 200000;
            case "4":
                return 300000;
            case "5":
                return 500000;
            default:
                return 0;
        }
    };

    const handleShippingChange = (event) => {
        if (event !== undefined) {
            const selectedValue = event.target.value;
            const price = getShippingPrice(selectedValue);
            setshippingPrice(price);
            setShippingMethod(selectedValue)
        } return 0

    };
    const handlePaymentMethodChange = (event) => {
        if (event !== undefined) {
            const selectedValue = event.target.value;
            setPaymentMethod(selectedValue)
            return selectedValue
        } return 0

    };

    const handleVoucherChange = (event) => {
        const selectedValue = event.target.value;
        const price = getVoucherPrice(selectedValue);
        setVoucherPrice(price);
    };

    const bindingShipping = () => {
        if (bindingShippingInfo) {

            return <>
                <div><strong>{t('name')}</strong>:{shippingInfo.name}
                    <i className="fs-5 mx-2 text-success fa-solid fa-circle-check"></i>
                </div>
                <div><strong>{t('phonenumber')}</strong>:{shippingInfo.phone}
                    <i className="fs-5 mx-2 text-success fa-solid fa-circle-check"></i>
                </div>
                <div><strong>{t('deliveryarea')}</strong>:{shippingInfo.province}
                    <i className="fs-5 mx-2 text-success fa-solid fa-circle-check"></i>
                </div>
                <div><strong>{t('shippinginformation')}</strong>:{shippingInfo.address}
                    <i className="fs-5 mx-2 text-success fa-solid fa-circle-check"></i>
                </div>

            </>
        } return <>

        </>

    };


    const provinces = [
        { id: "Hà Nội", name: "Hà Nội" }, { id: "Hồ Chí Minh", name: "Hồ Chí Minh" }, { id: "Đà Nẵng", name: "Đà Nẵng" },
        { id: "Bình Dương", name: "Bình Dương" }, { id: "Đồng Nai", name: "Đồng Nai" }, { id: "Khánh Hòa", name: "Khánh Hòa" },
        { id: "Hải Phòng", name: "Hải Phòng" }, { id: "Long An", name: "Long An" }, { id: "Quảng Nam", name: "Quảng Nam" },
        { id: "Bà Rịa - Vũng Tàu", name: "Bà Rịa - Vũng Tàu" }, { id: "Đắk Lắk", name: "Đắk Lắk" }, { id: "Cần Thơ", name: "Cần Thơ" },
        { id: "Bình Thuận", name: "Bình Thuận" }, { id: "Lâm Đồng", name: "Lâm Đồng" }, { id: "Thừa Thiên Huế", name: "Thừa Thiên Huế" },
        { id: "Kiên Giang", name: "Kiên Giang" }, { id: "Bắc Ninh", name: "Bắc Ninh" }, { id: "Quảng Ninh", name: "Quảng Ninh" },
        { id: "Thanh Hóa", name: "Thanh Hóa" }, { id: "Nghệ An", name: "Nghệ An" }, { id: "Hải Dương", name: "Hải Dương" },
        { id: "Gia Lai", name: "Gia Lai" }, { id: "Bình Phước", name: "Bình Phước" }, { id: "Hưng Yên", name: "Hưng Yên" },
        { id: "Bình Định", name: "Bình Định" }, { id: "Tiền Giang", name: "Tiền Giang" }, { id: "Thái Bình", name: "Thái Bình" },
        { id: "Bắc Giang", name: "Bắc Giang" }, { id: "Hòa Bình", name: "Hòa Bình" }, { id: "An Giang", name: "An Giang" },
        { id: "Vĩnh Phúc", name: "Vĩnh Phúc" }, { id: "Tây Ninh", name: "Tây Ninh" }, { id: "Thái Nguyên", name: "Thái Nguyên" },
        { id: "Lào Cai", name: "Lào Cai" }, { id: "Nam Định", name: "Nam Định" }, { id: "Quảng Ngãi", name: "Quảng Ngãi" },
        { id: "Bến Tre", name: "Bến Tre" }, { id: "Đắk Nông", name: "Đắk Nông" }, { id: "Cà Mau", name: "Cà Mau" },
        { id: "Vĩnh Long", name: "Vĩnh Long" }, { id: "Ninh Bình", name: "Ninh Bình" }, { id: "Phú Thọ", name: "Phú Thọ" },
        { id: "Ninh Thuận", name: "Ninh Thuận" }, { id: "Phú Yên", name: "Phú Yên" }, { id: "Hà Nam", name: "Hà Nam" },
        { id: "Hà Tĩnh", name: "Hà Tĩnh" }, { id: "Đồng Tháp", name: "Đồng Tháp" }, { id: "Sóc Trăng", name: "Sóc Trăng" },
        { id: "Kon Tum", name: "Kon Tum" }, { id: "Quảng Bình", name: "Quảng Bình" }, { id: "Quảng Trị", name: "Quảng Trị" },
        { id: "Trà Vinh", name: "Trà Vinh" }, { id: "Hậu Giang", name: "Hậu Giang" }, { id: "Sơn La", name: "Sơn La" },
        { id: "Bạc Liêu", name: "Bạc Liêu" }, { id: "Yên Bái", name: "Yên Bái" }, { id: "Tuyên Quang", name: "Tuyên Quang" },
        { id: "Điện Biên", name: "Điện Biên" }, { id: "Lai Châu", name: "Lai Châu" }, { id: "Lạng Sơn", name: "Lạng Sơn" },
        { id: "Hà Giang", name: "Hà Giang" }, { id: "Bắc Kạn", name: "Bắc Kạn" }, { id: "Cao Bằng", name: "Cao Bằng" }
    ];

    return <>
        <div className='w-75 mx-auto pt-5 '>

            <div className='card' style={{ backgroundColor: '#ffffff' }}>

                <form onSubmit={frm.handleSubmit} className='card-body d-flex justify-content-between'>
                    <div className='w-25'>
                        <p>{t('recipientinformation')}</p>
                        <input name='name' onChange={frm.handleChange} onBlur={frm.handleBlur} placeholder={t('name')}></input>
                        {frm.errors.name && <p className='text-danger'>{frm.errors.name}</p>}
                        <input name='phone' onChange={frm.handleChange} onBlur={frm.handleBlur} className='mt-2' placeholder={t('phonenumber')}></input>
                        {frm.errors.phone && <p className='text-danger'>{frm.errors.phone}</p>}
                    </div>
                    <div className=''>
                        <p>{t('deliveryarea')}</p>
                        <select value={frm.values.province} name='province' onChange={frm.handleChange} className="form-select mb-2" aria-label="Default select example">
                            <option value="">{t('provincecity')}</option>
                            {provinces.map((province) => (
                                <option key={province.id} value={province.id}>
                                    {province.name}
                                </option>
                            ))}
                        </select>
                        {frm.errors.province && <p className='text-danger'>{frm.errors.province}</p>}

                    </div>
                    <div className='w-50 align-items-center'>
                        <p style={{ alignItems: 'center' }}>{t('shippinginformation')}</p>
                        <div className='d-flex justify-content-between'>
                            <input name='address' onChange={frm.handleChange} onBlur={frm.handleBlur} className='mt-2' placeholder={t('addressdetail')}></input>
                            <button type='submit' style={{ border: '1px solid #f6432d', borderRadius: '20px', background: 'white' }}>{t('confirm')}</button>
                        </div>
                        {frm.errors.address && <p className='text-danger'>{frm.errors.address}</p>}
                    </div>
                </form>
                <hr></hr>
                <div className='m-4 w-50 mx-auto card text-center bg-secondary-subtle'>

                    {bindingShipping()}
                </div>
            </div>
            {arrMain?.map((item, index) => {
                return <>

                    <div className='card mt-5' key={index}>
                        <div className='card-header d-flex justify-content-between'>
                            <div className={styles.item}>{t('product')}</div>
                            <div className={styles.item}>{t('unitprice')}</div>
                            <div className={styles.item}>{t('quantity')}</div>
                            <div className={styles.item}>{t('totalprice')}</div>
                        </div>
                        <div className='card-body d-flex justify-content-between'>
                            <div className={styles.item}>{item.product_name}</div>
                            <div className={styles.item}>{item.price.toLocaleString('vi-VN')}</div>
                            <div className={styles.item}>{item.quantity}</div>
                            <div className={styles.item}>{item.total_price.toLocaleString('vi-VN')}</div>
                        </div>
                        <div className='card-footer'>
                            Giảm ₫300.000 phí vận chuyển đơn tối thiểu ₫0; Giảm ₫500.000 phí vận chuyển đơn tối thiểu ₫500.000
                        </div>
                    </div>
                </>
            })}


            <div className='card mt-5'>
                <div className='card-header text-center'>
                    <strong>{t('serviceoptions')}</strong>
                </div>
                <div className='card-body'>
                    <div className='d-flex justify-content-between my-2'>
                        <div>Shopee Voucher :</div>
                        <div>
                            <select style={{ width: '15vw' }} className="text-center form-select" aria-label="Default select example" onChange={handleVoucherChange}>
                                <option selected>{t('selectcode')}</option>
                                <option value={1}>Voucher {t('discount')} ₫50.000</option>
                                <option value={2}>Voucher {t('discount')} ₫100.000</option>
                                <option value={3}>Voucher {t('discount')} ₫200.000</option>
                                <option value={4}>Voucher {t('discount')} ₫300.000</option>
                                <option value={5}>Voucher {t('discount')} ₫500.000</option>
                            </select>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between my-2'>
                        <div>{t('shippingpackages')} :</div>
                        <div >
                            <select style={{ width: '15vw' }} className="text-center form-select" aria-label="Default select example" onChange={handleShippingChange}>
                                <option selected>{t('shippingpackages')}</option>
                                <option value="Tiêu chuẩn">{t('standard')}</option>
                                <option value="Nhanh">{t('express')}</option>
                                <option value="Hỏa tốc">{t('rush')}</option>
                            </select>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between my-2'>
                        <div>{t('paymentmethods')} :</div>
                        <div>
                            <select style={{ width: '15vw' }} className="text-center form-select" aria-label="Default select example" onChange={handlePaymentMethodChange}>
                                <option selected>{t('paymentmethods')}</option>
                                <option value='Thanh toán khi nhận hàng'>{t('cashondelivery')}</option>
                                <option value='Google Pay'>Google Pay</option>
                                <option value='Thẻ Tín Dụng'>{t('creditcard')}</option>
                                <option value='Thẻ Ngân Hàng'>{t('debitcard')}</option>
                                <option value='Paypal'>Paypal</option>
                            </select>
                        </div>
                    </div>

                </div>
            </div>
            <div className='card mt-5'>
                <div className='card-header text-center'>
                    <strong>{t('invoice')}</strong>
                </div>
                <div className='card-body d-flex justify-content-between'>
                    <div ></div>
                    <div>
                        <div>{t('subtotal')}</div>
                        <div>{t('shippingfee')}</div>
                        <div>{t('totaldiscount')}</div>
                        <div>{t('totalprice')}</div>
                    </div>
                    <div className='d-flex flex-column align-items-end' >
                        <div>{merchandiseSubtotal.toLocaleString('vi-VN')}₫</div>
                        <div>{shippingPrice.toLocaleString('vi-VN')}₫</div>
                        <div>-{voucherPrice.toLocaleString('vi-VN')}₫</div>
                        <div></div>
                        <div>{totalPayment().toLocaleString('vi-VN')}₫</div>
                    </div>
                </div>
                <div className='card-footer d-flex justify-content-between'>
                    <div>{t('agreeterms')}</div>
                    <div></div>
                    <div>
                        <NavLink to='/cart'>
                            <Button shape="round" danger className='mx-2' onClick={() => {
                                const status = {
                                    'user_id': user_id,
                                    'status_update': 'cancel'
                                }
                                updateOrderItemsStatus(status)
                            }}>{t('cancelorder')}</Button>
                        </NavLink>
                        <Button shape="round" dashed onClick={() => {

                            const paymentData = {
                                'total_amount': totalPayment(),
                                'payment_method': paymentMethod,
                                'payment_status': 'pending',
                            }
                            const data = {
                                'paymentdata': paymentData,
                                'shippingdata': shippingInfo,
                                'orderItemId': orderItemId
                            }
                            if (Object.keys(shippingInfo).length === 0) {
                                alert(t('confirminfomation'))
                                return
                            } if (paymentMethod === 0) {
                                alert(t('selectpaymentmethod'))
                                return
                            } if (shippingMethod === 0) {
                                alert(t('selectshippingpackage'))
                                return
                            }
                            else {
                                createPaymentAndShipping(data)
                                alert(t('invoicesuccess'))

                            }
                            const status = {
                                'user_id': user_id,
                                'status_update': 'success'
                            }
                            updateOrderItemsStatus(status)
                            navigate('/')
                        }}>{t('placeorder')}</Button>
                    </div>
                </div>
            </div>
        </div>


    </>

};


export default Payment