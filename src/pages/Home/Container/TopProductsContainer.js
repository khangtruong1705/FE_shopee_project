import { useState, useEffect } from 'react'
import styles from '../Home.module.scss'
import { NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { DOMAIN } from '../../../util/config';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import ProductItem from '../../../components/ProductItem/ProductItem';
import { useTranslation } from 'react-i18next';


const TopProductsContainer = () => {
    const token = localStorage.getItem('token');
    const { t } = useTranslation();
    const [arrTopViewsProduct, setArrTopViewsProduct] = useState([]);
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
    const fetchData = async () => {
        try {    
                const response1 = await axios.get(`${DOMAIN}/api/products/get-top-views-products`);
                setArrTopViewsProduct(response1.data);   
        } catch (error) {
            console.error('Error fetching products:', error);
            setArrTopViewsProduct([])
            
        } 
    };
    useEffect(() => {
        fetchData()
    }, [])
    return <div className={styles.topproductsContainer} >
        <div className={`${styles.topproductsTitle}`}>
            <img src={process.env.PUBLIC_URL + '/asset/images/checkicon.webp'} alt="..." />
            <strong className='mx-2'>{t('topproducts')}</strong>
        </div>
        <div className={styles.topviews} >
            <div className={styles.topviewsContent}>{t('bestsellingproducts')}</div>
            <img className={styles.topviewsImage} src={process.env.PUBLIC_URL + '/asset/images/topproduct.webp'} alt="..." />
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
}



export default TopProductsContainer