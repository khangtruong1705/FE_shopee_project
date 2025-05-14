import { jwtDecode } from 'jwt-decode';
import {useEffect } from 'react'
import axios from 'axios';
import * as yup from 'yup';
import { useFormik } from 'formik'
import { DOMAIN } from '../../../util/config';

const ChangePassword = () => {




    const token = localStorage.getItem('token')
    const { user_id } = jwtDecode(token);

    const frm = useFormik({
        initialValues: {
            old_password: '',
            new_password: '',
            confirm_new_password: ''
        }, validationSchema: yup.object().shape({
            old_password: yup.string().required('Email can not be blank!')
        }),
        onSubmit: async (values) => {
            // Gửi dữ liệu tới API
            try {
                const data = {
                    ...values,
                    'user_id': user_id
                }
                let res = await axios.post(`${DOMAIN}/api/users/change-password`, data);
                console.log('Response:', res.data.message);
                alert(res.data)
            } catch (error) {
                console.error('Error:', error.response);
            }
        }
    });

    useEffect(() => {

    }, [])
    return <>
        <form onSubmit={frm.handleSubmit}>
            <div className='card w-50 mx-auto mt-5'>
                <div className='card-header'>
                    <i className="fa-solid fa-shield-virus" style={{fontSize:'2.5rem',color:'#fb5530'}} />
                </div>
                <div className='card-body'>
                <label htmlFor="old_password">Mật Khẩu Cũ</label>
                <div>
                    <input name='old_password' onChange={frm.handleChange} onBlur={frm.handleBlur}></input>
                </div>
                <label htmlFor="new_password">Mật Khẩu Mới</label>
                <div>
                    <input name='new_password' onChange={frm.handleChange} onBlur={frm.handleBlur}></input>
                </div>
                <label htmlFor="confirm_new_password">Xác Nhận Mật Khẩu Mới</label>
                <div>
                    <input name='confirm_new_password' onChange={frm.handleChange} onBlur={frm.handleBlur}></input>
                </div>
                <div className='my-5'>
                    <button className=''>Xác Nhận</button>
                </div>
                </div>
                
            </div>


        </form>



    </>

};


export default ChangePassword