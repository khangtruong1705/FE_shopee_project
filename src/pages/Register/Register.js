import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import styles from './Register.module.scss'
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
            <div className={`${styles.registerHeader}`}>
                <NavLink to='/' className='d-flex align-items-center'>
                    <img className="w-25" src={process.env.PUBLIC_URL + '/asset/images/logoeco.webp'} />
                </NavLink>
                <NavLink to='/shopeehelp' style={{ color: '#1677ff', textDecoration: 'none' }}>
                    {t('areyouhelp')}
                </NavLink>
            </div>
            <div className={`${styles.registerBody} p-5`}>
                <div>
                    <h1 className="text-white">E-Commerce-Shop</h1>
                    <div className={styles.tagmarquee}>
                        <div className={styles.tagtrack}>
                            <p>Nền tảng thương mại điện tử yêu thích ở Đông Nam Á & Đài Loan</p>
                        </div>
                    </div>
                </div>
                <div className={`${styles.card} card`}>
                    <div className={`${styles.cardHeader} card-header`}>
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
                            <Form.Item
                                label={t('confirmpassword')}
                                name="confirmPassword"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    { required: true, message: 'Please confirm your password!' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The two passwords do not match!'));
                                        },
                                    }),
                                ]}
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