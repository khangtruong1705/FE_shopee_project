import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { DOMAIN } from '../../../util/config';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useTranslation } from 'react-i18next';






const ChangePassword = () => {
    const { t } = useTranslation();
    const token = localStorage.getItem('token')
    const { user_id } = jwtDecode(token);
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const key = 'updatable';
    const openMessage = (message) => {
        messageApi.open({
            key,
            type: 'loading',
            content: 'Loading...',
        });
        setTimeout(() => {
            messageApi.open({
                key,
                type: 'success',
                content: message,
                duration: 2,
            });
        }, 1000);
    };
    const onFinish = async (values) => {
        try {
            const data = {
                ...values,
                'user_id': user_id
            }
            let res = await axios.post(`${DOMAIN}/api/users/change-password`, data);
            openMessage(res.data.detail)
            if (res.status === 200) {
                setTimeout(() => {
                    navigate('/')
                }, 2000);
            }
        }
        catch (error) {
            const statusCode = error.response?.status;
            if (statusCode === 404) {
                openMessage(t('email404'))
            } else if (statusCode === 401) {
                openMessage(t('email401'))
            } else if (statusCode === 400) {
                openMessage(t('email400'))
            }
        }
    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    // useEffect(() => {

    // }, [])
    return <>
        <div className=' w-50 mx-auto mt-5 d-flex flex-column align-items-center' style={{ border: '1px solid', borderRadius: '20px' }}>
            <div className='mt-4'>
                <i className="fa-solid fa-shield-virus" style={{ fontSize: '3rem', color: '#fb5530' }} />
            </div>
            <Form
                className='mt-5'
                form={form}
                name="basic"
                labelCol={{ span: 11 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Old password"
                    name="old_password"
                    rules={[{ required: true, message: 'Please input your old password!' }]}

                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="New password"
                    name="new_password"
                    rules={[{ required: true, message: 'Please input your new password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Confirm new password"
                    name="confirm_new_password"
                    rules={[{ required: true, message: 'Please input your confirm new password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" label={null}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Form.Item label={null}>
                    {contextHolder}
                    <Button type="primary"
                        htmlType="submit"
                        style={{ backgroundColor: '#fa5130', borderColor: '#fa5130' }}
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </>

};


export default ChangePassword