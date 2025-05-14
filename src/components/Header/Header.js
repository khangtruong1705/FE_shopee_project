import { NavLink, useNavigate, useLocation, Await } from 'react-router-dom';
import styles from './Header.module.css'
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useSelector } from 'react-redux';
import { DOMAIN } from '../../util/config';

const Header = () => {
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
        if (location.pathname === '/cart' || location.pathname === '/payment') {
            return <>
                <div className={`${styles.logocolor}`}>
                    <NavLink to='/'>
                        <img className={styles.shopeeimage} src={process.env.PUBLIC_URL + '/asset/images/shopeelogo.png'} />
                    </NavLink>
                </div>
            </>
        } else {
            return <>
                <div className="p-2 d-flex justify-content-between search align-items-center w-75 mx-auto">
                    <div className="text-align-center">
                        <NavLink to='/' style={{ textDecoration: 'none' }}>
                            <i className="fa-solid fa-basket-shopping p-1 me-2" style={{ color: 'white', fontSize: '3rem' }} />
                            <span style={{ color: 'white', fontSize: '2rem' }}>Shopee</span>
                        </NavLink>
                    </div>
                    <div>
                        <form id='frm' className='d-flex' style={{ backgroundColor: 'white' }}>
                            <label htmlFor="exampleDataList" className="form-label"></label>
                            <input className="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to search..." style={{ border: 'none' }} onChange={handleChange} />
                            <datalist id="datalistOptions">
                                <option value="Giày Nam">
                                </option><option value="Nước Hoa">
                                </option><option value="Áo Khoát">
                                </option><option value="Đồng Hồ">
                                </option><option value="Máy Ảnh">
                                </option>
                            </datalist>
                            <div className='p-1'>
                                <button className='px-4 py-2' style={{ backgroundColor: '#fb5533', border: 'none' }} onClick={handleSubmit}>
                                    <i className="fa-solid fa-magnifying-glass" style={{ color: 'white' }}></i>
                                </button>
                            </div>
                        </form>
                        <div className={styles.tagmarquee}>
                            <div className={styles.tagtrack} style={{ color: 'white' }}>
                                {tags.map((tag, index) => (
                                    <div key={index} className="m-1">
                                        {tag}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="cart">
                        <div style={{ textDecoration: 'none', cursor: 'pointer' }} onClick={() => {
                            if (token === null) {
                                alert("Bạn cần đăng nhập để tiếp tục mua hàng")
                                navigate(`/login`)
                            } else {
                                navigate(`/cart`)
                            }
                        }}>
                            <i className="fa-solid fa-cart-shopping my-auto" style={{ color: 'white', fontSize: '2rem' }} />
                            <span style={{ color: 'white', border: 'solid 2px', borderRadius: '10px', padding: '0px 4px' }}>{amount}</span>
                        </div>
                    </div>
                </div>
            </>
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
            <i className="fa-solid fa-user p-1 mx-1" style={{ border: 'solid', borderRadius: '50px' }}></i>
            <div className={styles.dropdown}>
                <span className={styles.dropdownbutton}>{limitCharacters(userInfo.name)}</span>
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
        <div className="header" style={{ background: 'linear-gradient(to bottom, #f6412d, #fd5e32)' }}>
            <div className={`${styles.navigate} p-2 w-75 mx-auto`}>
                <div className=" d-flex left">
                    <div className="border-end p-1">Kênh người bán</div>
                    <div className="border-end p-1">Trở thành người bán</div>
                    <div className="border-end p-1" >Tải ứng dụng</div>
                    <div className="p-1">
                        <span className="pe-1">Kết nối</span>
                        <a href='https://www.facebook.com/ShopeeVN'><i className="pe-1 fa-brands fa-facebook text-light" /></a>
                        <a href='https://www.instagram.com/Shopee_VN/'><i className="fa-brands fa-instagram text-light" /></a>
                    </div>
                </div>
                <div className="d-flex align-items-center">
                    <div className="p-1">
                        <span><i className="pe-1 fa-regular fa-bell" /></span>
                        <span>Thông báo</span>
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
            <div className=''>
                {renderLogo()}
            </div>
        </div>
    </>
};

export default Header;