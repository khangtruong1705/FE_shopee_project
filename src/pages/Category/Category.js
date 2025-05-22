import styles from './Category.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';
import _ from "lodash";
import { DOMAIN } from '../../util/config';
import { Segmented } from 'antd';

const Category = () => {
    const { name } = useParams();
    const [isDropdownSelected, setIsDropdownSelected] = useState(false);
    const handleDropdownChange = (event) => {
        const selectedValue = parseInt(event.target.value, 10);
        setIsDropdownSelected(true);
        // Sắp xếp dựa trên lựa chọn
        let sortedarrMain;
        if (selectedValue === 1) {
            // Giá: Từ Thấp Đến Cao
            sortedarrMain = _.orderBy(arrMain, ["price"], ["asc"]);
        } else if (selectedValue === 2) {
            // Giá: Từ Cao Đến Thấp
            sortedarrMain = _.orderBy(arrMain, ["price"], ["desc"]);
        } else {
            // Không sắp xếp
            sortedarrMain = [...arrMain];
        }

        // Cập nhật danh sách sản phẩm
        setArrMain(sortedarrMain);
    };
    const handleSortChange = (value) => {
        if (value == 'Mới Nhất') {
            const sortedItems = _.sortBy(arrMain, ["created_at"], ["desc"]);
            setArrMain(sortedItems)
        } else if (value == 'Bán Chạy') {
            const sortedItems = _.orderBy(arrMain, ["sold"], ["desc"]);
            setArrMain(sortedItems)
        }

    };
    const [arrMain, setArrMain] = useState();
    const fetchData = async () => {
        try {
            const response = await axios.get(`${DOMAIN}/api/products/get-products-by-category/${name}`);
            console.log(response.data);
            setArrMain(response.data); // Gán dữ liệu vào arrMain
        } catch (error) {
            console.error('Error fetching products:', error);
            setArrMain([])
        }
    };
    useEffect(() => {
        fetchData()
    }, [name])
    return <>
        <div className='container w-75 mx-auto pt-5'>
            <div id="carouselExampleAutoplaying" className="carousel slide " data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={process.env.PUBLIC_URL + '/asset/images/carousel11.jpg'} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={process.env.PUBLIC_URL + '/asset/images/carousel22.png'} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={process.env.PUBLIC_URL + '/asset/images/carousel33.png'} className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className='d-flex justify-content-around my-4 p-3' style={{ backgroundColor: '#ededed' }}>
                <div><strong>Sắp Xếp Theo</strong> </div>
                <div>
                    <Segmented options={['Mới Nhất', 'Bán Chạy',]}
                        block
                        style={{ minWidth: 350 }}
                        onChange={handleSortChange}
                    />
                </div>
                <div>
                    <select className={`form-select ${isDropdownSelected ? "dropdown-selected" : ""}`}
                        aria-label="Default select example"
                        onChange={handleDropdownChange}
                    >
                        <option selected>Giá</option>
                        <option value={1}>Giá:Từ Thấp Đến Cao</option>
                        <option value={2}>Giá:Từ Cao Đến Thấp</option>
                    </select>
                </div>
            </div>
            <div className='row'>
                {arrMain?.map((product, index) => {
                    return <div className='col-lg-3 col-md-4 col-sm-6' key={index}>
                        <NavLink to={`/productdetail/${product.product_id}`} className='card m-1' style={{ borderRadius: '0', textDecoration: 'none' }}>
                            <div className='card-header' style={{ height: '21vw', backgroundColor: '#ffffff' }}>
                                <img
                                    className='w-100 h-75'
                                    alt='Product image'
                                    src={`${process.env.PUBLIC_URL}${product.image}`}
                                    style={{ border: '1px solid #f85902', borderRadius: '20px' }}
                                />
                            </div>
                            <div className='card-body' style={{ fontSize: '1vw' }}>
                                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.description}</div>
                                <div className='d-flex justify-content-between' >
                                    <div>Đã bán {product.sold}</div>
                                    <div>
                                        <i className='fa-solid fa-star text-danger' />
                                        {product.rating}
                                    </div>
                                </div>
                                <div className='text-center' style={{ color: '#f85902' }} >{product.price.toLocaleString('vi-VN')}VNĐ</div>
                            </div>
                        </NavLink>
                    </div>
                })}
            </div>
        </div>

    </>

}


export default Category