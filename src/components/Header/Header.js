import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import styles from './Header.module.scss'
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { DOMAIN } from '../../util/config';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { notification, Popover } from 'antd';
import {
    categoriesData, tagsData, getLoginContent,
    downloadAppContent, getNotificationsContent, getContentLanguage,
    getInputContent, getCartContent
} from './headerRawData'



const Header = ({ setCount }) => {
    const [categoryProducts, setCategoryProducts] = useState({});
    const [cartArray, setCartArray] = useState([]);
    const { t, i18n } = useTranslation();
    const tags = tagsData.map(item => ({
        ...item,
        fixName: t(item.fixName)
    }))
    const categories = categoriesData.map(item => ({ name: item.name, label: t(item.label) }));
    const navigate = useNavigate();
    const searchKeyword = useRef();
    const location = useLocation();
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [amount, setAmount] = useState(0);
    const amountCart = useSelector((state) => state.getAmountCart.amountCart);
    const avatarUrl = useSelector((state) => state.getAvatarUrl.avatarUrl);
    const [userInfo, setUserInfo] = useState({});
    const [language, setLanguage] = useState('Tiếng Việt');
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = () => {
        setIsFocused(true)
        setIsPopoverOpen(true)
    }
        ;
    const handleBlur = () => setIsFocused(false);
    const inputRef = useRef(null);
    const limitCharacters = (text, limit = 6) => {
        if (!text) return "";
        return text.length > limit ? text.slice(0, limit) + "..." : text;
    };
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };
    const handleChange = (e) => {
        const { value } = e.target;
        searchKeyword.current = value;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const frm = document.getElementById('frm');
        frm.reset();
        if (inputRef.current) {
            inputRef.current.blur();
        }
        try {
            let data = {};
            if (token == null) {
                data = {
                    user_id: 0,
                    keyword: searchKeyword.current
                };
            } else {
                const { user_id } = jwtDecode(token);
                data = {
                    user_id: user_id,
                    keyword: searchKeyword.current
                };
            }
            await axios.post(`${DOMAIN}/api/search/add-search-by-keyword`, data);
            navigate(`/search/${searchKeyword.current}`);
        } catch (error) {
            console.log('error', error)
        }
        handleBlur()
        setIsPopoverOpen(false)
    };
    const fetchData = async (token) => {
        try {
            const { user_id } = jwtDecode(token);
            const res1 = await axios.get(`${DOMAIN}/api/carts/get-amount-item-of-cart-by-user-id/${user_id}`);
            setAmount(res1.data)

            const res2 = await axios.get(`${DOMAIN}/api/users/get-user-by-user-id/${user_id}`);
            setUserInfo(res2.data);

            const cartResponse = await axios.get(`${DOMAIN}/api/carts/get-cart-by-userid/${user_id}`);
            setCartArray(cartResponse.data)
        } catch (error) {
            console.error('Error fetching products:', error);
            setToken(null)
        }
    };
    const fetchCategories = async () => {
        try {
            const results = await Promise.all(
                categories.map(async (category) => {
                    try {
                        const { data } = await axios.get(
                            `${DOMAIN}/api/products/get-products-by-category/${category.name}`
                        );
                        const random8 = data.sort(() => Math.random() - 0.5).slice(0, 8);
                        return { name: category.name, products: random8 };
                    } catch (err) {
                        console.error(`Error fetching ${category.name}:`, err);
                        return { name: category.name, products: [] };
                    }
                })
            );
            const merged = {};
            for (const { name, products } of results) {
                merged[name] = products;
            }
            setCategoryProducts(merged);
        } catch (err) {
            console.error("Error fetching categories:", err);
        }
    };
    useEffect(() => {
        fetchCategories();
    }, []);
    useEffect(() => {
        if (token == null) {
            setAmount(0);
        } else {
            if (token !== null) {
                fetchData(token);
            }
        }
    }, [amountCart, avatarUrl]);
    const loginContent = getLoginContent(t, navigate);
    const cartContent = getCartContent(cartArray, navigate);
    const notificationsContent = getNotificationsContent(t, navigate);
    const contentLanguage = getContentLanguage(setLanguage, changeLanguage);
    const inputContent = getInputContent(setIsFocused, t, handleBlur, setIsPopoverOpen);
    const handleShopAction = async (mode) => {
        if (!token) {
            notification.warning({
                message: 'Cảnh báo',
                description: 'Bạn cần đăng nhập trước !!',
            });
            setTimeout(() => navigate(`/login`), 1000);
            return;
        }
        const { email } = jwtDecode(token);
        const data = { email };
        const response = await axios.post(`${DOMAIN}/api/shop-name/check-existing-shop`, data);
        if (mode === 'sellerCenter') {
            if (response.data === true) {
                navigate(`/sellercenter/${email}/manageproduct`);
                setCount(0);
            } else {
                notification.warning({
                    message: 'Cảnh báo',
                    description: 'Bạn chưa có shop !!',
                });
                setTimeout(() => navigate(`/becomeseller`), 1000);
            }
        }
        if (mode === 'startSelling') {
            if (response.data === true) {
                notification.info({
                    message: 'Thông báo',
                    description: 'Bạn đã sở hữu shop rồi !!!',
                });
                setTimeout(() => {
                    navigate(`/sellercenter/${email}/manageproduct`);
                    setCount(0);
                }, 1000);
            } else {
                navigate(`/becomeseller`);
            }
        }
    };
    const renderLogin = () => {
        if (token == null) {
            return <>
                <div className="border-end p-1">
                    <NavLink to='/login' style={{ textDecoration: 'none', color: 'white' }}>{t('login')}</NavLink>
                </div>
                <div className=" p-1">
                    <NavLink to='/register' style={{ textDecoration: 'none', color: 'white' }}>{t('signup')}</NavLink>
                </div>

            </>
        }
        return <>
            {userInfo.avatar_url ?
                <img src={userInfo.avatar_url} className='p-1 mx-1' alt="avatar" style={{ width: '2vw', height: '2vw', borderRadius: '50px' }} />
                : <i className="fa-solid fa-user p-1 mx-1" style={{ border: 'solid 1.5px', borderRadius: '50px' }}></i>
            }
            <Popover content={loginContent} placement="bottom">
                <span style={{ fontSize: '0.9vw' }} className={styles.dropdownbutton}>{limitCharacters(userInfo.name) || limitCharacters(userInfo.email)}</span>
            </Popover>
        </>
    }
    const renderManageShop = () => {
        let email
        if (token !== null) {
            email = jwtDecode(token).email;
        }
        if (location.pathname === `/manageshop/${email}`) {
            return <></>
        } else {
            return <div className={`${styles.header}`}>
                <div className={styles.containerHeader} >
                    <div className={`${styles.topHeader}`}>
                        <div className={`${styles.topHeaderLeft}`}>
                            <div className={styles.sellerCenter} onClick={() => handleShopAction('sellerCenter')}>
                                {t('sellercenter')}
                            </div>

                            <div className={styles.startSelling} onClick={() => handleShopAction('startSelling')}>
                                {t('startselling')}
                            </div>
                            <div className={styles.downloadApp} onClick={() => navigate('/downloadapp')}>
                                <Popover content={downloadAppContent}>
                                    <span>{t('download')}</span>
                                    <i className='fa-solid fa-clipboard mx-1' />
                                </Popover>
                            </div>
                            <div className={styles.followUs}>
                                <span className="pe-1">{t('followuson')}</span>
                                <a href='https://www.facebook.com/ShopeeVN'><i className="pe-1 fa-brands fa-facebook text-light" /></a>
                                <a href='https://www.instagram.com/Shopee_VN/'><i className="fa-brands fa-instagram text-light" /></a>
                            </div>
                        </div>
                        <div className={`${styles.topHeaderRight}`}>
                            <div className={`${styles.notifications}`}>
                                <Popover content={notificationsContent}>
                                    <span><i className="pe-1 fa-regular fa-bell" /></span>
                                    {t('notifications')}
                                </Popover>
                            </div>
                            <div className={`${styles.help}`}>
                                <i className="pe-1 fa-solid fa-question" />
                                <NavLink className={styles.helpText} to='/shopeehelp'>{t('help')}</NavLink>
                            </div>
                            <div className={`${styles.language}`}>
                                <Popover content={contentLanguage}>
                                    <span><i className="pe-1 fa-solid fa-earth-americas" /></span>
                                    <span>{language}</span>
                                </Popover>
                            </div>
                        </div>
                    </div>
                    <div className={styles.mainHeader}>
                        <div className={styles.mainHeaderLeft}>
                            <NavLink className={styles.mainHeaderLeftContainer} to='/'>
                                <img className={styles.mainHeaderLeftLogo} style={{ width: '100%' }} src={process.env.PUBLIC_URL + '/asset/images/logoeco.webp'} alt="..."></img>
                            </NavLink>
                        </div>
                        <div className={styles.mainHeaderCenter}>
                            {isFocused && <div className={styles.overlay} onClick={handleBlur}></div>}
                            <form id="frm" className={styles.inputForm}>
                                <Popover
                                    arrow={false}
                                    trigger="click"
                                    content={inputContent}
                                    open={isPopoverOpen}
                                    styles={{
                                        root: {
                                            width: '45%',
                                        },
                                    }}
                                >
                                    <input
                                        ref={inputRef}
                                        className={`${styles.input} form-control w-100`}
                                        style={{ border: 'none', borderRadius: '99px' }}
                                        onChange={handleChange}
                                        onFocus={handleFocus}
                                        onBlur={() => setIsPopoverOpen(false)}
                                    />
                                    {!isFocused && (
                                        <span className={styles.animatedPlaceholder}>
                                            {
                                                "Tìm Kiếm Sản Phẩm Mong Muốn !!!".split("").map((char, index) => (
                                                    <span
                                                        key={index}
                                                        className={styles.char}
                                                        style={{
                                                            animationDelay: `${index * 0.05}s`,
                                                        }}
                                                    >
                                                        {char === " " ? "\u00A0" : char}
                                                    </span>
                                                ))
                                            }
                                        </span>
                                    )}
                                    <div className={`${styles.inputButtonContainer} p-1`}>
                                        <button className={styles.inputButton} onClick={handleSubmit}>
                                            <i className="fa-solid fa-magnifying-glass"></i>
                                        </button>
                                    </div>
                                </Popover>
                            </form>
                            <div className={styles.tagmarquee}>
                                {tags.map((tag, index) => (
                                    <div key={index}
                                        className={`m-2`}
                                        style={{ fontSize: '0.9vw', cursor: 'pointer' }}
                                        onClick={() => {
                                            navigate(`/category/${tag.categoryName}`)
                                        }}
                                    >
                                        {tag.fixName}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={styles.mainHeaderRight}>
                            <div className={styles.loginContainer}>
                                {renderLogin()}
                            </div>
                            <div className={styles.cardContainer} >
                                <Popover
                                    content={cartContent}
                                    placement="bottom"
                                    className={styles.cart} onClick={() => {
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
                                    <div className='mx-2' style={{ fontSize: '0.82vw', minWidth: '3.4vw', textAlign: 'center' }}>{t('cart')}</div>
                                </Popover>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.bottomHeader}>
                    {categories.map((category, index) => {
                        return <div
                            className={styles.dropdown} key={index}
                        >
                            <div
                                onClick={() => navigate(`category/${category.name}`)}
                                onMouseEnter={() => setIsFocused(true)}
                                onMouseLeave={() => setIsFocused(false)}
                                className={styles.dropdownButton}>
                                <span className={styles.tagMain}>{category.label}</span>
                                <span className={styles.tagHover}>{category.label}</span>
                                <div className={styles.iconWrapper}>
                                    <i className="fa-solid fa-angle-down" />
                                </div>
                            </div>
                            {isFocused && (<div
                                onMouseEnter={() => setIsFocused(true)}
                                onMouseLeave={() => setIsFocused(false)}
                                className={styles.dropdownContent}>
                                <div className={styles.topDropdownContent} >
                                    {(categoryProducts[category.name]?.slice(0, 8) || []).map((product, index) => (
                                        <NavLink

                                            to={`/productdetail/${product.product_id}`}
                                            className='card ' key={index}
                                            style={{ textDecoration: 'none', padding: '0', border: 'none', width: '16vw', height: '4.8vw' }}
                                            onClick={() => setIsFocused(false)}
                                        >
                                            <div className='card-body  d-flex align-items-center justify-content-around h-100'>
                                                <img
                                                    style={{ width: '3.5vw', height: '3.5vw' }}
                                                    src={process.env.PUBLIC_URL + product.image}
                                                    alt="icon"
                                                />
                                                <div style={{ fontSize: '0.9vw', fontWeight: '500' }} className="ms-1">{product.name}</div>
                                            </div>
                                        </NavLink>
                                    ))}
                                </div>
                                <hr className='w-75 mx-auto'></hr>
                                <div className='d-flex justify-content-between px-4 mb-3'>
                                    <div style={{ fontWeight: '500' }}>Sản Phẩm Bán Chạy</div>
                                    <NavLink
                                        onClick={() => setIsFocused(false)}
                                        style={{ fontWeight: '500', textDecoration: 'none' }}
                                        to={`/category/${category.name}`}>
                                        <span>Xem Tất Cả</span>
                                        <i className="fa-solid fa-angles-right mx-1" />
                                    </NavLink>
                                </div>
                                <div className='row px-4 align-items-center justify-content-around'>
                                    {(categoryProducts[category.name]?.slice(1, 7) || []).map((product, index) => (
                                        <NavLink
                                            onClick={() => setIsFocused(false)}
                                            to={`/productdetail/${product.product_id}`}
                                            className='col-2 ' key={index}
                                            style={{ textDecoration: 'none', border: 'none', width: '9vw', height: '9vw' }}
                                        >
                                            <div style={{ border: 'none', width: '9vw', height: '9vw' }} className="card border-none">
                                                <div className='w-100 h-100 card-body d-flex align-items-center justify-content-center'>
                                                    <img
                                                        style={{ width: '100%', height: '100%' }}
                                                        src={process.env.PUBLIC_URL + product.image}
                                                        alt="icon"
                                                    />
                                                </div>
                                            </div>
                                            <div style={{ fontSize: '0.9vw', fontWeight: '500', color: 'black', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} className="ms-1">{product.description}</div>
                                            <div style={{ fontSize: '0.9vw', fontWeight: '500', color: '#246adf' }} className="ms-1">{product.price.toLocaleString('vi-VN')}đ</div>
                                            <div style={{ fontSize: '0.75vw', fontWeight: '500', color: '#7c8896', textDecoration: 'line-through' }} className="ms-1">299.000đ</div>
                                        </NavLink>
                                    ))}
                                </div>
                            </div>)}
                        </div>
                    })}
                </div>
                <div className={`${styles.overlay}`} />
            </div>
        }
    }
    return <>
        {renderManageShop()}
    </>
};

export default Header;