import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import styles from './Header.module.css'
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useSelector } from 'react-redux';
import { DOMAIN } from '../../util/config';
import { notification } from 'antd';



const Header = () => {
    const baseWidth = 1920;
    const scaleRatio = window.innerWidth / baseWidth;
    const navigate = useNavigate();
    const searchKeyword = useRef();
    const location = useLocation();
    const token = localStorage.getItem('token');
    const [amount, setAmount] = useState(0);
    const amountCart = useSelector((state) => state.getAmountCart.amountCart);
    const [userInfo, setUserInfo] = useState({});
    const limitCharacters = (text, limit = 6) => {
        if (!text) return "";
        return text.length > limit ? text.slice(0, limit) + "..." : text;
    };
    const fetchData = async (token) => {
        try {
            const { user_id } = jwtDecode(token);
            const response = await axios.get(`${DOMAIN}/api/carts/get-amount-item-of-cart-by-user-id/${user_id}`);
            setAmount(response.data)


            const res = await axios.get(`${DOMAIN}/api/users/get-user-by-user-id/${user_id}`);
            setUserInfo(res.data); // Gán dữ liệu 

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
    }, [amountCart])

    const tags = [
        'Sáp Vuốt Tóc', 'Nước Hoa Nam', 'Dép đế trấu', 'Zara Nam', 'Sức Khỏe',
        'Thời trang Nam', 'Thời trang nữ', 'Máy Ảnh', 'Xe máy', 'Làm đẹp'];
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
                    <div className={styles.carttext}>Giỏ Hàng</div>
                </div>
            </>
        }else if(location.pathname === '/payments'){
            return <>
                <div className={`${styles.logocolor2}`}>
                    <NavLink to='/'>
                        <img className={styles.shopeeimage2} src={process.env.PUBLIC_URL + '/asset/images/shopeelogo.png'} />
                    </NavLink>
                        <div className={styles.carttext}>Thanh Toán</div>
                </div>
            </>
        } else {
            return <div className='w-75 mx-auto'>
                <div className={`${styles.search} mx-auto `}  >
                    <div className="text-align-center">
                        <NavLink className='d-flex' to='/' style={{ textDecoration: 'none' }}  >
                            <i className={`${styles.shopeeimageicon} fa-solid fa-basket-shopping me-2`}/>
                            <span className={styles.shopeeimagetext}>Shopee</span>
                        </NavLink>
                    </div>
                    <div className='' style={{ width: '53vw'}}>
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
                            <i className={`fa-solid fa-cart-shopping my-auto ${styles.carticon}`}  />
                            <div className= {`rounded-circle ${styles.cartamount}`}>{amount}</div>
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
                    <NavLink to='/register'>Đăng ký</NavLink>
                </div>
                <div className="border-start p-1">
                    <NavLink to='/login'>Đăng Nhập</NavLink>
                </div>
            </>
        }
        return <>
            <i className="fa-solid fa-user p-1 mx-1" style={{ border: 'solid 1.5px', borderRadius: '50px' }}></i>
            <div className={styles.dropdown}>
                <span className={styles.dropdownbutton}>{limitCharacters(userInfo.name) || limitCharacters(userInfo.email)}</span>
                <div className={styles.dropdowncontent}>
                    <div>
                        <NavLink to='/accountuser/infouser' style={{ textDecoration: 'none', color: 'black' }}>Tài Khoản Của Tôi</NavLink>
                    </div>
                    <div>
                        <NavLink to='/accountuser/purchaseorder' style={{ textDecoration: 'none', color: 'black' }} >Đơn Mua</NavLink>
                    </div>
                    <div >
                        <span style={{ cursor: 'pointer' }} onClick={() => {
                            localStorage.removeItem("token");
                            navigate(`/`)
                            window.location.reload()
                        }}>Đăng Xuất</span>

                    </div>
                </div>
            </div>
        </>
    }
    return <>
        <div className={`${styles.header} container-fluid p-0`}>
            <div className={`${styles.navigate} mx-auto`}>
                <div className={`${styles.navigateLeftItem} left`}>
                    <div className="border-end p-1">Kênh người bán</div>
                    <div className="border-end p-1">Trở thành người bán</div>
                    <div className="border-end p-1" >Tải ứng dụng</div>
                    <div className="p-1">
                        <span className="pe-1">Kết nối</span>
                        <a href='https://www.facebook.com/ShopeeVN'><i className="pe-1 fa-brands fa-facebook text-light" /></a>
                        <a href='https://www.instagram.com/Shopee_VN/'><i className="fa-brands fa-instagram text-light" /></a>
                    </div>
                </div>
                <div className={`${styles.navigateRightItem} right`}>
                    <div className={`${styles.notificationwrapper} p-1`}>

                        <div className={styles.dropdown}>
                            <span className={`${styles.dropdownbutton}`}>
                                <span><i className="pe-1 fa-regular fa-bell" /></span>
                                Thông báo
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
                                    >Xem Tất Cả</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-start p-1">
                        <span><i className="pe-1 fa-solid fa-question" /></span>
                        <NavLink to='/shopeehelp' style={{ textDecoration: 'none', color: 'white' }}>Hỗ trợ</NavLink>
                    </div>
                    <div className="border-start p-1">
                        <span><i className="pe-1 fa-solid fa-earth-americas" /></span>
                        <span>Tiếng Việt</span>
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