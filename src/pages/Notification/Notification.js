import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Notification.module.css'
import { Button } from 'antd';
const Notification = () => {

    return <>
        <div className=''>
            <div className={styles.header}>
                <div className='d-flex align-items-center'>
                    <NavLink to='/'><img className={styles.shopeelogo} src={process.env.PUBLIC_URL + '/asset/images/shopeelogo.png'} /></NavLink>
                    <div>Kho lưu trữ thông báo</div>
                </div>
                <NavLink to='/shopeepolicy/generalinfo' style={{ color: 'black', textDecoration: 'none' }}>
                    Shopee Policies
                </NavLink>
            </div>
            <div className={styles.shopeewelcome}>
                <p className={styles.child}>Xin chào,Đây là kho lưu trữ thông báo của bạn?</p>
            </div>
            <div className='card container mt-5' >
                <div className="d-flex align-items-center">
                    <div className="w-25 text-center">
                        <img className='w-50 h-50' src={process.env.PUBLIC_URL + '/asset/images/notification/gift.jpg'} />
                    </div>
                    <div className="w-100 voucher-text">
                        <h4>MÃ SHOPEE CHOICE VỀ VÍ</h4>
                        <p>🎉 Bạn đã nhận voucher giảm đến 40K khi mua hàng tại Shopee Choice!
                            Hiệu lực từ ngày: 17-05-2025 👉 Bấm để xem Shopee Choice!
                        </p>
                        <small>17:40 16-05-2025</small>
                    </div>
                    <Button danger>
                        Xem Chi Tiết
                    </Button>
                </div>
                <hr></hr>
                <div className="d-flex align-items-center">
                    <div className="w-25 text-center">
                        <img className='w-50 h-50' src={process.env.PUBLIC_URL + '/asset/images/notification/gift.jpg'} />
                    </div>
                    <div className="w-100 voucher-text">
                        <h4>🎁 Voucher giảm ngay 10K dành riêng bạn!</h4>
                        <p>🤩 Giảm đến 10K cho đơn 0Đ!
                            ⏰ Mã hết hạn vào 21-05-2025. Dùng ngay!
                            🛒 Dùng ngay thôi!
                        </p>
                        <small>15:09 16-05-2025</small>
                    </div>
                    <Button danger>
                        Xem Chi Tiết
                    </Button>
                </div>
                <hr></hr>
                <div className="d-flex align-items-center">
                    <div className="w-25 text-center">
                        <img className='w-50 h-50' src={process.env.PUBLIC_URL + '/asset/images/notification/gift.jpg'} />
                    </div>
                    <div className="w-100 voucher-text">
                        <h4>Voucher đầy ví chẳng ngại chốt đơn!</h4>
                        <p>💛Voucher Điện tử giảm đến 2 Triệu
                            🧡Voucher Tiêu dùng giảm đến 250.000Đ
                            💚Voucher Thời trang giảm đến 100.000Đ
                            💙Giảm giá ngập tràn - Deal sale đầy sàn!
                        </p>
                        <small>21:05 15-05-2025</small>
                    </div>
                    <Button danger>
                        Xem Chi Tiết
                    </Button>
                </div>
                <hr></hr>
                <div className="d-flex align-items-center">
                    <div className="w-25 text-center">
                        <img className='w-50 h-50' src={process.env.PUBLIC_URL + '/asset/images/notification/gift.jpg'} />
                    </div>
                    <div className="w-100 voucher-text">
                        <h4>21H LÊN SÓNG LIVE SĂN DEAL 50%</h4>
                        <p>💙Cùng rất nhiều deal giảm đến 50%
                            🧡Mã giảm 40K, 25K, 20K,...nạp đầy lần cuối
                            💖
                        </p>
                        <small>20:46 15-05-2025</small>
                    </div>
                    <Button danger>
                        Xem Chi Tiết
                    </Button>
                </div>
                <hr></hr>
                 <div className="d-flex align-items-center">
                    <div className="w-25 text-center">
                        <img className='w-50 h-50' src={process.env.PUBLIC_URL + '/asset/images/notification/gift.jpg'} />
                    </div>
                    <div className="w-100 voucher-text">
                        <h4>ƯU ĐÃI ĐẾN 45K KHI KÍCH HOẠT SHOPEEPAY 😱</h4>
                        <p>⏰ ƯU ĐÃI 45K sẽ hết hạn vào 20-05-2025 đó 😱! Áp dụng cho đơn hàng đầu tiên thanh toán bằng ShopeePay.
                        </p>
                        <small>18:03 15-05-2025</small>
                    </div>
                    <Button danger>
                        Xem Chi Tiết
                    </Button>
                </div>
            </div>


        </div>
    </>

}


export default Notification