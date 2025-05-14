import { NavLink } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import axios from 'axios';
import { useFormik } from 'formik'
import * as yup from 'yup';
import { useState } from "react";
import { history } from '../../index'
import { DOMAIN } from "../../util/config";
const Login = () => {
    const [result, setResult] = useState('')
    const frm = useFormik({
        initialValues: {
            email: '',
            password: ''
        }, validationSchema: yup.object().shape({
            email: yup.string().required('Email can not be blank!').email('email is not valid!')
        }),
        onSubmit: async (values) => {
            // Gửi dữ liệu tới API
            try {
                let res = await axios.post(`${DOMAIN}/api/users/login`, values);
                localStorage.setItem('token',res.data);
                history.push('/')
            } catch (error) {
                setResult(error.response.data.detail)
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
                    <NavLink to='/shopeehelp' style={{ color: '#ee4d2d',textDecoration:'none' }}>
                        Bạn cần giúp đỡ?
                    </NavLink>
                </div>
            </div>
            <div className="body p-5 d-flex justify-content-around" style={{ backgroundColor: '#ee4d2d' }}>
                <div>
                    <h1 className="text-white">Shopee</h1>
                    <p>Nền tảng thương mại điện tử yêu thích ở Đông Nam Á & Đài Loan</p>
                </div>
                <div className="card w-25 mx-auto">
                    <div className="card-header text-center">
                        Đăng Nhập
                    </div>
                    <div className="card-body">
                        <form onSubmit={frm.handleSubmit}>
                            <div>
                                <label htmlFor="email">Email đăng nhập</label>
                                <div><input className="w-100 p-1" id='email' name='email' onChange={frm.handleChange} onBlur={frm.handleBlur}></input></div>
                            </div>
                            <div>
                                <label htmlFor="password">Tạo Mật Khẩu</label>
                                <div>
                                    <input className="w-100 p-1" type="password"  id='password' name='password' onChange={frm.handleChange} onBlur={frm.handleBlur}></input></div></div>
                            <div className="mt-3">
                                <button className='p-2 mt-2 w-100 text-white' style={{ backgroundColor: '#f3826c', border: 'none' }} type='submit'>Đăng nhập</button>
                            </div>

                            <div className="d-flex justify-content-between mt-2" style={{fontSize:'0.8rem',color:'#1877f2'}}>
                                <div>Quên mật khẩu</div>
                                <div>Đăng nhập với SMS</div>
                            </div>

                            <div className="text-danger text-center">
                                {result}
                            </div>
                        </form>
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
                    <div className="mt-3 text-center">
                        Bạn mới biết đến Shopee? <NavLink to='/register'>Đăng ký</NavLink>
                    </div>
                </div>

            </div>

            <Footer></Footer>
        </div>
    </>
};


export default Login