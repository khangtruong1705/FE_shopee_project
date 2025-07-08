import styles from './FlashSale.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';
import _ from "lodash";
import { DOMAIN } from '../../util/config';
import { useTranslation } from 'react-i18next';
import ProductCard from '../../components/ProductCard/ProductCard';


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
                {arrMain?.map((product, index) => (
                            <ProductCard
                                key={index}
                                product={product}
                                t={t}
                            />
                        ))}
            </div>
        </div>

    </>

}


export default FlashSale