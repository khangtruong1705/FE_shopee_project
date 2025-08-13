import {  useEffect } from 'react'
import styles from './MyVoucher.module.css';
import { vouchers } from './MyVoucherRawData';


const MyVoucher = () => {
   
    const fetchData = async () => {
        try {


        } catch (error) {


        }
    };
   
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
                        <input placeholder='Nhập Mã Voucher Tại Đây' className='mx-2 py-2' style={{width:'30vw',borderRadius:'0.5rem',border:'none'}}></input>
                        <button  style={{color:'white',border:'none',background:'#1250dc'}}
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