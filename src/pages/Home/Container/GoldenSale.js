import { useState, useEffect} from 'react'
import styles from '../Home.module.scss'
import _ from "lodash";
import { NavLink, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { DOMAIN } from '../../../util/config';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import ProductItem from '../../../components/ProductItem/ProductItem';



const GoldenSale = () => {
    const token = localStorage.getItem('token');
    const [timeLeft, setTimeLeft] = useState(9 * 3600 + 18 * 60 + 28);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [arrTopViewsProduct, setArrTopViewsProduct] = useState([]);
    const handleClick = (index, sortFn) => {
        setSelectedIndex(index);
        const sortedItems = sortFn();
        setArrTopViewsProduct(sortedItems);
    };

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
    const fetchData = async () => {
        try {
                const response = await axios.get(`${DOMAIN}/api/products/get-top-views-products`);
                setArrTopViewsProduct(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
            setArrTopViewsProduct([])
        }
    };
    useEffect(() => {
         fetchData()
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);
    return <div className={`${styles.goldensale} my-5`}>
        <img src={process.env.PUBLIC_URL + '/asset/images/flashsalelogo.webp'} className="d-block w-100 h-100" alt="carousel" />
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
}



export default GoldenSale