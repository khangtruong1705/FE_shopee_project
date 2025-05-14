import styles from './Search.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';
import _ from "lodash";
import { DOMAIN } from '../../util/config'


const Search = () => {
    const [activeButton, setActiveButton] = useState(null);
    const [isDropdownSelected, setIsDropdownSelected] = useState(false);
    const handleClick = (button) => {
        setActiveButton(button); // Cập nhật nút được chọn
    };
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
    const { keyword } = useParams();
    const [arrMain, setArrMain] = useState();
    const fetchData = async () => {
        try {
            const response = await axios.get(`${DOMAIN}/api/products/get-products-by-search/${keyword}`);
            console.log(response.data);
            setArrMain(response.data); // Gán dữ liệu vào arrMain
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
                    <div className='d-flex justify-content-center my-4 p-3' style={{ backgroundColor: '#ededed' }}>
                        Sắp Xếp Theo
                        <button
                            className={`mx-5 ${activeButton === "latest" ? "btn btn-danger" : ""}`}
                            style={{ borderColor: 'solid 1px #f7452d', borderRadius: '50px' }}
                            onClick={() => {
                                handleClick("latest")
                                const sortedItems = _.sortBy(arrMain, ["created_at"], ["desc"]);
                                setArrMain(sortedItems)
                            }}>Mới Nhất</button>
                        <button className={`mx-5 ${activeButton === "best-seller" ? "btn btn-danger" : ""}`}
                            style={{ borderColor: 'solid 1px #f7452d', borderRadius: '50px' }}
                            onClick={() => {
                                handleClick("best-seller")
                                const sortedItems = _.orderBy(arrMain, ["sold"], ["desc"]);
                                setArrMain(sortedItems)
                            }}>Bán Chạy</button>
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
                            return <div className='col-3' key={index} >
                                <NavLink to={`/productdetail/${product.product_id}`} className='card m-1' style={{ minHeight: '400px', borderRadius: '0', textDecoration: 'none' }}>
                                    <div className='card-header' style={{ height: '280px', backgroundColor: '#ffffff' }}>
                                        <img
                                            className='w-100 h-100'
                                            alt='Product image'
                                            src={`${process.env.PUBLIC_URL}${product.image}`}
                                        />
                                    </div>
                                    <div className='card-body'>
                                        <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.description}</div>
                                        <div className='d-flex justify-content-between'>
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