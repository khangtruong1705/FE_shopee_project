import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss'

export const categoriesData = [
    { label: 'mensfashion', name: 'thoitrangnam' },
    { label: 'health', name: 'suckhoe' },
    { label: 'mon&baby', name: 'mevabe' },
    { label: 'beauty', name: 'sacdep' },
    { label: 'phone', name: 'dienthoai' },
    { label: 'electronics', name: 'thietbidiengiadung' },
    { label: 'womensfashion', name: 'thoitrangnu' }
];

export const tagsData = [
    { categoryName: 'nhasachonline', fixName: 'bookshop' },
    { categoryName: 'bachhoaonline', fixName: 'grocery' },
    { categoryName: 'thethaodulich', fixName: 'travel' },
    { categoryName: 'dongho', fixName: 'watch' },
    { categoryName: 'maytinhvalaptop', fixName: 'Laptop' },
    { categoryName: 'giaydepnam', fixName: 'menshoe' },
    { categoryName: 'phukientrangsucnu', fixName: 'accessories' },
    { categoryName: 'mayanh', fixName: 'camera' },
    { categoryName: 'giaydepnu', fixName: 'womenshoe' }
]

export const downloadAppContent = () => (
    <div className={styles.downloadAppContent}>
        <img className='w-100' src={process.env.PUBLIC_URL + '/asset/images/qrcode.webp'}></img>
    </div>
)

export const getNotificationsContent = (t, navigate) => (
    <div>
        <div className='card'
            style={{ width: '100%', height: '6vw', borderRadius: '0.7vw' }}>
            <div className='card-body'>
                <p style={{ fontSize: '1.1vw', fontWeight: '500', color: '#1250dc' }}>🎉 Voucher đầy ví chần chừ gì nữa!</p>
                <p>Voucher điện tử giảm đến 2 triệu.💗Voucher thời trang giảm 100k</p>
            </div>
        </div>
        <hr />
        <div className='card'
            style={{ width: '100%', height: '6vw', borderRadius: '0.7vw' }}>
            <div className='card-body'>
                <p style={{ fontSize: '1.1vw', fontWeight: '500', color: '#1250dc' }}>💖 21H LÊN SÓNG LIVE SĂN DEAL 50%</p>
                <p>Deal giảm sốc, quà tặng hấp dẫn cho Bạn</p>
            </div>
        </div>
        <hr />
        <div className='card'
            style={{ width: '100%', height: '6vw', borderRadius: '0.7vw' }}>
            <div className='card-body'>
                <p style={{ fontSize: '1.1vw', fontWeight: '500', color: '#1250dc' }}>🎁 ƯU ĐÃI SHOPEEPAY</p>
                <p>Nhận ngay 45k khi kích hoạt ShopeePay trước 20/05/2025</p>
            </div>
        </div>
        <hr />
        <div>
            <button
                className='p-2 h-100 w-100'
                style={{ border: 'none', background: '#1250dc', color: 'white', borderRadius: '99px' }}
                onClick={() => navigate('/notification')}
            >
                {t('viewall')}
            </button>
        </div>
    </div>
);

export const getContentLanguage = (setLanguage, changeLanguage) => (
    <div>
        <div>
            <span
                style={{ cursor: 'pointer' }}
                onClick={() => {
                    setLanguage('English');
                    changeLanguage('en');
                }}
            >
                English
            </span>
        </div>
        <div>
            <span
                style={{ cursor: 'pointer' }}
                onClick={() => {
                    setLanguage('Tiếng Việt');
                    changeLanguage('vi');
                }}
            >
                Tiếng Việt
            </span>
        </div>
    </div>
);

export const getLoginContent = (t, navigate) => (
    <div>
        <div>
            <NavLink to='/accountuser/infouser' style={{ textDecoration: 'none', color: 'black' }}>
                {t('myaccount')}
            </NavLink>
        </div>
        <div>
            <NavLink to='/accountuser/purchaseorder' style={{ textDecoration: 'none', color: 'black' }}>
                {t('mypurchase')}
            </NavLink>
        </div>
        <div>
            <span style={{ cursor: 'pointer' }} onClick={() => {
                localStorage.removeItem("token");
                navigate(`/`);
                window.location.reload();
            }}>
                {t('logout')}
            </span>
        </div>
    </div>
);

export const getInputContent = (setIsFocused,t,handleBlur,setIsPopoverOpen) => (
    <div className='w-100'>
        <p style={{ fontSize: '1.1vw', fontWeight: '500' }}>Tra cứu hàng đầu</p>
        {tagsData.map((item, index) => (
            <NavLink
            
                to={`/category/${item.categoryName}`}
                onClick={()=>{
                    setIsFocused(false)
                    setIsPopoverOpen()
                    handleBlur()
                }}
                key={index}
                className="py-1 px-3 m-3"
                style={{
                    display: 'inline-block',
                    fontSize: '0.9vw',
                    fontWeight: '500',
                    border: '1px solid #dfdfdf',
                    borderRadius: '99px',
                    cursor: 'pointer',
                    textDecoration:'none'
                }}
            >
                {t(item.fixName)}
            </NavLink>
        ))}
    </div>
);
export const getCartContent = (cartArray, navigate) => (
    <div style={{ width: '20vw' }}>
        <div className='p-4'>
            {cartArray.length === 0 ? (
                <div style={{ color: '#1250dc', fontWeight: '500' }}>
                    Giỏ Hàng Chưa Có Sản Phẩm !!!
                </div>
            ) : (
                cartArray.map((item, index) => (
                    <div
                        className='card m-2'
                        key={index}
                        style={{ width: '100%', height: '4vw', borderRadius: '0.7vw' }}
                    >
                        <div
                            className='card-body w-100 h-100 d-flex'
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <div style={{ width: '5%', color: '#1754dd', fontWeight: '500' }}>
                                {index + 1}
                            </div>
                            <div style={{ width: '30%', textAlign: 'center' }}>
                                <img
                                    style={{
                                        width: '60%',
                                        aspectRatio: '1/1',
                                        borderRadius: '0.5vw',
                                        border: '1px solid #e3e3e3',
                                    }}
                                    src={process.env.PUBLIC_URL + item.product_image}
                                    alt={item.product_name}
                                />
                            </div>
                            <div
                                style={{
                                    fontSize: '0.9vw',
                                    width: '45%',
                                    fontWeight: '500',
                                }}
                            >
                                <span
                                    className='w-100'
                                    style={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: 'block',
                                    }}
                                >
                                    {item.product_name}
                                </span>
                                <span
                                    className='w-100'
                                    style={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: 'block',
                                        color: '#1754dd',
                                    }}
                                >
                                    {item.price.toLocaleString('vi-VN')}đ
                                </span>
                            </div>
                            <div style={{ width: '20%', textAlign: 'center' }}>
                                <button
                                    style={{
                                        width: '80%',
                                        fontSize: '0.5vw',
                                        padding: '0.1vw',
                                        background: '#e6f1ff',
                                        color: '#1754dd',
                                        fontWeight: '500',
                                        border: '1px solid #246ade',
                                        borderRadius: '0.5vw',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textAlign: 'center',
                                    }}
                                    onClick={() => navigate('/cart')}
                                >
                                    Mua ngay
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    </div>
);