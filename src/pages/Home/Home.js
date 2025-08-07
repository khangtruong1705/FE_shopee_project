import { useState, useEffect, useRef } from 'react'
import { NavLink,useNavigate } from "react-router-dom";
import styles from './Home.module.scss' // Import CSS Module
import { serviceItemData, bannerItemsData, carouselItemsData } from './homeRawData'
import axios from 'axios';
import { DOMAIN } from '../../util/config';
import { jwtDecode } from 'jwt-decode';
import _ from "lodash";
import InfiniteScroll from 'react-infinite-scroll-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { useTranslation } from 'react-i18next';
import ProductItem from '../../components/ProductItem/ProductItem';



const Home = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState(9 * 3600 + 18 * 60 + 28);
    const token = localStorage.getItem('token');
    const [categories, setCategories] = useState([]);
    const [arrTopViewsProduct, setArrTopViewsProduct] = useState([]);
    const [arrNewToOldProduct, setArrarNewToOldProduct] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const carouselRef = useRef(null);
    const bannerRef = useRef(null);
    const backgroundBaseRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const { t } = useTranslation();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const bannerItems = bannerItemsData;
    const carouselItems = carouselItemsData;
    const serviceItems = serviceItemData.map(item => ({
        background: item.background,
        label: t(item.label)
    }));
    const sendData = async (product, token, apiUrl) => {
        try {
            let data = {};
            if (!token) {
                data = {
                    user_id: 0,
                    product_id: product.product_id,
                    name: product.name
                };
            } else {
                const { user_id } = jwtDecode(token);
                data = {
                    user_id,
                    product_id: product.product_id,
                    name: product.name
                };
            }
            console.log('data', data)
            await axios.post(apiUrl, data);
        } catch (error) {
            console.error('Lỗi khi gửi view sản phẩm:', error);
        }
    };
    const handleClick = (index, sortFn) => {
        setSelectedIndex(index);
        const sortedItems = sortFn();
        setArrTopViewsProduct(sortedItems);
    };
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    const fetchData = async (pageNum) => {
        try {
            setLoading(true);
            const response = await axios.get(`${DOMAIN}/api/products/get-all-categories`);
            setCategories(response.data);
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
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!carouselRef.current || !bannerRef.current || !backgroundBaseRef.current) return;
            const carouselElement = carouselRef.current;
            const bannerElement = bannerRef.current;
            const backgroundBaseElement = backgroundBaseRef.current;
            const handleSlide = (event) => {
                const index = event.to;
                if (index === 0) {
                    backgroundBaseElement.style.opacity = 1;
                } else {
                    backgroundBaseElement.style.opacity = 0;
                }
            };
            const carouselInstance = new window.bootstrap.Carousel(carouselElement, {
                interval: 6000,
                ride: 'carousel',
                pause: false,
                wrap: true,
            });
            const bannerInstance = new window.bootstrap.Carousel(bannerElement, {
                interval: 4000,
                ride: 'carousel',
                pause: false,
                wrap: true,
            });
            carouselElement.addEventListener('slide.bs.carousel', handleSlide);
            return () => {
                carouselElement.removeEventListener('slide.bs.carousel', handleSlide);
                carouselInstance.dispose();
                bannerInstance.dispose();
            };
        }, 600);
        return () => clearTimeout(timeout);
    }, [carouselRef.current, page]);
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
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
            clearInterval(timer);
        };
    }, []);
    const formatTime = (seconds) => {
        const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');
        return <>
            <span className={styles.timeBoxStyle}>{h}</span>
            <span > : </span>
            <span className={styles.timeBoxStyle}>{m}</span>
            <span > : </span>
            <span className={styles.timeBoxStyle}>{s}</span>
        </>
    };
    return <>
        {loading ? (
            <div className={styles.loadingOverlay}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>) : (
            <>
                <div className={styles.homePage}>
                    <div className={styles.backgroundWrapper}>
                        <div ref={backgroundBaseRef} className={styles.backgroundBase}></div>
                        <div className={`${styles.heroZoneContainer} pt-5`}>
                            <div className={`${styles.heroZone}`} >
                                <div
                                    ref={carouselRef} id="carouselExampleIndicators"
                                    className={`${styles.carousel} carousel slide carousel-fade`}
                                    data-bs-ride={`carousel`}>
                                    <div className="carousel-indicators">
                                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
                                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={1} aria-label="Slide 2" />
                                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={2} aria-label="Slide 3" />
                                    </div>
                                    <div className="carousel-inner">
                                        {carouselItems.map((item, index) => (
                                            <div
                                                className={`carousel-item ${index === 0 ? 'active' : ''}`}
                                                key={index}
                                                style={{ background: item.background }}
                                            >
                                                <img
                                                    src={item.src}
                                                    alt={`Slide ${index + 1}`}
                                                    style={{ width: '100%', height: '16vw', borderRadius: '0.5rem' }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                        <span className={`${styles.buttonCarousel} carousel-control-prev-icon`} aria-hidden="true">
                                            <i className="fa-solid fa-angle-left" />
                                        </span>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                        <span className={`${styles.buttonCarousel} carousel-control-next-icon`} aria-hidden="true" >
                                            <i className="fa-solid fa-angle-right" />
                                        </span>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>
                                <div className={`${styles.bannerContainer}`}>
                                    <div className={`${styles.banner} mt-5`} >
                                        <div className={`${styles.leftBanner} carousel slide `} ref={bannerRef} id="carouselExampleInterval" data-bs-ride="carousel">
                                            <div className={`${styles.leftBannerContent} carousel-inner`}>
                                                {bannerItems.map((item, index) => (
                                                    <div key={index} className={`carousel-item h-100 ${item.active ? 'active' : ''}`} data-bs-interval={item.interval}>
                                                        <img src={process.env.PUBLIC_URL + item.src} className="d-block w-100 h-100" alt="carousel" />
                                                    </div>
                                                ))}
                                            </div>
                                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                                                <span className={`${styles.buttonCarousel} carousel-control-prev-icon`} aria-hidden="true">
                                                    <i className="fa-solid fa-angle-left" />
                                                </span>
                                                <span className="visually-hidden">Previous</span>
                                            </button>
                                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                                                <span className={`${styles.buttonCarousel} carousel-control-next-icon`} aria-hidden="true" >
                                                    <i className="fa-solid fa-angle-right" />
                                                </span>
                                                <span className="visually-hidden">Next</span>
                                            </button>
                                        </div>
                                        <div className={styles.topRightBanner}>
                                            <img src={process.env.PUBLIC_URL + '/asset/images/banner6.webp'} />
                                        </div>
                                        <div className={styles.bottomRightBanner}>
                                            <img src={process.env.PUBLIC_URL + '/asset/images/banner7.webp'} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles.itemparent} row service mt-4`}>
                                {serviceItems.map((item, index) => (
                                    <NavLink to='/accountuser/myvoucher' key={index} className={`${styles.itemchildContainer}`}>
                                        <div className={`${styles.itemchild}`}
                                            style={{ backgroundImage: `url(${process.env.PUBLIC_URL + item.background})`, }}></div>
                                        <p>{item.label}</p>
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.container}`}>
                        <div className={styles.category}>
                            <div className={`${styles.categoryTitle} my-2`}>
                                <img src={process.env.PUBLIC_URL + '/asset/images/categoriesicon.webp'} />
                                <strong className='mx-2'>{t('categories')}</strong>
                            </div>
                            <div className={styles.gridcategory}>
                                {categories?.slice(0, 10).map((category) => (
                                    <div key={category.category_id} className={styles.gridCategoryItemContainer}>
                                        <NavLink className={styles.gridCategoryItem}
                                            to={`/category/${category.name}`}
                                            onClick={async () => {
                                                try {
                                                    let data = {};
                                                    if (token == null) {
                                                        data = {
                                                            user_id: 0,
                                                            category_id: category.category_id,
                                                            name: category.name
                                                        };
                                                    } else {
                                                        const { user_id } = jwtDecode(token);
                                                        data = {
                                                            user_id: user_id,
                                                            category_id: category.category_id,
                                                            name: category.name
                                                        };
                                                    }
                                                    console.log('data', data)
                                                    await axios.post(`${DOMAIN}/api/view-category/add-view-by-categoryid`, data);
                                                } catch (error) {
                                                    console.log('error', error)
                                                }
                                            }}
                                        >
                                            <img src={`${process.env.PUBLIC_URL}/asset/images/${category.name}.webp`}
                                                alt={category}
                                            />
                                            <div className={styles.categoryItemTitle}>{category.description}</div>
                                        </NavLink>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={`${styles.flashsale} my-5`}>
                            <img src={process.env.PUBLIC_URL + 'asset/images/flashsale.webp'} className="d-block w-100 h-100" alt="carousel" />
                            <div className={styles.flashSellContainer} >
                                <div className={styles.flashSellContent}>
                                    <div className={styles.flashSellTitle}>
                                        <div
                                            className={`${styles.flashSellTitle1} p-2 ${selectedIndex === 0 ? styles.flashSellSelectButton : ''}`}
                                            onClick={() => handleClick(0, () => _.orderBy(arrTopViewsProduct, [item => new Date(item.created_at)], ['asc']))}
                                        >
                                            <div>08-13:00,01/08</div>
                                            <div>Đang diễn ra</div>
                                        </div>
                                        <div
                                            className={`${styles.flashSellTitle2}  p-2 ${selectedIndex === 1 ? styles.flashSellSelectButton : ''}`}
                                            onClick={() => handleClick(1, () => _.orderBy(arrTopViewsProduct, [item => new Date(item.created_at)], ['desc']))}
                                        >
                                            <div>08-13:00,01/08</div>
                                            <div>Sắp diễn ra</div>
                                        </div>
                                        <div
                                            className={`${styles.flashSellTitle2} p-2 ${selectedIndex === 2 ? styles.flashSellSelectButton : ''}`}
                                            onClick={() => handleClick(2, () => _.orderBy(arrTopViewsProduct, ['price'], ['asc']))}
                                        >
                                            <div>08-13:00,01/08</div>
                                            <div>Sắp diễn ra</div>
                                        </div>
                                    </div>
                                    <div className={`${styles.timeContainer} my-4`}>
                                        <div className={`${styles.timeContent}`}>
                                            <span>Bắt đầu sau: </span>
                                            <span>{formatTime(timeLeft)} </span>
                                        </div>
                                    </div>
                                    <Swiper
                                        className={styles.swiper}
                                        modules={[Navigation]}
                                        spaceBetween={10}
                                        slidesPerView={5}
                                        navigation
                                    >
                                        {arrTopViewsProduct?.map((product, index) => (
                                            <SwiperSlide key={index} className={styles.swiperSlide}>
                                                <NavLink
                                                    className={styles.swiperSlideContent}
                                                    to={`/productdetail/${product.product_id}`}
                                                    onClick={() => sendData(product, token, `${DOMAIN}/api/view-product/add-view-by-productid`)}
                                                >
                                                    <ProductItem product={product}></ProductItem>
                                                </NavLink>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.favourite} my-5`}>
                            <div className='d-flex my-3 align-items-center'>
                                <img style={{ width: '1.5vw' }} src={process.env.PUBLIC_URL + '/asset/images/shieldicon.webp'} />
                                <strong className='mx-2'>{t('heal&beauty')}</strong>
                            </div>
                            <div className={`${styles.favouriteGrid}`}>
                                <div className={styles.favouriteItem1}></div>
                                <div className={styles.favouriteItem2}></div>
                                <div className={styles.favouriteItem3}>
                                    <div className={styles.item3Gird}>
                                        {['Child1', 'Child2', 'Child3', 'Child4'].map((child, index) => (
                                            <div key={index} 
                                            className={styles[child]}
                                            onClick={()=>navigate('/flashsale')}
                                            ></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.topproductsContainer} >
                            <div className={`${styles.topproductsTitle}`}>
                                <img src={process.env.PUBLIC_URL + '/asset/images/checkicon.webp'} />
                                <strong className='mx-2'>{t('topproducts')}</strong>
                            </div>
                            <div className={styles.topviews} >
                                <div className={styles.topviewsContent}>{t('bestsellingproducts')}</div>
                                <img className={styles.topviewsImage} src={process.env.PUBLIC_URL + '/asset/images/topproduct.webp'} />
                                <div className='p-3'>
                                    <Swiper
                                        style={{ padding: '0.4vw' }}
                                        modules={[Navigation]}
                                        spaceBetween={10}
                                        slidesPerView={5}
                                        navigation
                                    >
                                        {arrTopViewsProduct?.map((product, index) => (
                                            <SwiperSlide key={index}>
                                                <NavLink
                                                    style={{ textDecoration: 'none' }}
                                                    to={`/productdetail/${product.product_id}`}
                                                    onClick={() => sendData(product, token, `${DOMAIN}/api/view-product/add-view-by-productid`)}
                                                >
                                                    <ProductItem product={product}></ProductItem>
                                                </NavLink>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                        <div className={styles.todaysuggestion}>
                            <div className={`${styles.cardTop} card`}>
                                <div className={`${styles.cardTopBody} card-body`} >{t('dailydiscover')}</div>
                                <div className={`${styles.cardTopFooter} card-footer`}></div>
                            </div>
                            <InfiniteScroll
                                style={{ overflowX: 'hidden' }}
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
                                        return <div style={{ width: '20%', padding: '1vw' }} className='' key={index}>
                                            <NavLink
                                                style={{ textDecoration: 'none' }}
                                                to={`/productdetail/${product.product_id}`}
                                                onClick={() => sendData(product, token, `${DOMAIN}/api/view-product/add-view-by-productid`)}
                                            >
                                                <ProductItem product={product}></ProductItem>
                                            </NavLink>
                                        </div>
                                    })}
                                </div>
                            </InfiniteScroll>
                        </div>
                    </div >
                    <button
                        onClick={scrollToTop}
                        className={`${styles.scrollToTopButton} ${isVisible ? styles.visible : styles.hidden}`}
                    >
                        <i className="fa-solid fa-arrow-up" />
                    </button>
                    <hr></hr>
                </div>
            </>
        )}
    </>
};

export default Home