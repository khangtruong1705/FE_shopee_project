
import { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom";
import axios from 'axios'
import { jwtDecode } from 'jwt-decode';
import styles from '../Home.module.scss'
import { useTranslation } from 'react-i18next';
import { DOMAIN } from '../../../util/config';


const Category = () => {
    const { t } = useTranslation();
    const [categories, setCategories] = useState([]);
    const token = localStorage.getItem('token');
    const fetchData = async () => {
        try {
            const response = await axios.get(`${DOMAIN}/api/products/get-all-categories`);
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchData()
    }, [])
    return <div className={styles.category}>
        <div className={`${styles.categoryTitle} my-2`}>
            <img src={process.env.PUBLIC_URL + '/asset/images/categoriesicon.webp'} alt="..." />
            <strong className='mx-2'>{t('categories')}</strong>
        </div>
        <div className={styles.gridcategory}>
            {categories?.slice(0, 10).map((category) => (
                <div key={category.category_id} className={styles.gridCategoryItemContainer}>
                    <NavLink className={styles.gridCategoryItem}
                        to={`/category/${category.name}`}
                        onClick={async () => {
                            try {
                                let data = {};
                                if (token == null) {
                                    data = {
                                        user_id: 0,
                                        category_id: category.category_id,
                                        name: category.name
                                    };
                                } else {
                                    const { user_id } = jwtDecode(token);
                                    data = {
                                        user_id: user_id,
                                        category_id: category.category_id,
                                        name: category.name
                                    };
                                }
                                console.log('data', data)
                                await axios.post(`${DOMAIN}/api/view-category/add-view-by-categoryid`, data);
                            } catch (error) {
                                console.log('error', error)
                            }
                        }}
                    >
                        <img src={`${process.env.PUBLIC_URL}/asset/images/${category.name}.webp`}
                            alt={category}
                        />
                        <div className={styles.categoryItemTitle}>{category.description}</div>
                    </NavLink>
                </div>
            ))}
        </div>
    </div>
}

export default Category