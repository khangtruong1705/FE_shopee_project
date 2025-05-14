import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { useFormik } from 'formik'
import axios from "axios";
import * as yup from 'yup';
import { useState } from "react";
import styles from './Register.module.css'
import {DOMAIN} from '../../util/config'

const Register = () => {
    const navigate = useNavigate();
    const [result, setResult] = useState('')
    const frm = useFormik({
        initialValues: {
            email: '',
            password: '',
            name: ''
        }, validationSchema: yup.object().shape({
            email: yup.string().required('Email can not be blank!').email('email is not valid!')
        }),
        onSubmit: async (values) => {
            // Gửi dữ liệu tới API
            try {
                let res = await axios.post(`${DOMAIN}/api/users/register`, values);
                setResult(res.data.message)
                alert('User registered successfully !!!')
                navigate(`/`)
            } catch (error) {
                setResult(error.response.data.detail)
                console.error('Error:', error.response.data.detail);
            }
        }
    });
    return <>
        <div>
            <div className="header">
                <div className='d-flex justify-content-between align-items-center w-75 mx-auto'>
                    <div className='d-flex align-items-center'>
                        <img className="w-25" src={process.env.PUBLIC_URL + '/asset/images/shopeelogo.png'} />
                    </div>
                    <NavLink to='/shopeehelp' style={{ color: '#ee4d2d', textDecoration: 'none' }}>
                        Bạn cần giúp đỡ?
                    </NavLink>
                </div>
            </div>
            <div className="body p-5 d-flex justify-content-around" style={{ backgroundColor: '#ee4d2d' }}>
                <div>
                    <h1 className="text-white">Shopee</h1>
                    <p>Nền tảng thương mại điện tử yêu thích ở Đông Nam Á & Đài Loan</p>
                </div>
                <div className="card w-25 mx-auto ">
                    <div className="card-header text-center">
                        Đăng Ký
                    </div>
                    <div className="card-body">
                        <form onSubmit={frm.handleSubmit}>
                            <label htmlFor="email">Email đăng ký</label>
                            <div><input className="w-100" id='email' name='email' onChange={frm.handleChange} onBlur={frm.handleBlur}></input></div>
                            {frm.errors.email && <p className='text-danger'>{frm.errors.email}</p>}
                            <label htmlFor="password">Tạo Mật Khẩu</label>
                            <div><input className="w-100" name='password' type="password" onChange={frm.handleChange} onBlur={frm.handleBlur}></input></div>
                            <button type='submit' className='p-2 mt-5 w-100 text-white' style={{ backgroundColor: '#f3826c', border: 'none' }}>Gửi đăng ký</button>

                        </form>
                        <div className="text-danger text-center">
                            {result}
                        </div>
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
                        Bằng việc đăng kí, bạn đã đồng ý với Shopee về <NavLink to='/policy' style={{ color: '#ee4d2d' }}>Điều khoản dịch vụ</NavLink> & <NavLink to='/policy' style={{ color: '#ee4d2d' }}>Chính sách bảo mật</NavLink>
                    </div>
                    <div className="text-center">
                        Bạn đã có tài khoản? <NavLink to='/login'>Đăng nhập</NavLink>
                    </div>
                </div>

            </div>

            <Footer></Footer>
        </div>

    </>
};


export default Register