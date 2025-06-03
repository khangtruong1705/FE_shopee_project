import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useState, useEffect } from 'react'
import styles from './InfoUser.module.css'
import { DOMAIN } from '../../../util/config';
import { Button, message, Modal, Input, Upload, Flex } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { getAvatarUrlApi } from '../../../redux/reducers/getAvatarUrl'
import { DatePicker, Space } from 'antd';



const InfoUser = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');
    const { user_id } = jwtDecode(token);
    const [userInfo, setUserInfo] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fieldToEdit, setFieldToEdit] = useState('');
    const [editLabel, setEditLabel] = useState('');
    const [newValue, setNewValue] = useState('');
    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );
    const beforeUpload = file => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };
    const handleChange = async info => {
        if (info.file.status === 'uploading') {
            userInfo.avatar_url = false
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            setLoading(false);
            fetchData();
        }
    };
    const hideEmail = (email) => {
        const parts = email.split('@');
        const name = parts[0];
        const domain = parts[1];

        const hiddenName = name.slice(0, 2) + '******';

        return `${hiddenName}@${domain}`;
    };
    const openEditModal = (field, label) => {
        setFieldToEdit(field);
        setEditLabel(label);
        setNewValue(userInfo[field]);
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setUserInfo({ ...userInfo, [fieldToEdit]: newValue });
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleGenderChange = (e) => {
        setUserInfo({ ...userInfo, gender: e.target.value });
    };
    const updateInfoUser = async (payload) => {
        try {

            const res = await axios.put(`${DOMAIN}/api/users/update-info-user-by-userid`, payload);
            setUserInfo(res.data);
            await fetchData()
            return res
        } catch (error) {

            console.error('Error fetching products:', error);
            return error
        }
    };
    const dateOnChange = (date, dateString) => {
        console.log(date, dateString);
    };
    const fetchData = async () => {
        try {

            const res = await axios.get(`${DOMAIN}/api/users/get-user-by-user-id/${user_id}`);
            setUserInfo(res.data);
            const actionAsyns = await getAvatarUrlApi(user_id);
            dispatch(actionAsyns);
        } catch (error) {

            console.error('Error fetching products:', error);
        }
    };
    useEffect(() => {
        fetchData()
    }, [])
    const [messageApi, contextHolder] = message.useMessage();
    const key = 'updatable';
    const openMessage = async (message) => {
        messageApi.open({
            key,
            type: 'loading',
            content: 'Loading...',
        });
        setTimeout(() => {
            messageApi.open({
                key,
                type: 'success',
                content: message.data.message,
                duration: 2,
            });
        }, 1000);
    };

    return <>
        <div className="container p-5">
            <div className="card mx-auto" style={{ width: '50rem' }}>
                <div className="card-header" style={{ position: 'relative', textAlign: 'center' }}>
                    <i
                        style={{
                            fontSize: '4vw',
                            color: '#fb5530',
                            position: 'absolute',
                            left: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)'
                        }}
                        className="fa-solid fa-address-card"
                    />
                    <p style={{ color: '#fb5530', fontSize: '2vw' }}><strong>{t('myprofile')}</strong></p>
                    <p>{t('manageaccount')}</p>
                </div>
                <div className="card-body d-flex justify-content-around">
                    <div>
                        <table border="0" cellpadding="8">
                            <tr>
                                <td className="text-start"><strong>Email</strong></td>
                                <td className="text-end">{userInfo.email ? hideEmail(userInfo.email) : "Email không hợp lệ"}</td>
                            </tr>
                            <tr>
                                <td className="text-start"><strong>{t('username')}</strong></td>
                                <td className="text-end">{userInfo.name} <a onClick={() => openEditModal('name', 'Tên đăng nhập')} href="#">{t('change')}</a></td>
                            </tr>
                            <tr>
                                <td className="text-start"><strong>{t('phonenumber')}</strong></td>
                                <td className="text-end">{userInfo.phone_number} <a onClick={() => openEditModal('phone_number', 'Số điện thoại')} href="#">{t('change')}</a></td>
                            </tr>
                            <tr>
                                <td className="text-start"><strong>{t('gender')}</strong></td>
                                <td className="text-end">
                                    <input type="radio" name="gender" value="Nam" onChange={handleGenderChange} checked={userInfo.gender === 'Nam'} /> {t('male')}
                                    <input type="radio" name="gender" value="Nữ" onChange={handleGenderChange} checked={userInfo.gender === 'Nữ'} /> {t('female')}
                                    <input type="radio" name="gender" value="Khác" onChange={handleGenderChange} checked={userInfo.gender === 'Khác'} /> {t('other')}
                                </td>
                            </tr>
                            <tr className=''>
                                <td className="text-start">
                                    <strong>{t('dateofbirth')}</strong>
                                </td>
                                <td className="text-end">{userInfo.birthday}
                                    <Space direction="vertical">
                                        <DatePicker onChange={dateOnChange} />
                                    </Space></td>
                            </tr>
                        </table>
                        <Modal
                            title={`Thay đổi ${editLabel}`}
                            open={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            okText="Lưu"
                            cancelText="Hủy"
                        >
                            <Input
                                value={newValue}
                                onChange={(e) => setNewValue(e.target.value)}
                                placeholder={`Nhập ${editLabel} mới`}
                            />
                        </Modal>

                        {contextHolder}
                        <Button
                            style={{ marginTop: '1.2vw' }}
                            shape="round"
                            onClick={async () => {
                                const data = {
                                    'name': userInfo.name,
                                    'phone_number': userInfo.phone_number,
                                    'gender': userInfo.gender,
                                    'birthday': userInfo.birthday
                                }
                                const payload = {
                                    'user_id': user_id,
                                    'data': data
                                }
                                const message = await updateInfoUser(payload)
                                console.log('message', message)
                                openMessage(message)
                            }}>
                            {t('save')}
                        </Button>
                    </div>
                    <div className='d-flex flex-column align-items-center' >
                        <Flex gap="middle" wrap>
                            <Upload
                                name="avatar"
                                listType="picture-circle"
                                className="avatar-uploader"
                                showUploadList={false}
                                action={`${DOMAIN}/api/users/upload-avatar-by-userid`}
                                data={{ 'user_id': user_id }}
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                            >
                                {userInfo.avatar_url ? <img src={userInfo.avatar_url} alt="avatar" style={{ width: '100%', height: '100%', borderRadius: '50px' }} /> : uploadButton}
                            </Upload>
                        </Flex>
                        <p>{t('filesize')}</p>
                        <p>{t('fileextension')}</p>
                    </div>
                </div>
            </div>


        </div>


    </>
}
    ;


export default InfoUser