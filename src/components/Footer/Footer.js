import styles from './Footer.module.css'
import { useTranslation } from 'react-i18next';
import { NavLink} from 'react-router-dom';
const Footer = () => {
     const { t } = useTranslation();
    return <div className='container'>
        <hr style={{ height: '5px', backgroundColor: '#f6442d' }}></hr>
        <div className="footer w-100">
            <div className={`${styles.service} w-100 row`}>
                <div className='col-lg-2 col-md-4 col-sm-6 text-center'>
                    <h1 className={styles.title}>{t('customerservice')}</h1>
                    <NavLink to='/shopeehelp'><p>{t('shopeeblog')}</p></NavLink>
                    <NavLink to='/shopeepolicy/shoppingwithshopee'><p>{t('shopeemall')}</p></NavLink>
                    <NavLink to='/shopeehelp'><p>{t('howtobuy')}</p></NavLink>
                    <NavLink to='/shopeehelp'><p>{t('howtosell')}</p></NavLink>
                    <NavLink to='/shopeepolicy/paymethod'><p>{t('payment')}</p></NavLink>
                    <NavLink to='/shopeehelp'><p>{t('shopeecoin')}</p></NavLink>
                    <NavLink to='/shopeepolicy/transport'><p>{t('shipping')}</p></NavLink>
                    <NavLink to='/shopeepolicy/refund'><p>{t('return&refund')}</p></NavLink>
                    <NavLink to='//shopeepolicy/generalinfo'><p>{t('contactus')}</p></NavLink>
                    <NavLink to='/shopeepolicy/generalinfo'><p>{t('warrantypolicy')}</p></NavLink>
                   
                </div>
                <div className='col-lg-2 col-md-4 col-sm-6 text-center'>
                    <h1 className={styles.title}>{t('aboutshopee')}</h1>
                    <p>{t('aboutus')}</p>
                    <p>{t('shopeecareers')}</p>
                    <NavLink to='/shopeepolicy/generalinfo'><p>{t('shopeepolicies')}</p></NavLink>
                    <NavLink to='/shopeepolicy/generalinfo'> <p>{t('privacypolicy')}</p></NavLink>            
                    <NavLink to='/shopeepolicy/shoppingwithshopee'><p>{t('shopeemall')}</p></NavLink>
                    <NavLink to='/sellercenter'><p>{t('sellercenter')}</p></NavLink> 
                    <p>{t('flashdeals')}</p>
                    <p>{t('shopeeambassadorprogramme')}</p>
                    <p>{t('mediacontact')}</p>
                </div>
                <div className='col-lg-2 col-md-4 col-sm-6'>
                    <h1 className={styles.title}>{t('payment').toUpperCase()}</h1>
                    <div className={styles.gridcontainer}>
                        <div className={styles.griditem1}></div>
                        <div className={styles.griditem2}></div>
                        <div className={styles.griditem3}></div>
                        <div className={styles.griditem4}></div>
                        <div className={styles.griditem5}></div>
                        <div className={styles.griditem6}></div>
                        <div className={styles.griditem7}></div>
                        <div className={styles.griditem8}></div>
                    </div>
                </div>
                <div className='col-lg-2 col-md-4 col-sm-6'>
                     <h1 className={styles.title}>{t('logistics')}</h1>
                    <div className={styles.transportcontainer}>
                        <div className={styles.transportitem1}></div>
                        <div className={styles.transportitem2}></div>
                        <div className={styles.transportitem3}></div>
                        <div className={styles.transportitem4}></div>
                        <div className={styles.transportitem5}></div>
                        <div className={styles.transportitem6}></div>
                        <div className={styles.transportitem7}></div>
                        <div className={styles.transportitem8}></div>
                        <div className={styles.transportitem9}></div>
                        <div className={styles.transportitem10}></div>
                        <div className={styles.transportitem11}></div>
                    </div>
                </div>
                <div className='col-lg-2 col-md-4 col-sm-6 text-center'>
                    <h1 className={styles.title}>{t('followus')}</h1>
                    <p>
                        <span><i className="pe-2 fa-brands fa-facebook" />
                            Facebook
                        </span>
                    </p>
                    <p>
                        <span><i className="pe-2 fa-brands fa-instagram" />
                            Instagram
                        </span>
                    </p>
                    <p>
                        <span><i className="pe-2 fa-brands fa-linkedin" />
                            LinkerIn
                        </span>
                    </p>
                </div>
                <div className='col-lg-2 col-md-4 col-sm-6'>
                    <h1 className={styles.title}>{t('shopeeappdownload')}</h1>
                    <div className={styles.downloadapp}>
                        <div className={styles.downloadappitem1}></div>
                        <div className={styles.downloadappitem2}></div>
                        <div className={styles.downloadappitem3}></div>
                        <div className={styles.downloadappitem4}></div>
                    </div>
                </div>
            </div>

            <div className="part1 d-flex justify-content-center p-3">
                <div className="p-2 border-end">{t('privacypolicy').toUpperCase()}</div>
                <div className="p-2 border-end">{t('termofservice')}</div>
                <div className="p-2 border-end">{t('shippingpolicy')}</div>
                <div className="p-2">{t('violation')}</div>
            </div>
            <div className="part2">
            </div>
            <div className="part3 text-center">
                {t('address')}
            </div>
            <div className="part3 text-center">
                {t('informationmanagement')}: Nguyễn Bùi Anh Tuấn
            </div>
            <div className="part3 text-center">
                 {t('registrationcertificate')}
            </div>
            <div className="part3 text-center">
                © 2015 - {t('copyright')}
            </div>
        </div>

    </div>
};

export default Footer;