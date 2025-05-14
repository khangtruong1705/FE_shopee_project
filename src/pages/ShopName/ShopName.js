import styles from './ShopName.module.css'
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import {DOMAIN} from '../../util/config'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const ShopName = () => {
    const location = useLocation();
    const fromProductId = location.state?.fromProductId;
    const [isFollowing, setIsFollowing] = useState(false);

    const navigate = useNavigate()
    const token = localStorage.getItem('token');
    const { shopnameid } = useParams();
    const [shopInfo, setShopInfo] = useState([]);
    const [productShopAmount, setProductShopAmount] = useState(0);
    const [productSuggest, setProductSuggest] = useState([]);
    const [userFollowAmount, setUserFollowAmount] = useState(0);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${DOMAIN}/api/shop-name/get-shop-name-by-shopnameid/${shopnameid}`);
            setShopInfo(response.data);


            const response2 = await axios.get(`${DOMAIN}/api/shop-name/get-product-shop-amount-by-shopnameid/${shopnameid}`);
            setProductShopAmount(response2.data);


            const response3 = await axios.get(`${DOMAIN}/api/shop-name/get-user-follow-amount-by-shopnameid/${shopnameid}`);
            setUserFollowAmount(response3.data);


            const response4 = await axios.get(`${DOMAIN}/api/products/get-products-same-category-by-productid/${fromProductId}`);
            setProductSuggest(response4.data);

        } catch (error) {
            console.error('Error fetching products:', error);
            setShopInfo([])
        }
    };

    const checkFollow = async (user_id, shop_name_id) => {
        try {
            const res = await axios.get(`${DOMAIN}/api/user-follow-shop/check-follow`, {
                params: { user_id, shop_name_id }
            });
            setIsFollowing(res.data.is_following);
        } catch (error) {
            console.error('Error', error);
        }
    };
    const followShop = async (data) => {
        try {
            const response = await axios.post(`${DOMAIN}/api/user-follow-shop/toggle-follow`, data);
            setIsFollowing(response.data.is_following)
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchData();
        if (token !== null) {
            const { user_id } = jwtDecode(token)
            checkFollow(user_id, shopnameid);
        }
    }, [])

    const renderFollowShop = () => {
        if (isFollowing) {

            return <>
                Đã Theo Dõi
            </>
        } else {
            return <>
                Theo Dõi
            </>
        }
    }
    const couponData = [
        { discount: '₫5k', minOrder: '₫150k', expiry: '31.05.2025', quantity: 'x5' },
        { discount: '₫10k', minOrder: '₫200k', expiry: '30.06.2025', quantity: 'x3' },
        { discount: '₫15k', minOrder: '₫250k', expiry: '15.07.2025', quantity: 'x2' },
        { discount: '₫20k', minOrder: '₫300k', expiry: '01.08.2025', quantity: 'x1' },
        { discount: '₫25k', minOrder: '₫350k', expiry: '12.08.2025', quantity: 'x4' },
        { discount: '₫30k', minOrder: '₫400k', expiry: '22.08.2025', quantity: 'x2' },
        { discount: '₫35k', minOrder: '₫450k', expiry: '01.09.2025', quantity: 'x3' },
        { discount: '₫40k', minOrder: '₫500k', expiry: '10.09.2025', quantity: 'x5' },
        { discount: '₫45k', minOrder: '₫550k', expiry: '20.09.2025', quantity: 'x1' },
        { discount: '₫50k', minOrder: '₫600k', expiry: '30.09.2025', quantity: 'x6' }
    ];
    return <>
        <div className="container">
            <div className="card shop-name p-3" style={{ borderRadius: '0' }}>
                <div className="store-container d-flex justify-content-around">
                    <div className="store-left">
                        <p className='text-center'><strong>{shopInfo.name}</strong></p>
                        <div className="card" style={{ width: '22rem', height: '9rem', borderRadius: 'none' }} >
                            <img src={`${process.env.PUBLIC_URL}${shopInfo.image}`} style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }} ></img>
                        </div>
                        <div className="d-flex justify-content-around mt-3">
                            <div className="p-1" style={{ border: '1px solid', cursor: 'pointer' }} onClick={async () => {
                                if (token !== null) {
                                    const { user_id } = jwtDecode(token)
                                    const data = {
                                        'user_id': user_id,
                                        'shop_name_id': parseInt(shopnameid, 10)
                                    }
                                    await followShop(data)
                                    await checkFollow(user_id, shopnameid)
                                } else {
                                    alert('Bạn cần đăng nhập')
                                    navigate('/login')
                                }
                            }}>
                                <i className="fa-solid fa-plus" />
                                {renderFollowShop()}
                            </div>
                            <div className="p-1" style={{ border: '1px solid' }}>
                                <i className="fa-solid fa-comment" />
                                Chat
                            </div>
                        </div>
                    </div>
                    <div className='d-flex flex-column justify-content-around '>
                        <div><i className="icon">🏪</i> Sản Phẩm: <span className="highlight">{productShopAmount}</span></div>
                        <div><i className="icon">🔗</i> Đang Theo: <span className="highlight">0</span></div>
                        <div><i className="icon">💬</i> Tỉ Lệ Phản Hồi Chat: <span className="highlight">93%</span> (Trong Vài Giờ)</div>
                    </div>

                    <div className="d-flex flex-column justify-content-around" style={{ backgroundImage: 'url' }}>
                        <div><i className="icon">👥</i> Người Theo Dõi: <span className="highlight">{userFollowAmount}</span></div>
                        <div><i className="icon">⭐</i> Đánh Giá: <span className="highlight">{shopInfo.rating}</span></div>
                        <div><i className="icon">👤</i> Tham Gia: <span className="highlight">{shopInfo.created_at}</span></div>
                    </div>

                </div>
            </div>
            <div className={styles.topviews} >
                <div>
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={10}
                        slidesPerView={3}
                        navigation

                    >
                        {couponData.map((coupon, index) => (
                            <SwiperSlide key={index}>
                                <div className={`${styles.coupon} d-flex coupon justify-content-around`}  >
                                    <div className={styles.coupontopbefore}></div>
                                    <div className="coupon-left">
                                        <div style={{ color: '#f0543e' }}>Giảm {coupon.discount}</div>
                                        <div style={{ color: '#f0543e' }}>Đơn Tối Thiểu {coupon.minOrder}</div>
                                        <div style={{ fontSize: '0.7rem' }}>HSD: {coupon.expiry}</div>
                                    </div>
                                    <div className="coupon-right">
                                        <div className="coupon-tag" style={{ color: '#f0543e' }}>{coupon.quantity}</div>
                                        <button style={{ color: 'white', backgroundColor: '#ee4d2d', border: 'none', borderRadius: '4px' }}>Lưu</button>
                                    </div>
                                    <div className={styles.coupontopafter}></div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
            <div className='mt-2' style={{ borderRadius: '0' }}>
                <div className='card' style={{ borderRadius: '0' }}>
                    <div className='card-body text-center' style={{ color: '#f85902' }} >
                        GỢI Ý CHO BẠN
                    </div>
                    <div className='card-footer' style={{ backgroundColor: '#f85902', borderRadius: '0' }}></div>
                </div>
                <div className='row'>
                    {productSuggest?.map((product, index) => {
                        return <div className='col-3' key={index} >
                            <NavLink to={`/productdetail/${product.product_id}`} style={{ textDecoration: 'none' }}
                                onClick={() => {

                                }}
                            >
                                <div className='card my-3'>
                                    <div className='card-header' style={{ height: '280px' }}>
                                        <img className='w-100 h-100' src={`${process.env.PUBLIC_URL} ${product.image}`} />
                                    </div>
                                    <div className='card-body'>
                                        <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.description}</div>
                                        <div className='d-flex justify-content-between'>
                                            <div>Đã bán {product.sold}</div>
                                            <div>
                                                <i className='fa-solid fa-star text-danger' />
                                                {product.rating}
                                            </div>
                                        </div>
                                        <div className='text-center' style={{ color: '#f85902' }} >{product.price.toLocaleString('vi-VN')}VNĐ</div>
                                    </div>
                                </div>
                            </NavLink>

                        </div>
                    })}
                </div>
            </div>
        </div>
    </>
}




export default ShopName