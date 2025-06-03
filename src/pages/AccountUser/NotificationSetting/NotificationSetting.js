import { useState, useEffect } from 'react'
import { Switch } from 'antd';




const NotificationSetting = () => {
    const onChange = checked => {
        console.log(`switch to ${checked}`);
    };



    const fetchData = async () => {
        try {


        } catch (error) {


        }
    };
    const notificationSettings = [
        {
            title: 'Email thông báo',
            description: 'Thông báo và nhắc nhở quan trọng về tài khoản sẽ không thể bị tắt',
        },
        {
            title: 'Cập nhật đơn hàng',
            description: 'Cập nhật về tình trạng vận chuyển của tất cả các đơn hàng',
        },
        {
            title: 'Khuyến mãi (bằng Email)',
            description: 'Cập nhật về các ưu đãi và khuyến mãi sắp tới',
        },
        {
            title: 'Khảo sát',
            description: 'Đồng ý nhận khảo sát để cho chúng tôi được lắng nghe bạn',
        },
        {
            title: 'Thông báo SMS',
            description: 'Thông báo và nhắc nhở quan trọng về tài khoản sẽ không thể bị tắt',
        },
        {
            title: 'Khuyến mãi (bằng SMS)',
            description: 'Cập nhật về các ưu đãi và khuyến mãi sắp tới',
        },
        {
            title: 'Thông báo Zalo',
            description: 'Thông báo và nhắc nhở quan trọng về tài khoản sẽ không thể bị tắt',
        },
        {
            title: 'Khuyến mãi (Shopee Việt Nam)',
            description: 'Cập nhật về các ưu đãi và khuyến mãi sắp tới',
        },
    ];
    useEffect(() => {
        fetchData()
    }, [])
    return <>
        <div className="container p-5">
            <div className="card mx-auto" style={{ width: '70vw' }}>
                <div className="card-body ">
                    {notificationSettings.map((item, index) => (
                        <div className="d-flex justify-content-between mb-5" key={index}>
                            <div className="text-start">
                                <div style={{fontSize:'1.4vw'}}>{item.title}</div>
                                <div style={{color:'#9fa2b6'}}>{item.description}</div>
                            </div>
                            <Switch
                                defaultChecked
                                onChange={onChange}
                                style={{ transform: 'scale(1.2)',background:'#30b566' }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>
}
    ;
export default NotificationSetting