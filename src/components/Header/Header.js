import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import styles from './Header.module.css'
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

import { DOMAIN } from '../../util/config';
import { notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const Header = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const searchKeyword = useRef();
    const location = useLocation();
    const token = localStorage.getItem('token');
    const [amount, setAmount] = useState(0);
    const amountCart = useSelector((state) => state.getAmountCart.amountCart);
    const avatarUrl = useSelector((state) => state.getAvatarUrl.avatarUrl);
    const [userInfo, setUserInfo] = useState({});
    const [language, setLanguage] = useState('English');
    const limitCharacters = (text, limit = 6) => {
        if (!text) return "";
        return text.length > limit ? text.slice(0, limit) + "..." : text;
    };
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };
    const fetchData = async (token) => {
        try {
            const { user_id } = jwtDecode(token);
            const response = await axios.get(`${DOMAIN}/api/carts/get-amount-item-of-cart-by-user-id/${user_id}`);
            setAmount(response.data)


            const res = await axios.get(`${DOMAIN}/api/users/get-user-by-user-id/${user_id}`);
            setUserInfo(res.data);

        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    useEffect(() => {
        if (token == null) {
            setAmount(0)
        } else {
            fetchData(token)
        }
    }, [amountCart, avatarUrl])
    const tags = [
        t('hairwax'), t('mensperfume'), t('corksandals'), t('zaramen'), t('health'),
        t('mensfashion'), t('womensfashion'), t('camera'), t('motorbike'), t('beauty')];
    const handleChange = (e) => {
        const { value } = e.target;
        searchKeyword.current = value;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const frm = document.getElementById('frm');
        frm.reset();
        navigate(`/search/${searchKeyword.current}`);
    };
    const renderLogo = () => {
        if (location.pathname === '/cart') {
            return <>
                <div className={`${styles.logocolor2}`}>
                    <NavLink to='/'>
                        <img className={styles.shopeeimage2} src={process.env.PUBLIC_URL + '/asset/images/shopeelogo.png'} />
                    </NavLink>
                    <div className={styles.carttext}>{t('shoppingcart')}</div>
                </div>
            </>
        } else if (location.pathname === '/payments') {
            return <>
                <div className={`${styles.logocolor2}`}>
                    <NavLink to='/'>
                        <img className={styles.shopeeimage2} src={process.env.PUBLIC_URL + '/asset/images/shopeelogo.png'} />
                    </NavLink>
                    <div className={styles.carttext}>{t('payment')}</div>
                </div>
            </>
        } else {
            return <div className='w-75 mx-auto'>
                <div className={`${styles.search} mx-auto `}  >
                    <div className="text-align-center">
                        <NavLink className='d-flex' to='/' style={{ textDecoration: 'none' }}  >
                            <i className={`${styles.shopeeimageicon} fa-solid fa-basket-shopping me-2`} />
                            <span className={styles.shopeeimagetext}>Shopee</span>
                        </NavLink>
                    </div>
                    <div className='' style={{ width: '53vw' }}>
                        <form id='frm' className={styles.inputform}>
                            <input className="form-control w-100 " list="datalistOptions" id="exampleDataList" style={{ border: 'none' }} onChange={handleChange} />
                            <datalist id="datalistOptions">
                                <option value="Giày Nam">
                                </option><option value="Nước Hoa">
                                </option><option value="Áo Khoát">
                                </option><option value="Đồng Hồ">
                                </option><option value="Máy Ảnh">
                                </option>
                            </datalist>
                            <div className='p-1'>
                                <button className={styles.inputbutton} onClick={handleSubmit}>
                                    <i className="fa-solid fa-magnifying-glass" style={{ color: 'white' }}></i>
                                </button>
                            </div>
                        </form>
                        <div className={styles.tagmarquee}>
                            <div className={styles.tagtrack}>
                                {tags.map((tag, index) => (
                                    <div key={index} className="m-1">
                                        {tag}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="cart">
                        <div className={styles.cart} onClick={() => {
                            if (token === null) {
                                notification.config({
                                    placement: 'topLeft',
                                    top: 60,
                                    duration: 1
                                });
                                notification.warning({
                                    message: 'Cảnh báo',
                                    description: 'Bạn cần đăng nhập để tiếp tục mua hàng!',
                                });
                                setTimeout(() => {
                                    navigate(`/login`)
                                }, 1600);
                            } else {
                                navigate(`/cart`)
                            }
                        }}>
                            <i className={`fa-solid fa-cart-shopping my-auto ${styles.carticon}`} />
                            <div className={`rounded-circle ${styles.cartamount}`}>{amount}</div>
                        </div>
                    </div>
                </div>
            </div>
        }
    }
    const renderLogin = () => {
        if (token == null) {
            return <>
                <div className="border-start p-1">
                    <NavLink to='/register'>{t('signup')}</NavLink>
                </div>
                <div className="border-start p-1">
                    <NavLink to='/login'>{t('login')}</NavLink>
                </div>
            </>
        }
        return <>
            {userInfo.avatar_url ?
                <img src={userInfo.avatar_url} className='p-1 mx-1' alt="avatar" style={{ width: '2vw', height: '2vw', borderRadius: '50px' }} />
                : <i className="fa-solid fa-user p-1 mx-1" style={{ border: 'solid 1.5px', borderRadius: '50px' }}></i>
            }
            <div className={styles.dropdown}>
                <span className={styles.dropdownbutton}>{limitCharacters(userInfo.name) || limitCharacters(userInfo.email)}</span>
                <div className={styles.dropdowncontent}>
                    <div>
                        <NavLink to='/accountuser/infouser' style={{ textDecoration: 'none', color: 'black' }}>{t('myaccount')}</NavLink>
                    </div>
                    <div>
                        <NavLink to='/accountuser/purchaseorder' style={{ textDecoration: 'none', color: 'black' }} >{t('mypurchase')}</NavLink>
                    </div>
                    <div >
                        <span style={{ cursor: 'pointer' }} onClick={() => {
                            localStorage.removeItem("token");
                            navigate(`/`)
                            window.location.reload()
                        }}>{t('logout')}</span>

                    </div>
                </div>
            </div>
        </>
    }
    return <>
        <div className={`${styles.header} container-fluid p-0`}>
            <div className={`${styles.navigate} mx-auto`}>
                <div className={`${styles.navigateLeftItem} left`}>
                    <NavLink to='/sellercenter'  className="border-end p-1" style={{ textDecoration: 'none', color: 'white' }} >{t('sellercenter')}</NavLink>
                    <div className="border-end p-1">{t('startselling')}</div>
                    <div className="border-end p-1" >
                        <div className={styles.dropdown}>
                            <span className={styles.dropdownbutton}>{t('download')}</span>
                            <div className={styles.dropdowndownloadapp}>
                                <div >
                                    <img  className='w-100' src={process.env.PUBLIC_URL + '/asset/images/qrcode.png'}></img>
                                    <div className='d-flex'>
                                        <img className='w-50' src={process.env.PUBLIC_URL + '/asset/images/applewatchlogo.png'}></img>
                                        <img className='w-50' src={process.env.PUBLIC_URL + '/asset/images/googleplaylogo.png'}></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-1">
                        <span className="pe-1">{t('followuson')}</span>
                        <a href='https://www.facebook.com/ShopeeVN'><i className="pe-1 fa-brands fa-facebook text-light" /></a>
                        <a href='https://www.instagram.com/Shopee_VN/'><i className="fa-brands fa-instagram text-light" /></a>
                    </div>
                </div>
                <div className={`${styles.navigateRightItem} right`}>
                    <div className={`${styles.notificationwrapper} p-1`}>

                        <div className={styles.dropdown}>
                            <span className={`${styles.dropdownbutton}`}>
                                <span><i className="pe-1 fa-regular fa-bell" /></span>
                                {t('notifications')}
                            </span>
                            <div className={styles.dropdowncontent2}>
                                <div className=''>
                                    <p>🎉 Voucher đầy ví chần chừ gì nữa!</p>
                                    <p>
                                        ⚡Voucher điện tử giảm đến 2 triệu 💖Voucher thời trang giảm 100k
                                    </p>
                                </div>
                                <hr></hr>
                                <div className=''>
                                    <p>21H LÊN SÓNG LIVE SĂN DEAL 50%</p>
                                    <p>💗 Deal giảm sốc, quà tặng hấp dẫn cho Bạn</p>
                                </div>
                                <hr></hr>
                                <div className='' >
                                    <p>🎁 ƯU ĐÃI SHOPEEPAY</p>
                                    <p>Nhận ngay 45k khi kích hoạt ShopeePay trước 20/05/2025</p>
                                </div>
                                <hr></hr>
                                <div>
                                    <button
                                        className='p-2 h-100 w-100'
                                        style={{ border: 'none' }}
                                        onClick={() => {
                                            navigate(`/notification`)
                                        }}
                                    >{t('viewall')}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-start p-1">
                        <span><i className="pe-1 fa-solid fa-question" /></span>
                        <NavLink to='/shopeehelp' style={{ textDecoration: 'none', color: 'white' }}>{t('help')}</NavLink>
                    </div>
                    <div className="border-start p-1">
                        <span><i className="pe-1 fa-solid fa-earth-americas" /></span>
                        <div className={styles.dropdown}>
                            <span className={styles.dropdownbutton}>{language}</span>
                            <div className={styles.dropdowncontent}>
                                <div >
                                    <span style={{ cursor: 'pointer' }} onClick={() => {
                                        setLanguage('English')
                                        changeLanguage('en')
                                    }}>English</span>

                                </div>
                                <div >
                                    <span style={{ cursor: 'pointer' }} onClick={() => {
                                        setLanguage('Tiếng Việt')
                                        changeLanguage('vi')
                                    }}>Tiếng Việt</span>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mx-2 d-flex align-items-center'>
                        {renderLogin()}
                    </div>
                </div>
            </div>
            <div className='w-100 mx-auto'>
                {renderLogo()}
            </div>
        </div>
    </>
};

export default Header;