import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import styles from './Register.module.css'
import { DOMAIN } from '../../util/config'
import { Button, message, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

const Register = () => {
    const { t } = useTranslation();
    const onFinish = async (values) => {
        const newValues = {
            ...values,
            'name': ''
        }
        try {
            let res = await axios.post(`${DOMAIN}/api/users/register`, newValues);
            console.log('res:', res.data.detail);
            const data = {
                'message': res.data,
                'type': 'success'
            }
            openMessage(data)
            setTimeout(() => {
                navigate('/')
            }, 2000);

        } catch (error) {
            const data = {
                'message': error.response.data,
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
                content: data.message.detail,
                duration: 2,
            });
        }, 1000);
    };
    const navigate = useNavigate();
    return <>
        <div>
            <div className="header">
                <div className='d-flex justify-content-between align-items-center w-75 mx-auto'>
                     <NavLink to='/' className='d-flex align-items-center'>
                        <img className="w-25" src={process.env.PUBLIC_URL + '/asset/images/shopeelogo.png'} />
                    </NavLink>
                    <NavLink to='/shopeehelp' style={{ color: '#ee4d2d', textDecoration: 'none' }}>
                        {t('areyouhelp')}
                    </NavLink>
                </div>
            </div>
            <div className="body p-5 d-flex justify-content-around" style={{ backgroundColor: '#ee4d2d' }}>
                <div>
                    <h1 className="text-white">Shopee</h1>
                    <div className={styles.tagmarquee}>
                        <div className={styles.tagtrack}>
                            <p>Nền tảng thương mại điện tử yêu thích ở Đông Nam Á & Đài Loan</p>
                        </div>
                    </div>
                </div>
                <div className="card w-25 mx-auto ">
                    <div className="card-header text-center">
                        {t('signup')}
                    </div>
                    <div className="card-body">
                        <Form
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            style={{ maxWidth: 600 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label={t('password')}
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item label={null}>
                                {contextHolder}
                                <Button type="primary" htmlType="submit">
                                    {t('submit')}
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <hr></hr>
                    <div className="d-flex justify-content-around">
                        <div className="p-2" style={{ border: '1px solid' }}>
                            <i className="fa-brands fa-facebook mx-1" style={{ color: '#1877f2' }}></i>
                            <span>Facebook</span>
                        </div>
                        <div className="p-2" style={{ border: '1px solid' }}>
                            <i className="fa-brands fa-google mx-1" style={{ color: '#ea4335' }}></i>
                            <span>Google</span>
                        </div>
                    </div>
                    <div className="text-center p-4" style={{ fontSize: '0.82rem' }}>
                        {t('byregistering')} <NavLink to='/policy' style={{ color: '#ee4d2d' }}>{t('termsofservice')}</NavLink> & <NavLink to='/policy' style={{ color: '#ee4d2d' }}>{t('privacypolicy')}</NavLink>
                    </div>
                    <div className="text-center">
                        {t('haveaccount')} <NavLink to='/login'>{t('login')}</NavLink>
                    </div>
                </div>

            </div>
            <Footer></Footer>
        </div>

    </>
};


export default Register