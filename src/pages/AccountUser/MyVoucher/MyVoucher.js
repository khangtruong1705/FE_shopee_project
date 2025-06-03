import { useState, useEffect } from 'react'
import { Switch } from 'antd';
import styles from './MyVoucher.module.css';



const MyVoucher = () => {
   
    const fetchData = async () => {
        try {


        } catch (error) {


        }
    };
    const vouchers = [
        {
            logo: 'VOUCHER XTRA',
            category: 'Toàn Ngành Hàng',
            discount: 'Giảm 15% Giảm tối đa ₫100k',
            condition: 'Đơn Tối Thiểu ₫120k',
            time: 'Hiệu lực sau: 2 ngày',
            used: '×5',
            button: 'Dùng Sau',
        },
        {
            logo: 'VOUCHER XTRA',
            category: 'Thời Trang',
            discount: 'Giảm 12% Giảm tối đa ₫25k',
            condition: 'Đơn Tối Thiểu ₫99k',
            time: 'Hiệu lực sau: 2 ngày',
            used: '×3',
            button: 'Dùng Sau',
        },
        {
            logo: 'SHOPEE',
            category: 'SHOPEE',
            discount: 'Giảm 15% Giảm tối đa ₫150k',
            condition: 'Đơn Tối Thiểu ₫750k',
            time: 'Hiệu lực sau: 1 ngày',
            used: '×2',
            button: 'Dùng Sau',
        },
        {
            logo: 'SHOPEE',
            category: 'SHOPEE',
            discount: 'Giảm 8% Giảm tối đa ₫200k',
            condition: 'Đơn Tối Thiểu ₫200k',
            time: 'Hiệu lực sau: 7 giờ',
            used: '×3',
            button: 'Dùng Sau',
        },
        {
            logo: 'VOUCHER XTRA',
            category: 'Toàn Ngành Hàng',
            discount: 'Giảm 12% Giảm tối đa ₫150k',
            condition: 'Đơn Tối Thiểu ₫500k',
            time: 'Hiệu lực sau: 2 ngày',
            used: '×5',
            button: 'Dùng Sau',
        },
        {
            logo: 'SHOPEE',
            category: 'SHOPEE',
            discount: 'Giảm 15% Giảm tối đa ₫150k',
            condition: 'Đơn Tối Thiểu ₫200k',
            time: 'Hiệu lực sau: 7 giờ',
            used: '×5',
            button: 'Dùng Sau',
        },
        {
            logo: 'VOUCHER XTRA',
            category: 'Thời Trang',
            discount: 'Giảm 15% Giảm tối đa ₫50k',
            condition: 'Đơn Tối Thiểu ₫250k',
            time: 'Hiệu lực sau: 2 ngày',
            used: '×3',
            button: 'Dùng Sau',
        },
        {
            logo: 'Thời Trang',
            category: 'Thời Trang',
            discount: 'Giảm 12% Giảm tối đa ₫40k',
            condition: 'Đơn Tối Thiểu ₫250k',
            time: 'Hiệu lực sau: 2 ngày',
            used: '×3',
            button: 'Dùng Sau',
        },
        {
            logo: 'Thời Trang',
            category: 'Thời Trang',
            discount: 'Giảm 10% Giảm tối đa ₫20k',
            condition: 'Đơn Tối Thiểu ₫99k',
            time: 'Hiệu lực sau: 2 ngày',
            used: '×3',
            button: 'Dùng Sau',
        },
        {
            logo: 'SHOPEE',
            category: 'SHOPEE',
            discount: 'Giảm 6% Giảm tối đa ₫100k',
            condition: 'Đơn Tối Thiểu ₫100k',
            time: 'Hiệu lực sau: 2 ngày',
            used: '×10',
            button: 'Dùng Ngay',
        },
    ];
    useEffect(() => {
        fetchData()
    }, [])
    return <>
        <div className="container p-5">
            <div className="card mx-auto" style={{ width: '70vw' }}>
                <div className="card-body ">
                    <div style={{
                        background: "#f7f7f7",
                    }} className='d-flex justify-content-center p-3 align-items-center' >
                        <div className='mx-2'>Mã Voucher</div>
                        <input placeholder='Nhập Mã Voucher Tại Đây' className='mx-2 py-2' style={{width:'30vw'}}></input>
                        <button  style={{color:'white',border:'none',background:'#8e8d8d'}}
                        className='mx-2 px-4 py-2'>Lưu</button>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
                        {vouchers.map((v, index) => (
                            <div key={index} className={styles.voucherCard} style={{ width: '31vw' }}>
                                <div className={styles.voucherLeft}>
                                    <div className={styles.voucherLogo}>
                                        <strong>{v.logo.includes('XTRA') ? (
                                            <>
                                                VOUCHER<br /><span>XTRA</span>
                                            </>
                                        ) : v.logo}
                                        </strong>
                                    </div>
                                    <div className={styles.voucherCategory}>{v.category}</div>
                                </div>
                                <div className={styles.voucherContent}>
                                    <div className={styles.voucherTitle}>{v.discount}</div>
                                    <div className={styles.voucherSubtitle}>{v.condition}</div>
                                    <div className={styles.voucherInfo}>
                                        <span>🕒 {v.time}</span>
                                        <a href="#" className={styles.voucherCondition}>Điều Kiện</a>
                                    </div>
                                </div>
                                <div className={styles.voucherRight}>
                                    <div className={styles.voucherUsed}>{v.used}</div>
                                    <button className={styles.voucherBtn}>{v.button}</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </>
}
    ;
export default MyVoucher