import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import axios from 'axios';
import { DOMAIN } from "../../util/config";
import { Button, message,Form, Input } from 'antd';
import styles from './Login.module.scss'
import { useTranslation } from 'react-i18next';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from "react";



const SetupAccount = () => {
    const token = localStorage.getItem('token')
    const {email} =jwtDecode(token);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const onFinish = async (values) => {
        console.log('Success:', values);
        try {
            const newValue = {
                'email': values.email,
                'password': values.password,
                'name': values.name,
                'phone': values.phone,
                'address': values.address,
            }
            let res = await axios.put(`${DOMAIN}/api/users/update`, newValue);
            console.log('res',res.data)
            const data = {
                'message': t('loginsuccessful'),
                'type': 'success'
            }
            openMessage(data)
            setTimeout(() => {
                navigate('/')
            }, 2000);
        } catch (error) {
            const data = {
                'message': t('loginfailed'),
                'type': 'error'
            }
            openMessage(data)
        }
    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
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
    useEffect(()=>{
        console.log('email',email)
    },
[])
    return <>
        <div>
            <div className={`${styles.loginHeader}`}>
                <NavLink to='/' className='d-flex align-items-center'>
                    <img className="w-25" src={process.env.PUBLIC_URL + '/asset/images/logoeco.png'} />
                </NavLink>
                <NavLink to='/shopeehelp' style={{ color: '#1677ff', textDecoration: 'none' }}>
                    {t('areyouhelp')}
                </NavLink>
            </div>
            <div className={`${styles.loginBody} p-5`}>
                <div className={`${styles.loginBodyLeft}`}>
                    <h1 className="text-white">E-Commerce-Shop</h1>
                    <div className={styles.tagmarquee}>
                        <div className={styles.tagtrack}>
                            <p>Mua sắm thông minh - Giao tận tay, nhanh từng giây !!!</p>
                        </div>
                    </div>
                </div>
                <div className={`${styles.card} card`}>
                    <div className={`${styles.cardHeader} card-header`}>
                        Setup Account
                    </div>
                    <div className="card-body">
                        <Form
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            style={{ maxWidth: 600 }}
                            initialValues={{ email:email }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Please create your email!' }]}
                            >
                                <Input 
                                
                                readOnly />
                            </Form.Item>

                            <Form.Item
                                label={t('name')}
                                name="name"
                                rules={[{ required: true, message: 'Please create your name!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label={t('password')}
                                name="password"
                                rules={[{ required: true, message: 'Please create your password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item
                                label={t('phone')}
                                name="phone"
                                rules={[
                                    { required: true, message: 'Please create your phone!' },
                                    { pattern: /^[0-9]+$/, message: 'Phone must be numbers only!' }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label='Địa Chỉ'
                                name="address"
                                rules={[
                                    { required: true, message: 'Please create your phone!' },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item label={null}>
                                {contextHolder}
                                <Button type="primary"
                                    htmlType="submit"
                                >
                                    {t('submit')}
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <hr></hr>
                    <div className="mt-3 text-center">
                        {t('youknowshopee')} <NavLink to='/register'>{t('signup')}</NavLink>
                    </div>
                </div>

            </div>

            <Footer></Footer>
        </div>
    </>
};


export default SetupAccount