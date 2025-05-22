import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useState, useEffect } from 'react'
import styles from './InfoUser.module.css'
import { DOMAIN } from '../../../util/config';
import { Button, message, Modal, Input, Upload, Flex } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';




const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};
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





const InfoUser = () => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, url => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };
    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );



    const token = localStorage.getItem('token');
    const { user_id } = jwtDecode(token);
    const [userInfo, setUserInfo] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fieldToEdit, setFieldToEdit] = useState('');
    const [editLabel, setEditLabel] = useState('');
    const [newValue, setNewValue] = useState('');
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
            // alert(res.data.message)
            return res
        } catch (error) {

            console.error('Error fetching products:', error);
            return error
        }
    };
    const fetchData = async () => {
        try {

            const res = await axios.get(`${DOMAIN}/api/users/get-user-by-user-id/${user_id}`);
            setUserInfo(res.data); // Gán dữ liệu vào arrMain
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
                <div className="card-header">
                    <p>Hồ sơ của tôi</p>
                    <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                </div>
                <div className="card-body d-flex justify-content-around">
                    <div>
                        <table border="0" cellpadding="8">
                            <tr>
                                <td className="text-start"><strong>Email</strong></td>
                                <td className="text-end">{userInfo.email ? hideEmail(userInfo.email) : "Email không hợp lệ"}</td>
                            </tr>
                            <tr>
                                <td className="text-start"><strong>Tên đăng nhập</strong></td>
                                <td className="text-end">{userInfo.name} <a onClick={() => openEditModal('name', 'Tên đăng nhập')} href="#">Thay Đổi</a></td>
                            </tr>
                            <tr>
                                <td className="text-start"><strong>Số điện thoại</strong></td>
                                <td className="text-end">{userInfo.phone_number} <a onClick={() => openEditModal('phone_number', 'Số điện thoại')} href="#">Thay Đổi</a></td>
                            </tr>
                            <tr>
                                <td className="text-start"><strong>Giới tính</strong></td>
                                <td className="text-end">
                                    <input type="radio" name="gender" value="Nam" onChange={handleGenderChange} checked={userInfo.gender === 'Nam'} /> Nam
                                    <input type="radio" name="gender" value="Nữ" onChange={handleGenderChange} checked={userInfo.gender === 'Nữ'} /> Nữ
                                    <input type="radio" name="gender" value="Khác" onChange={handleGenderChange} checked={userInfo.gender === 'Khác'} /> Khác
                                </td>
                            </tr>
                            <tr className=''>
                                <td  className="text-start"><strong>Ngày sinh</strong></td>
                                <td className="text-end">{userInfo.birthday} <a onClick={() => openEditModal('birthDate', 'Ngày sinh')} href="#">Thay Đổi</a></td>
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
                        <Button shape="round" onClick={async () => {
                            const payload = {
                                'user_id': user_id,
                                'data': userInfo
                            }
                            const message = await updateInfoUser(payload)
                            openMessage(message)
                        }}>
                            Lưu
                        </Button>
                    </div>
                    <div className='d-flex flex-column align-items-center' >
                        <Flex gap="middle" wrap>
                            <Upload
                                name="avatar"
                                listType="picture-circle"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                            >
                                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                        </Flex>
                        <p>Dung lương ảnh tối đa 1MB</p>
                        <p>Định dang:JPEG,.PNG</p>
                    </div>
                </div>
            </div>


        </div>


    </>
}
    ;


export default InfoUser