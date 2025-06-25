import styles from './Search.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';
import _ from "lodash";
import { DOMAIN } from '../../util/config'
import { Segmented } from 'antd';
import { useTranslation } from 'react-i18next';
import { jwtDecode } from 'jwt-decode';




const Search = () => {
    const token = localStorage.getItem('token');
    const { keyword } = useParams();
    const [arrMain, setArrMain] = useState();
    const { t } = useTranslation();
    const [isDropdownSelected, setIsDropdownSelected] = useState(false);
    const handleSortChange = (value) => {
        if (value === 'Newest' || value === 'Mới Nhất') {
            const sortedItems = _.sortBy(arrMain, ["created_at"], ["desc"]);
            setArrMain(sortedItems)
        } else if (value === 'Best Seller' || value === 'Bán Chạy') {
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
    const fetchData = async () => {
        try {
            const response = await axios.get(`${DOMAIN}/api/products/get-products-by-search/${keyword}`);
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
        <div>
            <div className='container w-75 mx-auto'>
                <div>
                    <p className='pt-3'>{t('searchresults')} "{keyword}"</p>
                    <div className='d-flex justify-content-around my-4 p-3' style={{ backgroundColor: '#ededed' }}>
                        <div><strong>{t('sortby')}</strong> </div>
                        <div>
                            <Segmented options={[t('newest'), t('bestseller'),]}
                                block
                                style={{ minWidth: 350 }}
                                onChange={handleSortChange}
                            />
                        </div>
                        <div>
                            <select className={`form-select ${isDropdownSelected ? "dropdown-selected" : ""}  text-center`}
                                aria-label="Default select example"
                                onChange={handleDropdownChange}
                            >
                                <option selected>{t('price')}</option>
                                <option value={1}>{t('lowtohigh')}</option>
                                <option value={2}>{t('lowtohigh')}</option>
                            </select>
                        </div>
                    </div>
                    <div className='row'>
                        {arrMain?.map((product, index) => {
                            return <div className='col-lg-3 col-md-4 col-sm-6' key={index}>
                                <NavLink to={`/productdetail/${product.product_id}`}
                                    className={`${styles.carditem} card m-1`}
                                    onClick={async () => {
                                        try {
                                            let data = {};
                                            if (token == null) {
                                                data = {
                                                    user_id: 0,
                                                    product_id: product.product_id,
                                                    name: product.name
                                                };
                                            } else {
                                                const { user_id } = jwtDecode(token);
                                                data = {
                                                    user_id: user_id,
                                                    product_id: product.product_id,
                                                    name: product.name
                                                };
                                            }
                                            await axios.post(`${DOMAIN}/api/view-product/add-view-by-productid`, data);
                                        } catch (error) {
                                            console.log('error', error)
                                        }
                                    }}
                                >
                                    <div className='card-header' style={{ height: '21vw', backgroundColor: '#ffffff' }}>
                                        <img
                                            className='w-100 h-75'
                                            alt='...'
                                            src={`${process.env.PUBLIC_URL}${product.image}`}
                                            style={{ border: '1px solid #f85902', borderRadius: '20px' }}
                                        />
                                    </div>
                                    <div className='card-body' style={{ fontSize: '1vw' }}>
                                        <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.description}</div>
                                        <div className='d-flex justify-content-between' >
                                            <div>{t('sold')}:{product.sold}</div>
                                            <div className='text-center' style={{ color: '#f85902' }} >{product.price.toLocaleString('vi-VN')}VNĐ</div>
                                        </div>
                                        <div>
                                            {Array.from({ length: 5 }).map((_, index) => (
                                                <i key={index} className="fa-solid fa-star" style={{ color: '#f7d22c' }} />
                                            ))}
                                            {product.rating}
                                        </div>
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