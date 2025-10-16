import styles from './ShopeePolicy.module.scss'
import {NavLink, Outlet} from 'react-router-dom'
const ShopeePolicy = () => {

    return <>
        <div className=''>
            <div className={styles.header}>
                <div className='d-flex align-items-center'>
                  <NavLink to='/'><img alt='...' className={styles.shopeelogo} src={process.env.PUBLIC_URL + '/asset/images/logoeco.webp'} /></NavLink>  
                    <div style={{fontSize:'1.1vw',fontWeight:'500',color:'#1250dc'}}>Trung tâm sợ giúp Shop</div>
                </div>
                <div style={{fontSize:'1.1vw',fontWeight:'500',color:'#1250dc'}}>
                    Shop Policies
                </div>
            </div>
            <div className={styles.shopeewelcome}>
                <p className={styles.child}>Xin chào,Shop có thể giúp gì cho bạn?</p>
            </div>
        </div>
        <div className='d-flex justify-content-center '>
            <div className='d-flex flex-column mt-2 p-4'  >
                <NavLink style={{textDecoration:'none',fontSize:'1.05vw',fontWeight:'500'}} to='/shopeepolicy/generalinfo' className='p-2 m-2'><i className="fa-solid fa-hand-point-right mx-1" />Thông Tin Chung</NavLink>
                <NavLink style={{textDecoration:'none',fontSize:'1.05vw',fontWeight:'500'}} to='/shopeepolicy/shoppingwithshopee' className='p-2 m-2'><i className="fa-solid fa-hand-point-right mx-1" />Mua Sắm Cùng Shopee</NavLink>
                <NavLink style={{textDecoration:'none',fontSize:'1.2vw',fontWeight:'500'}} to='/shopeepolicy/promotion' className='p-2 m-2'><i className="fa-solid fa-hand-point-right mx-1" />Khuyến Mãi</NavLink>
                <NavLink style={{textDecoration:'none',fontSize:'1.05vw',fontWeight:'500'}} to='/shopeepolicy/paymethod' className='p-2 m-2'><i className="fa-solid fa-hand-point-right mx-1" />Phương Thức Thanh Toán</NavLink>
                <NavLink style={{textDecoration:'none',fontSize:'1.05vw',fontWeight:'500'}} to='/shopeepolicy/transport' className='p-2 m-2'><i className="fa-solid fa-hand-point-right mx-1" />Vận Chuyển</NavLink>
                <NavLink style={{textDecoration:'none',fontSize:'1.05vw',fontWeight:'500'}} to='/shopeepolicy/refund' className='p-2 m-2'><i className="fa-solid fa-hand-point-right mx-1" />Trả Hàng & Hoàn Tiền</NavLink>
            </div>
            <div className='mt-5' style={{width:'3px', height:'300px', backgroundColor: 'green'}} />
            <div className='p-5'  style={{width:'1000px'}}>
            <Outlet></Outlet>
            </div>
        </div>
    </>

}

export default ShopeePolicy