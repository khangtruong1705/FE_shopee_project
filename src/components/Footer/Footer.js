import styles from './Footer.module.css'
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
const Footer = () => {
    const { t } = useTranslation();
    const CustomNavLink = ({ to, children }) => (
        <NavLink to={to} style={{ textDecoration: 'none', color: 'black' }}>
            <p>{children}</p>
        </NavLink>
    );
    return <div className='container'>
        <hr style={{ height: '5px', backgroundColor: '#f6442d' }}></hr>
        <div className="footer w-100">
            <div className={`${styles.service} w-100 row`}>
                <div className='col-lg-2 col-md-4 col-sm-6 text-center' >
                    <h1 className={styles.title}>{t('customerservice')}</h1>
                    <CustomNavLink to='/shopeehelp'>{t('shopeeblog')}</CustomNavLink>
                    <CustomNavLink to='/shopeepolicy/shoppingwithshopee'>{t('shopeemall')}</CustomNavLink>
                    <CustomNavLink to='/shopeehelp'>{t('howtobuy')}</CustomNavLink>
                    <CustomNavLink to='/shopeehelp'>{t('howtosell')}</CustomNavLink>
                    <CustomNavLink to='/shopeepolicy/paymethod'>{t('payment')}</CustomNavLink>
                    <CustomNavLink to='/shopeehelp'>{t('shopeecoin')}</CustomNavLink>
                    <CustomNavLink to='/shopeepolicy/transport'>{t('shipping')}</CustomNavLink>
                    <CustomNavLink to='/shopeepolicy/refund'>{t('return&refund')}</CustomNavLink>
                    <CustomNavLink to='/shopeepolicy/generalinfo'>{t('contactus')}</CustomNavLink>
                    <CustomNavLink to='/shopeepolicy/generalinfo'>{t('warrantypolicy')}</CustomNavLink>

                </div>
                <div className='col-lg-2 col-md-4 col-sm-6 text-center'>
                    <h1 className={styles.title}>{t('aboutshopee')}</h1>
                    <p><a href='https://careers.shopee.vn/about' style={{ textDecoration: 'none', color: 'black' }}>{t('aboutus')}</a></p>
                    <p><a href='https://careers.shopee.vn/jobs' style={{ textDecoration: 'none', color: 'black' }}>{t('shopeecareers')}</a></p>
                    <CustomNavLink to='/shopeepolicy/generalinfo'><p>{t('shopeepolicies')}</p></CustomNavLink>
                    <CustomNavLink to='/shopeepolicy/generalinfo'> <p>{t('privacypolicy')}</p></CustomNavLink>
                    <CustomNavLink to='/shopeepolicy/shoppingwithshopee'><p>{t('shopeemall')}</p></CustomNavLink>
                    <CustomNavLink to='/sellercenter'><p>{t('sellercenter')}</p></CustomNavLink>
                    <CustomNavLink to='/flashsale'><p>{t('flashsale')}</p></CustomNavLink>
                    <p><a href='https://shopee.vn/affiliate/' style={{ textDecoration: 'none', color: 'black' }}>{t('shopeeambassadorprogramme')}</a></p>
                    <a href='https://www.facebook.com/ShopeeVN' style={{ textDecoration: 'none', color: 'black' }}>{t('mediacontact')}</a>
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
                        <a href='https://www.facebook.com/ShopeeVN' style={{textDecoration:'none'}}><i className="pe-2 fa-brands fa-facebook" />
                            Facebook
                        </a>
                    </p>
                    <p>
                        <a href='https://www.instagram.com/Shopee_VN' style={{textDecoration:'none',color:'#fc4ebd'}}><i className="pe-2 fa-brands fa-instagram" />
                            Instagram
                        </a>
                    </p>
                    <p>
                        <a href='https://www.linkedin.com/company/shopee/' style={{textDecoration:'none',color:'#0a66c2'}}><i className="pe-2 fa-brands fa-linkedin" />
                            LinkerIn
                        </a>
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