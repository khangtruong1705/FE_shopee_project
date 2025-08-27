import styles from '../Home.module.scss'
import {useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';





const Favourite = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    return <div className={`${styles.favourite} my-5`}>
        <div className='d-flex my-3 align-items-center'>
            <img style={{ width: '1.5vw' }} src={process.env.PUBLIC_URL + '/asset/images/shieldicon.webp'} />
            <strong className='mx-2'>{t('heal&beauty')}</strong>
        </div>
        <div className={`${styles.favouriteGrid}`}>
            <div className={styles.favouriteItem1}></div>
            <div className={styles.favouriteItem2}></div>
            <div className={styles.favouriteItem3}>
                <div className={styles.item3Gird}>
                    {['Child1', 'Child2', 'Child3', 'Child4'].map((child, index) => (
                        <div key={index}
                            className={styles[child]}
                            onClick={() => navigate('/flashsale')}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    </div>
}



export default Favourite