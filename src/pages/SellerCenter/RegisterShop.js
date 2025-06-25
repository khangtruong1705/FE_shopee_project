import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import axios from 'axios';
import { DOMAIN } from "../../util/config";
import { Button, Form, Input,message} from 'antd';
import styles from './SellerCenter.module.css'
import { useTranslation } from 'react-i18next';
import { jwtDecode } from 'jwt-decode';




const RegisterShop = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token');
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const decoded = jwtDecode(token);
    const { email } = decoded;
     const [messageApi, contextHolder] = message.useMessage();
    const key = 'updatable';
     const openMessage = (data) => {
        messageApi.open({
            key,
            type: 'loading',
            content: 'Loading...',
        });
        setTimeout(() => {
            messageApi.open({
                key,
                type: data.type,
                content: data.message,
                duration: 2,
            });
        }, 1000);
    };

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
    const onFinish = async (values) => {
        try {
            const newValue = {
                'shop_name': values.shopname,
                'shop_address': values.shopaddress,
                'email_owner': email,
                'phone_owner': values.phone
            }
            let res = await axios.post(`${DOMAIN}/api/shop-name/register-shop`, newValue);

            const data = {
                'message': 'Đăng Ký Shop Thành Công',
                'type': 'success'
            }
            openMessage(data)
            setTimeout(() => {
                navigate('/')
            }, 2000);
        } catch (error) {
            const data = {
                'message': 'Đăng Ký Shop Thất Bại',
                'type': 'error'
            }
            openMessage(data)
        }

    };
    const onReset = () => {
        form.resetFields();
    };
    return <>
        <div style={{ backgroundColor: '#f6f6f6', position: 'relative' }}>
            <div className="header mb-5" style={{ backgroundColor: '#ffffff', }}>
                <div className='d-flex justify-content-between align-items-center w-75 mx-auto'>
                    <div className="d-flex align-items-center justify-content-start w-50">
                        <NavLink to='/' >
                            <img className="w-75" src={process.env.PUBLIC_URL + '/asset/images/shopeelogo.png'} />
                        </NavLink>
                        <span className="w-100" style={{ fontSize: '1.5vw' }}><strong>{t('becomeseller')}</strong></span>
                    </div>

                    <NavLink to='/shopeehelp' style={{ color: '#ee4d2d', textDecoration: 'none' }}>
                        {t('areyouhelp')}
                    </NavLink>
                </div>
            </div>
            <div className="body card w-75 mx-auto" style={{ minHeight: '550px' }}>
                <div className="card-header">
                    <h5 className="mb-4">Thông tin Shop</h5>
                </div>
                <div className="card-body w-75 mt-5">
                    <Form
                        {...layout}
                        form={form}
                        name="control-hooks"
                        onFinish={onFinish}
                        style={{ maxWidth: 1000 }}

                    >
                        <Form.Item name="shopname" label="Shop Name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="shopaddress" label="Shop Address" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="email" label="Email" >
                            {email}
                        </Form.Item>
                        <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            className="d-flex justify-content-end">
                             {contextHolder}
                            <Button
                                style={{ backgroundColor: '#ee4d2d', borderColor: '#fa8c16', color: '#fff' }}
                                htmlType="submit"
                                size="large" >Đăng Ký Shop</Button>
                        </Form.Item>
                    </Form>
                </div>


            </div>
            <div className={styles.sidebar}>
                <i className={`${styles.sidebaricons} fas fa-bell`} />
                <i className={`${styles.sidebaricons} fas fa-headset`} />
                <i className={`${styles.sidebaricons} fas fa-comment-dots`} />
            </div>
            <Footer></Footer>
        </div>
    </>
};


export default RegisterShop