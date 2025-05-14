import { NavLink, Outlet } from 'react-router-dom'



const AccountUser = () => {

    return <>
        <div className='row container-fluid text-center'>
            <div className='col-2 text-start pt-5' style={{ borderRight: "3px solid #28a745", backgroundColor: "#f8f9fa" }}>
                <NavLink className="nav-link mb-3" to="/accountuser/infouser"><i className="fas fa-user me-2"></i>Tài Khoản Của Tôi</NavLink>
                <NavLink className="nav-link mb-3" to="/accountuser/purchaseorder"><i className="fa-solid fa-file-invoice me-2"></i>Đơn Mua</NavLink>
                <NavLink className="nav-link mb-3" to="/accountuser/changepassword"><i className="fa-solid fa-key me-2"></i>Đổi Mật Khẩu</NavLink>
                <NavLink className="nav-link mb-3" to="/accountuser/bankuser"> <i className="fas fa-list-alt me-2"></i>Ngân Hàng</NavLink>
                <NavLink className="nav-link" to="/shopeecoin"><i className="fa-solid fa-coins me-2"></i>Shopee Xu</NavLink>
            </div>
            <div className='col-10'>
                <div className='content container-fluid' style={{ minHeight: '700px' }}>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    </>
}
    ;


export default AccountUser