import styles from './Search.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';
import _ from "lodash";
import { DOMAIN } from '../../util/config'
import { Segmented } from 'antd';

const Search = () => {
    const [isDropdownSelected, setIsDropdownSelected] = useState(false);
    const handleSortChange = (value) => {
        if (value == 'Mới Nhất') {
            const sortedItems = _.sortBy(arrMain, ["created_at"], ["desc"]);
            setArrMain(sortedItems)
        } else if (value == 'Bán Chạy') {
            const sortedItems = _.orderBy(arrMain, ["sold"], ["desc"]);
            setArrMain(sortedItems)
        }

    };
    const handleDropdownChange = (event) => {
        const selectedValue = parseInt(event.target.value, 10);
        setIsDropdownSelected(true);

       
        let sortedarrMain;
        if (selectedValue === 1) {
            sortedarrMain = _.orderBy(arrMain, ["price"], ["asc"]);
        } else if (selectedValue === 2) {
            sortedarrMain = _.orderBy(arrMain, ["price"], ["desc"]);
        } else {   
            sortedarrMain = [...arrMain];
        }

        setArrMain(sortedarrMain);
    };
    const { keyword } = useParams();
    const [arrMain, setArrMain] = useState();
    const fetchData = async () => {
        try {
            const response = await axios.get(`${DOMAIN}/api/products/get-products-by-search/${keyword}`);
            console.log(response.data);
            setArrMain(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
            setArrMain([])
        }
    };
    useEffect(() => {
        fetchData()
    }, [keyword])
    return <>
        <div className=''>
            <div className='container w-75 mx-auto'>
                <div>
                    <p>KẾT QUẢ TÌM KIẾM LIÊN QUAN ĐẾN "{keyword}"</p>
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
            </div>
        </div>
    </>
};



export default Search