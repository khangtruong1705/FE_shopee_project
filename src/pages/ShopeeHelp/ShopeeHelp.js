import { NavLink } from 'react-router-dom';
import styles from './ShopeeHelp.module.css'

const ShopeeHelp = () => {

    return <>
        <div className=''>
            <div className={styles.header}>
                <div  className='d-flex align-items-center'>
                   <NavLink to='/'><img className={styles.shopeelogo} src={process.env.PUBLIC_URL + '/asset/images/shopeelogo.png'}/></NavLink> 
                    <div>Trung tâm sợ giúp Shopee VN</div>
                </div>
                <NavLink to='/shopeepolicy/generalinfo' style={{color:'black', textDecoration:'none'}}>
                    Shopee Policies
                </NavLink>
            </div>
            <div className={styles.shopeewelcome}>
                <p className={styles.child}>Xin chào,Shoppe có thể giúp gì cho bạn?</p>
            </div>

            <div className='body'>
                <div className={`${styles.notify} container`}>
                    [Mua sắm an toàn] Không chia sẻ thông tin cá nhân: mật khẩu đăng nhập, mã OTP và mã PIN ví ShopeePay, ... với bất kỳ ai, kể cả nhân viên Shopee. Nếu tài khoản có dấu hiệu đăng nhập bất thường, hãy liên hệ Bộ Phận Chăm Sóc Khách Hàng Shopee. Tham khảo thêm Mua Sắm An Toàn tại
                </div>
                <div className='container w-75 mt-5'>
                    <h2>Danh mục</h2>
                    <div>
                        <div className={styles.gridcontainer}>
                            <div className={styles.griditem}>
                                <div><i className="fa-solid fa-shop" style={{ color: 'red' }} /></div>
                                <div> Mua Sắm Cùng Shopee</div>
                            </div>
                            <div className={styles.griditem}>
                                <div><i className="fa-solid fa-tag" style={{ color: 'orange' }}></i></div>
                                <div>
                                    Khuyến mãi & Ưu Đãi
                                </div>
                            </div>
                            <div className={styles.griditem}>
                                <div><i className="fa-solid fa-money-check" style={{ color: 'orange' }}></i></div>
                                <div>Thanh Toán</div>
                            </div>
                            <div className={styles.griditem}>
                                <div><i className="fa-solid fa-truck" style={{ color: 'green' }}></i></div>
                                <div>Đơn Hàng & Vận Chuyển</div>
                            </div>
                            <div className={styles.griditem}>
                                <div>
                                    <i className="fa-solid fa-arrow-down-up-across-line " style={{ color: 'orange' }}></i>
                                </div>
                                <div>
                                    Trả Hàng & Hoàn Tiền
                                </div>
                            </div>
                            <div className={styles.griditem}>
                                <div><i className="fa-solid fa-book-open" style={{ color: 'blue' }}></i></div>
                                <div>Thông Tin Chung</div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='container w-75 mt-5'>
                    <h2>Câu hỏi thường gặp</h2>
                    <div>
                        <div className="accordion accordion-flush" id="accordionFlushExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                        [Cảnh báo lừa đảo] Mua sắm an toàn cùng Shopee
                                    </button>
                                </h2>
                                <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">
                                        Lưu ý: Tuyệt đối KHÔNG thực hiện những giao dịch sử dụng các hình thức thanh toán khác ngoài các phương thức thanh toán hiện có trên Shopee (kể cả khi Người bán đề nghị). Shopee sẽ có biện pháp xử lý nếu phát hiện hành vi gian lận hoặc giao dịch ngoài làm ảnh hưởng đến quyền lợi Người dùng trên Shopee.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                        [Thành viên mới] Tại sao tôi không thể đăng ký tạo tài khoản Shopee bằng số điện thoại của mình?
                                    </button>
                                </h2>
                                <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">Nhằm bảo mật thông tin của người dùng và tránh việc lạm dụng hệ thống, Shopee có thể từ chối yêu cầu đăng ký tài khoản bằng số điện thoại hoặc từ chối yêu cầu đổi số điện thoại cho tài khoản của bạn</div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                        [Bảo mật tài khoản] Làm gì khi nhận được thông báo là thông tin tài khoản Shopee đã được thay đổi?
                                    </button>
                                </h2>
                                <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">Trong trường hợp nhận được cảnh báo từ Ứng dụng Shopee hoặc cảnh báo qua email về việc tài khoản Shopee đã được thay đổi một số thông tin quan trọng, bao gồm: Mật khẩu đăng nhập, Số điện thoại liên kết, Địa chỉ email liên kết...</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className={styles.footer}>
                <div>
                    <h3>Bạn có muốn tìm thêm thông tin gì không?</h3>
                </div>
                <div className={styles.contact}>
                    <i className="fa-solid fa-phone mx-2"></i>
                    <span>Liên hệ Shopee</span>
                </div>
            </div>
        </div>
    </>
};


export default ShopeeHelp