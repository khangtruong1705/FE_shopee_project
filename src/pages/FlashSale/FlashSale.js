import styles from './FlashSale.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';
import _ from "lodash";
import { DOMAIN } from '../../util/config';
import { Segmented } from 'antd';
import { useTranslation } from 'react-i18next';

const FlashSale = () => {
    const [timeLeft, setTimeLeft] = useState(7200);
    const [arrMain, setArrMain] = useState([]);
    const { name } = useParams();
    const { t } = useTranslation();

    const fetchData = async () => {
        try {
            const response = await axios.get(`${DOMAIN}/api/products/get-all-products`);
            console.log('response', response.data)
            setArrMain(response.data.results);
        } catch (error) {
            console.error('Error fetching products:', error);
            setArrMain([])
        }
    };
    useEffect(() => {
        fetchData()
        console.log('arrMain', arrMain)
    }, [name])
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');
        return [h, m, s];
    };
    const [h, m, s] = formatTime(timeLeft);
    return <>
        <div className={styles.timeleft}>
            <div className={styles.line} />
            <div className={styles.content}>
                <span className={styles.title}>⚡<strong>FLASH SALE</strong></span>
                <span className={styles.clock}>🕒</span>
                <span className={styles.label}>KẾT THÚC TRONG</span>
                <div className={styles.countdown}>
                    <span className={styles.timeBox}>{h}</span>
                    <span className={styles.separator}>:</span>
                    <span className={styles.timeBox}>{m}</span>
                    <span className={styles.separator}>:</span>
                    <span className={styles.timeBox}>{s}</span>
                </div>
            </div>
            <div className={styles.line} />
        </div>
        <div className='container w-75 mx-auto'>
            <div >
                <img style={{ height: '250px' }} src={process.env.PUBLIC_URL + '/asset/images/flashsale.jpg'} className="d-block w-100" alt="..." />
            </div>
            <div className='d-flex justify-content-around my-4 p-3' style={{ backgroundColor: '#ededed' }}>
                <NavLink style={{ textDecoration: 'none' }} onClick={() => {
                    const sortedItems = _.orderBy(
                        arrMain,
                        [item => new Date(item.created_at)],
                        ['asc']
                    );
                    setArrMain(sortedItems)
                }}><strong>TOP SẢN PHẢM NỔI BẬT</strong></NavLink>
                <NavLink style={{ textDecoration: 'none' }} onClick={() => {
                    const sortedItems = _.orderBy(
                        arrMain,
                        [item => new Date(item.updated_at)],
                        ['desc']
                    );
                    setArrMain(sortedItems)
                }}><strong>SHOPEE NEWS</strong></NavLink>
                <NavLink style={{ textDecoration: 'none' }} onClick={() => {
                    const sortedItems = _.orderBy(
                        arrMain,
                        [item => new Date(item.updated_at)],
                        ['asc']
                    );
                    setArrMain(sortedItems)
                }} ><strong>SHOPEE GIẢM GIÁ</strong></NavLink>
                <NavLink style={{ textDecoration: 'none' }} onClick={() => {
                    const sortedItems = _.orderBy(arrMain, ["price"], ["asc"]);
                    setArrMain(sortedItems)
                }}><strong>SHOPEE SIÊU RẺ</strong></NavLink>
                <NavLink style={{ textDecoration: 'none' }} onClick={() => {
                    const sortedItems = _.orderBy(arrMain, ["sold"], ["desc"]);
                    setArrMain(sortedItems)
                }}><strong>SHOPEE BÁN CHẠY</strong></NavLink>
                <NavLink style={{ textDecoration: 'none' }} onClick={() => {
                    const sortedItems = _.orderBy(arrMain, ["views"], ["desc"]);
                    setArrMain(sortedItems)
                }}><strong>SHOPEE ĐƯỢC QUAN TÂM</strong></NavLink>
            </div>
            <div className='row'>
                {arrMain?.map((product, index) => {
                    return <div className='col-lg-3 col-md-4 col-sm-6' key={index}>
                        <NavLink to={`/productdetail/${product.product_id}`} className={`${styles.carditem} card m-1`}>
                            <div className='card-header' style={{ height: '21vw', backgroundColor: '#ffffff' }}>
                                <img
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
        </div>

    </>

}


export default FlashSale