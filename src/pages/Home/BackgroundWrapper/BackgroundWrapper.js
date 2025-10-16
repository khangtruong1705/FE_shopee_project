import { serviceItemData, bannerItemsData, carouselItemsData } from "../homeRawData";
import { useTranslation } from 'react-i18next';
import styles from '../Home.module.scss'
import { useNavigate } from "react-router-dom";
import { notification } from 'antd';
import { useEffect, useRef } from 'react'

const BackgroundWrapper = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const { t } = useTranslation();
    const bannerItems = bannerItemsData;
    const carouselItems = carouselItemsData;
    const carouselRef = useRef(null);
    const bannerRef = useRef(null);
    const backgroundBaseRef = useRef(null);
    const serviceItems = serviceItemData.map(item => ({
        background: item.background,
        label: t(item.label)
    }));
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
    }, [carouselRef.current]);
    return <div className={styles.backgroundWrapper}>
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
                            <img src={process.env.PUBLIC_URL + '/asset/images/banner6.webp'} alt="..." />
                        </div>
                        <div className={styles.bottomRightBanner}>
                            <img src={process.env.PUBLIC_URL + '/asset/images/banner7.webp'} alt="..." />
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${styles.itemparent} row service mt-4`}>
                {serviceItems.map((item, index) => (
                    <div key={index}
                        onClick={() => {
                            if (token == null) {
                                notification.warning({
                                    message: 'Cảnh báo',
                                    description: 'Bạn cần đăng nhập để xem dịch vụ!',
                                });
                                setTimeout(() => {
                                    navigate(`/login`)
                                }, 1200);
                            } else {
                                navigate(`/accountuser/myvoucher`)
                            }
                        }}
                        className={`${styles.itemchildContainer}`}>
                        <div className={`${styles.itemchild}`}
                            style={{ backgroundImage: `url(${process.env.PUBLIC_URL + item.background})`, }}></div>
                        <p>{item.label}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
}

export default BackgroundWrapper

