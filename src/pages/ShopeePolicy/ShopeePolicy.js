import styles from './ShopeePolicy.module.css'
import {NavLink, Outlet} from 'react-router-dom'
const ShopeePolicy = () => {

    return <>
        <div className=''>
            <div className={styles.header}>
                <div className='d-flex align-items-center'>
                  <NavLink to='/'><img alt='...' className={styles.shopeelogo} src={process.env.PUBLIC_URL + '/asset/images/shopeelogo.png'} /></NavLink>  
                    <div>Trung tâm sợ giúp Shopee VN</div>
                </div>
                <div>
                    Shopee Policies
                </div>
            </div>
            <div className={styles.shopeewelcome}>
                <p className={styles.child}>Xin chào,Shoppe có thể giúp gì cho bạn?</p>
            </div>
        </div>
        <div className='d-flex justify-content-center '>
            <div className='d-flex flex-column mt-2 p-4' >
                <NavLink to='/shopeepolicy/generalinfo' className='p-2 m-2'>Thông Tin Chung</NavLink>
                <NavLink to='/shopeepolicy/shoppingwithshopee' className='p-2 m-2'>Mua Sắm Cùng Shopee</NavLink>
                <NavLink to='/shopeepolicy/promotion' className='p-2 m-2'>Khuyến Mãi</NavLink>
                <NavLink to='/shopeepolicy/paymethod' className='p-2 m-2'>Phương Thức Thanh Toán</NavLink>
                <NavLink to='/shopeepolicy/transport' className='p-2 m-2'>Vận Chuyển</NavLink>
                <NavLink to='/shopeepolicy/refund' className='p-2 m-2'>Trả Hàng & Hoàn Tiền</NavLink>
            </div>
            <div className='mt-5' style={{width:'3px', height:'300px', backgroundColor: 'green'}} />
            <div className='p-5'  style={{width:'1000px'}}>
            <Outlet></Outlet>
            </div>
        </div>
    </>

}

export default ShopeePolicy