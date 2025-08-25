import { NavLink, Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next';


const AccountUser = () => {
    const { t } = useTranslation();
    return <>
        <div className='row container-fluid text-center'>
            <div className='col-2 text-start pt-5' style={{ borderRight: "3px solid #28a745", backgroundColor: "#f8f9fa" }}>
                <NavLink className="nav-link mb-3" to="/accountuser/infouser"><i style={{ color: '#0d6efd' }} className="fas fa-user me-2"></i>{t('myaccount')}</NavLink>
                <NavLink className="nav-link mb-3" to="/accountuser/purchaseorder"><i style={{ color: '#0d6efd' }} className="fa-solid fa-file-invoice me-2"></i>{t('mypurchase')}</NavLink>
                <NavLink className="nav-link mb-3" to="/accountuser/myvoucher"><i style={{color:'#0d6efd'}} className="fa-solid fa-warehouse me-2" />{t('voucherwarehouse')}</NavLink>
                <NavLink className="nav-link mb-3" to="/accountuser/changepassword"><i style={{ color: '#0d6efd' }} className="fa-solid fa-key me-2"></i>{t('changepassword')}</NavLink>
                <NavLink className="nav-link mb-3" to="/accountuser/notificationsetting"><i style={{ color: '#0d6efd' }} className="fa-solid fa-bell me-2"></i>{t('notificationsetting')}</NavLink>
                <NavLink className="nav-link mb-3" to="/accountuser/bankuser"> <i style={{ color: '#0d6efd' }} className="fa-solid fa-money-check-dollar me-2"/>{t('bank')}</NavLink>
                <NavLink className="nav-link" to="/accountuser/shopeecoin"><i style={{ color: '#0d6efd' }} className="fa-solid fa-coins me-2"></i>{t('shopeecoin')}</NavLink>
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