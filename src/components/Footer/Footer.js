import styles from './Footer.module.css'


const Footer = () => {
    return <>
        <hr style={{height:'5px',backgroundColor:'#f6442d'}}></hr>
        <div className="footer container">
            <div className={styles.service}>
                <div>
                    <h1 className={styles.title}>Chăm sóc khách hàng</h1>
                    <p>Trung Tâm Trợ Giúp</p>
                    <p>Shopee Blog</p>
                    <p>Shopee Mall</p>
                    <p>Hướng Dẫn Mua Hàng</p>
                    <p>Hướng Dẫn Bán Hàng</p>
                    <p>Thanh Toán</p>
                    <p>Shopee Xu</p>
                    <p>Vận Chuyển</p>
                    <p>Trả Hàng & Hoàn Tiền</p>
                    <p>Chăm Sóc Khách Hàng</p>
                    <p>Chính Sách Bảo Hành</p>
                </div>
                <div>
                    <h1 className={styles.title}>VỀ SHOPPE</h1>
                    <p>Giới Thiệu Về Shopee Việt Nam</p>
                    <p>Tuyển Dụng</p>
                    <p>Điều Khoản Shopee</p>
                    <p>Chính Sách Bảo Mật</p>
                    <p>Chính Hãng</p>
                    <p>Kênh Người Bán</p>
                    <p>Flash Sales</p>
                    <p>Chương Trình Tiếp Thị Liên Kết Shopee</p>
                    <p>Liên Hệ Với Truyền Thông</p>
                </div>
                <div>
                    <h1 className={styles.title}>THANH TOÁN</h1>
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
                    <hr></hr>
                    <h1 className={styles.title}>ĐƠN VỊ VẬN CHUYỂN</h1>
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
                <div>
                    <h1 className={styles.title}>THEO DÕI CHÚNG TÔI</h1>
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
                <div>
                    <h1 className={styles.title}>TẢI ỨNG DỤNG SHOPPE</h1>
                    <div className={styles.downloadapp}>
                        <div className={styles.downloadappitem1}></div>
                        <div className={styles.downloadappitem2}></div>
                        <div className={styles.downloadappitem3}></div>
                        <div className={styles.downloadappitem4}></div>
                    </div>
                </div>
            </div>

            <div className="part1 d-flex justify-content-center p-3">
                <div className="p-2 border-end">CHÍNH SÁCH BẢO MẬT</div>
                <div className="p-2 border-end">QUY CHẾ HOẠT ĐỘNG</div>
                <div className="p-2 border-end">CHÍNH SÁCH VẬN CHUYỂN</div>
                <div className="p-2">CHÍNH SÁCH TRẢ HÀNG VÀ HOÀN TIỀN</div>
            </div>
            <div className="part2">
            </div>
            <div className="part3 text-center">
                Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Thành phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn
            </div>
            <div className="part3 text-center">
                Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Bùi Anh Tuấn
            </div>
            <div className="part3 text-center">
                Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015
            </div>
            <div className="part3 text-center">
                © 2015 - Bản quyền thuộc về Công ty TNHH Shopee
            </div>
        </div>

    </>
};

export default Footer;