import React from 'react';
import styles from './DownloadApp.module.scss'
import {bottomItems} from './DownloadAppRawData'




const DownloadApp = () => {
    return (
        <div style={{ background: '#d2def6' }} >
            <div className='w-75 mx-auto'>
                <div className={styles.topPageContainer}>
                    <div className={`${styles.topPage} m-1`} >
                        <div className={styles.topPageText1} >
                            <div>Tải app e-commerce</div>
                            <div> mua sắm thả ga</div>
                        </div>
                        <div className={styles.topPageText2}>Mua hang qua app nhanh chóng và miễn phí mọi đơn hàng,cùng nhiều ưu đãi đặc biệt khác chỉ dành riêng cho thành viên của shop</div>
                    </div>
                    <div className={styles.imgGroup} >
                        <div className={styles.qrImg}>
                            <img src={process.env.PUBLIC_URL + '/asset/images/qrcode.png'} alt="QR Code" />
                        </div>
                        <div className={styles.logoGroup}>
                            <a href="#" className="google-play">
                                <img src={process.env.PUBLIC_URL + '/asset/images/googleplaylogo2.png'} alt="Google Play" />
                            </a>
                            <a href="#" className="app-store">
                                <img src={process.env.PUBLIC_URL + '/asset/images/applestorelogo.png'} alt="App Store" />
                            </a>
                        </div>

                    </div>
                </div>
                <div style={{ height: '2.5vw' }}></div>
                <div style={{ position: 'relative', paddingBottom: '40%', height: 0, width: '100%', margin: '2vw auto' }}>
                    <iframe
                        src="https://www.youtube.com/embed/rgZU5pDf6mw?autoplay=1"
                        title="YouTube video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{
                            border: 'none',
                            borderRadius: '1rem',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%'
                        }}
                    />
                </div>

                <div style={{ height: '3vw' }}></div>
            </div>
            <div className={styles.bottomHome}>
                {bottomItems.map((item, index) => (
                    <div key={index} className={styles.bottomHomeItem}>
                        <i className={`${styles.bottomHomeItemIcon} fa-solid ${item.icon}`} />
                        <div>
                            <div className={styles.bottomHomeItemTitle}>{item.title}</div>
                            <div className={styles.bottomHomeItemContent}>{item.content}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default DownloadApp;