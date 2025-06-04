import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import axios from 'axios';
import { DOMAIN } from "../../util/config";
import { Button, message, Checkbox, Form, Input } from 'antd';
import styles from './SellerCenter.module.css'
import { useTranslation } from 'react-i18next';





const SellerCenter = () => {
    const { t } = useTranslation();

    return <>
        <div style={{ backgroundColor: '#f6f6f6',position:'relative' }}>
            <div className="header mb-5" style={{ backgroundColor: '#ffffff', }}>
                <div className='d-flex justify-content-between align-items-center w-75 mx-auto'>
                    <div className="d-flex align-items-center justify-content-start w-50">
                        <NavLink to='/' >
                            <img className="w-75" src={process.env.PUBLIC_URL + '/asset/images/shopeelogo.png'} />
                        </NavLink>
                        <span className="w-100" style={{ fontSize: '1.5vw' }}><strong>{t('becomeseller')}</strong></span>
                    </div>

                    <NavLink to='/shopeehelp' style={{ color: '#ee4d2d', textDecoration: 'none' }}>
                        {t('areyouhelp')}
                    </NavLink>
                </div>
            </div>
            <div className="body card w-75 mx-auto" style={{ minHeight: '550px' }}>
                <div className="card-body d-flex mx-auto  flex-column" style={{ width: '25vw' }}>
                    <div>
                        <img style={{ background: '#ffe5df', borderRadius: '10px' }} className=" d-block w-75 mx-auto" src={process.env.PUBLIC_URL + '/asset/images/becomeseller.webp'}></img>
                    </div>
                    <div style={{ fontSize: '1.5vw' }} className="text-center p-2">{t('welcomeshopee')}</div>
                    <div style={{ fontSize: '0.9vw' }} className="text-center p-2">{t('provideinfomation')}</div>
                    <button style={{ background: '#f1582c', border: 'none', borderRadius: '3px', color: 'white' }} className="w-50 mx-auto p-2">{t('signup')}</button>
                </div>
            </div>
            <div className={styles.sidebar}>
                <i className={`${styles.sidebaricons} fas fa-bell`} />
                <i className={`${styles.sidebaricons} fas fa-headset`} />
                <i className={`${styles.sidebaricons} fas fa-comment-dots`} />
            </div>
            <Footer></Footer>
        </div>
    </>
};


export default SellerCenter