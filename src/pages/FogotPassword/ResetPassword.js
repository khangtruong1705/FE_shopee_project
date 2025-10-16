import { NavLink, useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import axios from 'axios';
import { DOMAIN } from "../../util/config";
import { Button, message, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

const ResetPassword = () => {
    const { t } = useTranslation();
    const { token } = useParams();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        console.log('Success:', values);
        try {
            const newValue = {
                'token': token,
                'new_password': values.newpassword
            }
            let res = await axios.post(`${DOMAIN}/api/users/reset-password`, newValue);
            console.log('res', res)
            if (res.status == 200) {
                const data = {
                    'message': 'Đổi Mật Khẩu Thành Công !!!',
                    'type': 'success'
                }
                openMessage(data)
                setTimeout(() => {
                    navigate('/')
                }, 2000);
            } 
        } catch (error) {
            const data = {
                'message': 'Đổi Mật Khẩu Thất Bại!!!',
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
                            <img className="w-75" src={process.env.PUBLIC_URL + '/asset/images/logoeco.webp'} />
                        </NavLink>
                        <span className="w-100" style={{ fontSize: '1.5vw' }}><strong>{t('resetpassword')}</strong></span>
                    </div>

                    <NavLink to='/shopeehelp' style={{ color: '#3076e3', textDecoration: 'none' }}>
                        {t('areyouhelp')}
                    </NavLink>
                </div>
            </div>
            <div className="body p-5 d-flex justify-content-around" style={{ backgroundColor: '#3076e3' }}>

                <div className="card w-25 mx-auto">
                    <div className="card-header d-flex" style={{ fontSize: '1.2vw' }}>
                        <div className="w-25"><i className="fa-solid fa-arrow-left" /></div>

                        <div className="w-100 mx-auto">{t('createnewpassword')}</div>
                    </div>
                    <div className="card-body d-flex justify-content-center ">
                        <Form

                            name="basic"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 16 }}
                            style={{ width: '100%', maxWidth: 400 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label= {t('resetpassword')}
                                name="newpassword"
                                rules={[{ required: true, message: 'Please input your email!' }]}
                            >
                                <Input.Password />
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


export default ResetPassword