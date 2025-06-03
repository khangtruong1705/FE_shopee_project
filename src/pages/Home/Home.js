import styles from './Home.module.css' // Import CSS Module
import { NavLink } from "react-router-dom";
import { useState, useEffect } from 'react'
import axios from 'axios';
import { DOMAIN } from '../../util/config';
import { ColorPicker } from 'antd';
import _ from "lodash";

import InfiniteScroll from 'react-infinite-scroll-component';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import { useTranslation } from 'react-i18next';


const Home = () => {
    const [bgColor, setBgColor] = useState('#ee4e2e');
    const [timeLeft, setTimeLeft] = useState(9 * 3600 + 18 * 60 + 28);
    const [arrTopViewsProduct, setArrTopViewsProduct] = useState([]);
    const [arrNewToOldProduct, setArrarNewToOldProduct] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const { t } = useTranslation();
    const categories = [
        'thoitrangnam', 'dienthoai', 'thietbidientu', 'maytinhvalaptop', 'mayanh', 'dongho',
        'giaydepnam', 'thietbidiengiadung', 'thethaodulich', 'otoxemayxedap', 'thoitrangnu',
        'mevabe', 'nhacuavadoisong', 'sacdep', 'suckhoe', 'tuivinu', 'giaydepnu',
        'phukientrangsucnu', 'bachhoaonline', 'nhasachonline'];
    const items = [
        { className: 'voucherextra', label: t('discountvoucher') },
        { className: 'freeshipextra', label: t('freeship') },
        { className: 'huntsale', label: t('flashsaletimeslot') },
        { className: 'discountcode', label: t('discountcode') },
        { className: 'verycheap', label: t('shopeesupercheap') },
        { className: 'shopeestyle', label: t('shopeestylevoucher30') },
        { className: 'internationalitem', label: t('internationalproduct') },
        { className: 'shopeeservice', label: t('topupservicesmovietickets') }
    ];
    const carouselItems = [
        { src: '/asset/images/carousel1.jpg', interval: 10000, active: true },
        { src: '/asset/images/carousel2.jpg', interval: 2000 },
        { src: '/asset/images/carousel3.jpg' },
    ];
    const fetchData = async (pageNum) => {
        try {
            if (pageNum === 1) {
                const response1 = await axios.get(`${DOMAIN}/api/products/get-top-views-products`);
                setArrTopViewsProduct(response1.data);
            }
            const response2 = await axios.get(`${DOMAIN}/api/products/get-all-products?page=${pageNum}&limit=12`);
            let newProducts = _.orderBy(response2.data.results, ["created_at"], ["desc"]);
            setArrarNewToOldProduct((prev) => [...prev, ...newProducts]);
            if (newProducts.length === 0 ||
                newProducts.length < 12 ||
                pageNum * 12 >= newProducts.total) {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setArrTopViewsProduct([])
            setHasMore(false);
        }
    };
    useEffect(() => {
        fetchData(page)
    }, [page])

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);
    const formatTime = (seconds) => {
        const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');
        return `${h} : ${m} : ${s}`;
    };
    return <>
        <div className={`${styles.container} container `}>
            <div className="voucher">
                <div className={styles.dgrid}>
                    <div id="carouselExampleInterval" className={`${styles.item1} carousel slide  w-75`} data-bs-ride="carousel">
                        <div className="carousel-inner">
                            {carouselItems.map((item, index) => (
                                <div key={index} className={`carousel-item h-100 ${item.active ? 'active' : ''}`} data-bs-interval={item.interval}>
                                    <img src={process.env.PUBLIC_URL + item.src} className="d-block w-100 h-100" alt="carousel" />
                                </div>
                            ))}
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true" />
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true" />
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                    <div>
                        <div className={styles.item2}>
                            <img src={process.env.PUBLIC_URL + '/asset/images/voucher2.jpg'} style={{ width: '100%' }} />
                        </div>
                        <div className={styles.item3}>
                            <img src={process.env.PUBLIC_URL + '/asset/images/voucher3.jpg'} style={{ width: '100%' }} />
                        </div>
                    </div>
                </div>
                <div className={`${styles.itemparent} row`}>
                    {items?.map((item, index) => (
                        <NavLink to='/accountuser/myvoucher' key={index} className={`${styles.itemchild}`}>
                            <div className={styles[item.className]}></div>
                            <p>{item.label}</p>
                        </NavLink>
                    ))}
                </div>
            </div>
            <div className={styles.category}>
                <div><strong>{t('categories')}</strong></div>
                <div className={styles.gridcategory}>
                    {categories?.map((category) => (
                        <div key={category} className={styles.gridcategoryitem}>
                            <NavLink to={`/category/${category}`}>
                                <img
                                    className="w-100 h-100"
                                    src={`${process.env.PUBLIC_URL}/asset/images/${category}.webp`}
                                    alt={category}
                                />
                            </NavLink>
                        </div>
                    ))}
                </div>
            </div>
            <div className='my-5 flash-sale' style={{ background: 'white', padding: '1.2rem 0.5rem' }}>
                <div className='d-flex justify-content-between align-items-center'>
                    <strong>FLASH SALE</strong>
                    <ColorPicker
                        defaultValue="#ee4e2e"
                        onChange={(color) => {
                            const hex = typeof color === 'string' ? color : color.toHexString?.() || '#ee4e2e';
                            setBgColor(hex);
                        }}
                    />
                </div>
                <div className='w-75 mx-auto' style={{ backgroundColor: bgColor, color: 'white', padding: '4vw', fontWeight: 'bold', fontSize: '2.4vw' }}>
                    <span>⚡ FLASH SALE CHỚP NHOÁNG </span>
                    <span style={{ float: 'right' }}>{formatTime(timeLeft)}</span>
                </div>
            </div>
            <div className={styles.topviews} >
                <div><strong>{t('topproducts')}</strong></div>
                <div>
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={10}
                        slidesPerView={6}
                        navigation
                    >
                        {arrTopViewsProduct?.map((product, index) => (
                            <SwiperSlide key={index}>
                                <NavLink to={`/productdetail/${product.product_id}`}>
                                    <img className={styles.productimage} src={`${process.env.PUBLIC_URL} ${product.image}`} />
                                </NavLink>
                                <p className={styles.productname} >{product.name}</p>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
            <div className={styles.todaysuggestion}>
                <div className='card' style={{ borderRadius: '0' }}>
                    <div className='card-body text-center' style={{ color: '#f85902' }} >
                        {t('dailydiscover')}
                    </div>
                    <div className='card-footer' style={{ backgroundColor: '#f85902', borderRadius: '0' }}></div>
                </div>
                <InfiniteScroll
                    dataLength={arrNewToOldProduct.length}
                    next={() => {
                        setPage((prev) => prev + 1);
                    }}
                    hasMore={hasMore}
                    loader={<div className="text-center my-3">{t('loadingmore')}</div>}
                    endMessage={<div className="text-center my-3">{t('allproductsloaded')}</div>}
                >
                    <div className='row' style={{ boxSizing: 'border-box' }} >
                        {arrNewToOldProduct?.map((product, index) => {
                            return <div className='col-lg-3 col-md-4 col-sm-6' key={index}>
                                <NavLink to={`/productdetail/${product.product_id}`} className={`${styles.carditem} card m-1`}>
                                    <div className='card-header' style={{ height: '21vw', backgroundColor: '#ffffff' }}>
                                        <LazyLoadImage
                                            className='w-100 h-75'
                                            alt='Product image'
                                            src={`${process.env.PUBLIC_URL}${product.image}`}
                                            style={{ border: '1px solid #f85902', borderRadius: '20px' }}
                                        />
                                    </div>
                                    <div className='card-body' style={{ fontSize: '1vw' }}>
                                        <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.description}</div>
                                        <div className='d-flex justify-content-between' >
                                            <div>{t('sold')}:{product.sold}</div>
                                            <div className='text-center' style={{ color: '#f85902' }} >{product.price.toLocaleString('vi-VN')}VNĐ</div>
                                        </div>
                                        <div>
                                            {Array.from({ length: 5 }).map((_, index) => (
                                                <i key={index} className="fa-solid fa-star" style={{ color: '#f7d22c' }} />
                                            ))}
                                            {product.rating}
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                        })}
                    </div>
                </InfiniteScroll>
            </div>
        </div >
        <hr></hr>
    </>
};



export default Home