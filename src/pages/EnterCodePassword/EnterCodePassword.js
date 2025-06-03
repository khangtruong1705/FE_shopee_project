import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import axios from 'axios';
import { DOMAIN } from "../../util/config";
import { Button, message, Checkbox, Form, Input } from 'antd';
import styles from './ForgotPassword.module.css'
import { useTranslation } from 'react-i18next';

const EnterCodePassword = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        console.log('Success:', values);
        try {
            const newValue = {
                'token': values.token
            }
            let res = await axios.post(`${DOMAIN}/api/users/check-reset-password-token`, newValue);
            if (res.data !== null) {
                const data = {
                    'message': t('validtoken'),
                    'type': 'success'
                }
                openMessage(data)
                setTimeout(() => {
                   navigate(`/resetpassword/${res.data}`)
                }, 2000);
            }
          
        } catch (error) {
            const data = {
                'message': t('invalidtoken'),
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
    return <>
        <div>
            <div className="header">
                <div className='d-flex justify-content-between align-items-center w-75 mx-auto'>
                    <div className="d-flex align-items-center justify-content-start w-50">
                        <NavLink to='/' >
                            <img className="w-75" src={process.env.PUBLIC_URL + '/asset/images/shopeelogo.png'} />
                        </NavLink>
                        <span className="w-100" style={{ fontSize: '1.5vw' }}><strong>{t('resetpassword')}</strong></span>
                    </div>

                    <NavLink to='/shopeehelp' style={{ color: '#ee4d2d', textDecoration: 'none' }}>
                        {t('areyouhelp')}
                    </NavLink>
                </div>
            </div>
            <div className="body p-5 d-flex justify-content-around" style={{ backgroundColor: '#ee4d2d' }}>

                <div className="card mx-auto" style={{width:'30vw'}}>
                    <div className="card-header d-flex" style={{ fontSize: '1.2vw' }}>
                        <NavLink to='/forgotpassword' className="w-25"><i className="fa-solid fa-arrow-left" /></NavLink>

                        <div className="w-100 mx-auto">{t('entertokenreceived')}</div>
                    </div>
                    <div className="card-body d-flex justify-content-center ">
                        <Form
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            style={{ width: '100%', maxWidth: 400 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Token"
                                name="token"
                                rules={[{ required: true, message: 'Please input your email!' }]}
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
                                {contextHolder}
                            </Form.Item>
                        </Form>
                    </div>
                </div>

            </div>
            <Footer></Footer>
        </div>
    </>
};


export default EnterCodePassword