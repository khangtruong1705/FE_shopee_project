import { useState, useEffect } from 'react'
import { NavLink} from "react-router-dom";
import styles from './Home.module.scss'
import axios from 'axios';
import { DOMAIN } from '../../util/config';
import { jwtDecode } from 'jwt-decode';
import _ from "lodash";
import InfiniteScroll from 'react-infinite-scroll-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useTranslation } from 'react-i18next';
import ProductItem from '../../components/ProductItem/ProductItem';
import BackgroundWrapper from './BackgroundWrapper/BackgroundWrapper';
import Category from './Container/Category';
import GoldenSale from './Container/GoldenSale';
import Favourite from './Container/Favourite';
import TopProductsContainer from './Container/TopProductsContainer';




const Home = () => {
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const [arrNewToOldProduct, setArrarNewToOldProduct] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const { t } = useTranslation();
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
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    const fetchData = async (pageNum) => {
        try {
            setLoading(true);
            const response = await axios.get(`${DOMAIN}/api/products/get-all-products?page=${pageNum}&limit=12`);
            let newProducts = _.orderBy(response.data.results, ["created_at"], ["desc"]);
            setArrarNewToOldProduct((prev) => [...prev, ...newProducts]);
            if (newProducts.length === 0 ||
                newProducts.length < 12 ||
                pageNum * 12 >= newProducts.total) {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
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
        };
    }, []);
    useEffect(() => {
        fetchData(page)
    },[page])
    return <>
        {loading ? (
            <div className={styles.loadingOverlay}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>) : (
                <div className={styles.homePage}>
                    <BackgroundWrapper />
                    <div className={`${styles.container}`}>
                        {/* category */}
                        <Category/>
                        {/* GoldenSale */}
                        <GoldenSale />
                        {/* Favourite */}
                        <Favourite/>
                        {/* TopProductsContainer */}
                        <TopProductsContainer/>
                        {/* Todaysuggestion */}
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
                                endMessage={<div className="text-center my-3 text-primary">{t('allproductsloaded')}</div>}
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
            
        )}
    </>
};

export default Home