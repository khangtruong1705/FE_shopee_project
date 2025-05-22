import styles from './Home.module.css' // Import CSS Module
import { NavLink } from "react-router-dom";
import { useState, useEffect } from 'react'
import axios from 'axios';
import { DOMAIN } from '../../util/config';
import _ from "lodash";

import InfiniteScroll from 'react-infinite-scroll-component';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';



const Home = () => {
    const [arrTopViewsProduct, setArrTopViewsProduct] = useState([]);
    const [arrNewToOldProduct, setArrarNewToOldProduct] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const fetchData = async (pageNum) => {
        try {
            if (pageNum === 1) {
                const response1 = await axios.get(`${DOMAIN}/api/products/get-top-views-products`);
                setArrTopViewsProduct(response1.data);
            }

            const response2 = await axios.get(`${DOMAIN}/api/products/get-all-products?page=${pageNum}&limit=12`);
            console.log(response2.data);
            let newProducts = _.orderBy(response2.data.results, ["created_at"], ["desc"]);
            setArrarNewToOldProduct((prev) => [...prev, ...newProducts]);
            if (newProducts.length === 0 ||
                newProducts.length < 12 ||
                pageNum * 12 >= newProducts.total) {
                setHasMore(false);
            }

            console.log('sdsds', newProducts)
        } catch (error) {
            console.error('Error fetching products:', error);
            setArrTopViewsProduct([])
            setHasMore(false);
        }
    };
    useEffect(() => {
        fetchData(page)
    }, [page])
    const categories = [
        'thoitrangnam', 'dienthoai', 'thietbidientu', 'maytinhvalaptop', 'mayanh', 'dongho',
        'giaydepnam', 'thietbidiengiadung', 'thethaodulich', 'otoxemayxedap', 'thoitrangnu',
        'mevabe', 'nhacuavadoisong', 'sacdep', 'suckhoe', 'tuivinu', 'giaydepnu',
        'phukientrangsucnu', 'bachhoaonline', 'nhasachonline'];

    const items = [
        { className: 'voucherextra', label: 'Voucher Giảm Đến 1 Triệu' },
        { className: 'freeshipextra', label: 'Miễn Phí Ship - Có Shopee' },
        { className: 'huntsale', label: 'Khung Giờ Săn Sale' },
        { className: 'discountcode', label: 'Mã Giảm Giá' },
        { className: 'verycheap', label: 'Shopee Siêu rẻ' },
        { className: 'shopeestyle', label: 'Shopee Style  Voucher 30%' },
        { className: 'internationalitem', label: 'Hàng Quốc Tế' },
        { className: 'shopeeservice', label: 'Nạp thẻ,Dịch Vụ & Vé Phim' }
    ];
    return <>
        <div className={`${styles.container} container `}>
            <div className="voucher">
                <div className={styles.dgrid}>
                    <div id="carouselExampleInterval" className={`${styles.item1} carousel slide  w-75`} data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active h-100" data-bs-interval={10000}>
                                <img src={process.env.PUBLIC_URL + '/asset/images/carousel1.jpg'} className="d-block w-100 h-100" alt="..." />
                            </div>
                            <div className="carousel-item h-100 " data-bs-interval={2000}>
                                <img src={process.env.PUBLIC_URL + '/asset/images/carousel2.jpg'} className="d-block w-100 h-100" alt="..." />
                            </div>
                            <div className="carousel-item h-100">
                                <img src={process.env.PUBLIC_URL + '/asset/images/carousel3.jpg'} className="d-block w-100 h-100" alt="..." />
                            </div>
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
                            <img src={process.env.PUBLIC_URL + '/asset/images/voucher2.jpg'} style={{width:'100%'}} />
                        </div>
                        <div className={styles.item3}>
                            <img src={process.env.PUBLIC_URL + '/asset/images/voucher3.jpg'} style={{width:'100%'}}/>
                        </div>
                    </div>
                </div>
                <div className={`${styles.itemparent} row`}>
                    {items.map((item, index) => (
                        <div key={index} className={`${styles.itemchild}`}>
                            <div className={styles[item.className]}></div>
                            <p>{item.label}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.category}>
                <div>DANH MỤC</div>
                <div className={styles.gridcategory}>
                    {categories.map((category) => (
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
            <div className={styles.topviews} >
                <div>TOP TÌM KIẾM</div>
                <div>
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={10}
                        slidesPerView={6}
                        navigation
                    >
                        {arrTopViewsProduct.map((product, index) => (
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
                        Gợi ý Hôm nay
                    </div>
                    <div className='card-footer' style={{ backgroundColor: '#f85902', borderRadius: '0' }}></div>
                </div>
                <InfiniteScroll
                    dataLength={arrNewToOldProduct.length}
                    next={() => {
                        setPage((prev) => prev + 1);
                    }}
                    hasMore={hasMore}
                    loader={<div className="text-center my-3">Đang tải thêm...</div>}
                    endMessage={<div className="text-center my-3">Đã tải hết sản phẩm!</div>}
                >
                    <div className='row' style={{ boxSizing: 'border-box' }} >
                        {arrNewToOldProduct?.map((product, index) => {
                            return <div className='col-lg-3 col-md-4 col-sm-6' key={index}>
                                <NavLink to={`/productdetail/${product.product_id}`} className='card m-1' style={{borderRadius: '0', textDecoration: 'none' }}>
                                    <div className='card-header' style={{ height: '21vw', backgroundColor: '#ffffff'}}>
                                        <LazyLoadImage
                                            className='w-100 h-75'
                                            alt='Product image'
                                            src={`${process.env.PUBLIC_URL}${product.image}`}
                                            style={{border:'1px solid #f85902',borderRadius:'20px'}}
                                        />
                                    </div>
                                    <div className='card-body' style={{fontSize:'1vw'}}>
                                        <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.description}</div>
                                        <div className='d-flex justify-content-between' >
                                            <div>Đã bán {product.sold}</div>
                                            <div>
                                                <i className='fa-solid fa-star text-danger' />
                                                {product.rating}
                                            </div>
                                        </div>
                                        <div className='text-center' style={{ color: '#f85902' }} >{product.price.toLocaleString('vi-VN')}VNĐ</div>
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