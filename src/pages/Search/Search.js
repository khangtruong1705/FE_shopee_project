import styles from './Search.module.scss'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';
import _ from "lodash";
import { DOMAIN } from '../../util/config'
import { Segmented } from 'antd';
import { useTranslation } from 'react-i18next';
import ProductItem from '../../components/ProductItem/ProductItem';



const Search = () => {
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
            <div style={{ background: '#eaeffb' }}>
                <img style={{ height: '31vw', width: '100%' }} src={process.env.PUBLIC_URL + '/asset/images/carousel3.webp'} className="d-block w-100" alt="..." />
            </div>
            <div  className='w-75 mx-auto'>
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
                                <option defaultValue="1">{t('price')}</option>
                                <option value={1}>{t('lowtohigh')}</option>
                                <option value={2}>{t('hightolow')}</option>
                            </select>
                        </div>
                    </div>
                    <div className='row'>
                        {arrMain?.map((product, index) => <div key={index} className='col-3 mb-4'>
                            <NavLink
                                style={{ textDecoration: 'none' }}
                                to={`/productdetail/${product.product_id}`}
                            >
                                <ProductItem product={product}></ProductItem>
                            </NavLink>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </>
};



export default Search