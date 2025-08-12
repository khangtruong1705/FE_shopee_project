import styles from './Category.module.scss'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, NavLink } from 'react-router-dom';
import _ from "lodash";
import { DOMAIN } from '../../util/config';
import { Menu, Button, Select, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import ProductItem from '../../components/ProductItem/ProductItem';
import { getLevelKeys, handleOpenChange } from '../../antdesignhook/useAntdesign'
import { getFilterItems } from './CategoryRawData'
import { jwtDecode } from 'jwt-decode';


const Category = () => {
    const [arrMain, setArrMain] = useState([]);
    const { t } = useTranslation();
    const token = localStorage.getItem('token');
    const { name } = useParams();
    const onChange = e => {
        console.log(`checked = ${e.target.checked}`);
    };
    const filterItems = getFilterItems(t, onChange);
    const [stateOpenKeys, setStateOpenKeys] = useState([]);
    const levelKeys = getLevelKeys(filterItems);
    const onOpenChange = (openKeys) => {
        handleOpenChange(openKeys, stateOpenKeys, setStateOpenKeys, levelKeys);
    };
    const sortOptions = [
        { id: 2, label: t('bestseller') },
        { id: 3, label: t('newest') },
        { id: 4, label: t('featured') },
    ];
    const [selectedSort, setSelectedSort] = useState(null);
    const handleChange = value => {
        let sortedarrMain
        if (value === 'lowtohigh') {
            sortedarrMain = _.orderBy(arrMain, ["price"], ["asc"]);
        } else if (value === 'hightolow') {
            sortedarrMain = _.orderBy(arrMain, ["price"], ["desc"]);
        } else {
            sortedarrMain = [...arrMain];
        }
        setArrMain(sortedarrMain);
    };
    const handleSortChange = (value) => {
        if (value === 2) {
            const sortedItems = _.orderBy(arrMain, ["sold"], ["desc"]);
            setSelectedSort(value);
            setArrMain(sortedItems)
        } if (value === 3) {
            const sortedItems = _.sortBy(arrMain, ["created_at"], ["desc"]);
            setSelectedSort(value);
            setArrMain(sortedItems)
        } if (value === 4) {
            const sortedItems = _.orderBy(
                arrMain,
                [item => new Date(item.created_at)],
                ['desc']
            );
            setSelectedSort(value);
            setArrMain(sortedItems)
        }
    };
    const fetchData = async () => {
        try {
            const response = await axios.get(`${DOMAIN}/api/products/get-products-by-category/${name}`);
            setArrMain(response.data);
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
            <div className={styles.mainProducts}>
                <div className={styles.filter}>
                    <div className={styles.filterTitle}>
                        <i className={`${styles.filterIcon} fa-solid fa-filter`} />
                        <span className={styles.filterContent}>{t('filter')}</span>
                    </div>
                    <hr></hr>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        openKeys={stateOpenKeys}
                        onOpenChange={onOpenChange}
                        style={{ width: '16vw' }}
                        items={filterItems}
                    />
                </div>
                <div className={styles.products}>
                    <div className={styles.productsFilter}>
                        <strong className={styles.productsFilterLeft}>{t('productlist')}</strong>
                        <div className={styles.productsFilterRight} >
                            <span className={styles.productsFilterRightTitle}>{t('sortby')}</span>
                            {sortOptions.map(({ id, label }) => (
                                <Button
                                    key={id}
                                    style={{ fontSize: '0.9vw', width: '4.9vw' }}
                                    onClick={() => handleSortChange(id)}
                                    className={selectedSort === id ? 'border border-primary' : 'btn-outline-primary'}
                                >
                                    {label}
                                    {selectedSort === id && (
                                        <span className={styles.cornerCheck}>
                                            <i
                                                className="fa-solid fa-check"
                                                style={{
                                                    fontSize: '0.5vw',
                                                    color: 'white',
                                                    position: 'absolute',
                                                    top: '3px',
                                                }}
                                            />
                                        </span>
                                    )}
                                </Button>
                            ))}
                            <Space wrap>
                                <Select
                                    style={{ textAlign: 'center', width: '8.3vw', fontSize: '0.9vw' }}
                                    defaultValue='lowtohigh'
                                    onChange={handleChange}
                                    options={[
                                        { value: 'lowtohigh', label: <span style={{ fontSize: '0.9vw' }} >{t('lowtohigh')}</span> },
                                        { value: 'hightolow', label: <span style={{ fontSize: '0.9vw' }}>{t('hightolow')}</span> },

                                    ]}
                                />
                            </Space>
                        </div>
                    </div>
                    <div className={styles.arrayProducts}>
                        <div className='row'>
                            {arrMain?.map((product, index) => {
                                return <div className='col-6 col-sm-6 col-md-4 col-lg-3' key={index}>
                                    <NavLink
                                        style={{ textDecoration: 'none' }}
                                        to={`/productdetail/${product.product_id}`}
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
                                        <div className={`${styles.carditem} card`}>
                                            <div className='card-body'>
                                                <img className={styles.productImage} src={`${process.env.PUBLIC_URL} ${product.image}`} />
                                                <div className={styles.dealSock}  >
                                                    <i className={`${styles.dealsockicon} fa-solid fa-fire mx-1`} />
                                                    <span className={styles.dealsockcontent}>Giá cực sốc</span>
                                                </div>
                                                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.9vw' }}><strong>{product.description}</strong></div>
                                                <div className={styles.price}>
                                                    <strong className='text-center' >{product.price.toLocaleString('vi-VN')}₫</strong>
                                                    <div className={styles.oldPrice}>399.000₫ -10%</div>
                                                </div>
                                                <button className={styles.cardButton}>Mua Ngay</button>
                                            </div>
                                        </div>
                                    </NavLink>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>

}


export default Category