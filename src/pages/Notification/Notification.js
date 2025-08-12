import { NavLink } from 'react-router-dom';
import styles from './Notification.module.scss'
import { Button } from 'antd';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import Marquee from 'react-fast-marquee';
import { items, vouchers, stats } from './NotificationRawData';



const Notification = () => {
    const { ref, inView } = useInView({ triggerOnce: true });
    const StatItem = ({ end, suffix, label, inView, duration }) => {
        return (
            <div className="text-center">
                <div style={{ fontSize: '3vw', fontWeight: '700', color: '#1250dc' }}>
                    {inView ? (
                        <CountUp end={end} duration={duration} separator="." suffix={suffix} />
                    ) : (
                        '0'
                    )}
                </div>
                <div style={{ fontSize: '1.2vw', fontWeight: '500', color: '#515263' }}>
                    {label}
                </div>
            </div>
        );
    };
    return <>
        <div className='' style={{ color: '#ffffff' }}>
            <div className={styles.header}>
                <div className='d-flex align-items-center'>
                    <NavLink to='/'><img className={styles.shopeelogo} src={process.env.PUBLIC_URL + '/asset/images/logoeco.png'} /></NavLink>
                    <div style={{ color: '#2469df', fontWeight: '500', fontSize: '1.2vw' }}>Kho lưu trữ thông báo</div>
                </div>
                <NavLink to='/shopeepolicy/generalinfo' style={{ color: '#2469df', fontWeight: '500', fontSize: '1.2vw', textDecoration: 'none' }}>
                    Shop Policies
                </NavLink>
            </div>
            <div className={styles.shopeewelcome}>
                <p className={styles.child}>Xin chào,Đây là kho lưu trữ thông báo của bạn?</p>
            </div>
            <div className='w-75 mx-auto mt-2' >
                <div style={{ color: 'black', textAlign: 'center' }}>
                    <p style={{ fontSize: '4vw', fontWeight: '700' }}>Những con số ấn tượng</p>
                    <p style={{ color: '#4a5673', fontSize: '1.5vw' }}>Tự hào về số lượng khách hàng và sự hài lòng của khách hàng đã phục vụ tính đến hiện tại</p>
                </div>

                <div
                    ref={ref}
                    style={{
                        background: '#f6f7f9',
                        border: 'none',
                        display: 'flex',
                        borderRadius: '0.7rem',
                    }}
                    className="card p-4"
                >
                    <div className="card-body d-flex justify-content-around">
                        {stats.map((stat, index) => (
                            <StatItem
                                key={index}
                                end={stat.end}
                                suffix={stat.suffix}
                                label={stat.label}
                                inView={inView}
                                duration={stat.duration}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className='w-75 mx-auto'>
                <div style={{ color: 'black', textAlign: 'center' }}>
                    <p style={{ fontSize: '4vw', fontWeight: '700' }}>Khác nói, Shop lắng nghe</p>
                    <p style={{ color: '#4a5673', fontSize: '1.5vw' }}>Lắng nghe những lời chia sẻ và góp ý của những vị khách đã trải nghiệm ứng dụng của Shop</p>
                </div>
                <Marquee speed={50} pauseOnHover={true} gradient={false}>
                    {items.map((item, index) => (
                        <div

                            className='card'
                            key={index}
                            style={{
                                background: '#f6f7f9',
                                border: 'none',
                                borderRadius: 12,
                                padding: 20,
                                margin: '0 10px',
                                width: '25vw',
                                height: '22vw',
                                textAlign: 'center'
                            }}
                        >
                            <div className='card-body' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <p style={{ color: '#54596c', fontSize: '1.2vw' }}>"{item.text}"</p>
                                <div style={{ marginTop: 10 }}>
                                    <strong>{item.name}</strong>
                                    <div>
                                        <img style={{ width: '4vw', height: '4vw' }} src={process.env.PUBLIC_URL + `${item.avatar}`}></img>
                                        <div>{item.city}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Marquee>
            </div>

            <div className='card w-75  mx-auto mt-5' >
                {vouchers.map((voucher, index) => (
                    <div key={index}>
                        <div className="d-flex align-items-center p-2">
                            <div className="w-25 text-center">
                                <img
                                    className="w-50 h-50"
                                    src={process.env.PUBLIC_URL + "/asset/images/notification/gift.jpg"}
                                    alt="Voucher"
                                />
                            </div>
                            <div className="w-100 voucher-text">
                                <h4 style={{ color: '#1250dc' }}>{voucher.title}</h4>
                                <p style={{ color: '#54586c' }}>{voucher.description}</p>
                                <small>{voucher.time}</small>
                            </div>
                            <Button style={{ borderColor: '#1890ff', color: '#1890ff' }}>Xem Chi Tiết</Button>
                        </div>
                        {index < vouchers.length - 1 && <hr />}
                    </div>
                ))}
            </div>


        </div>
    </>

}


export default Notification