// components/ProductCard.jsx
import styles from './ProductItem.module.scss';

const ProductItem = ({ product}) => {
  return <div className={`${styles.carouselCard} card`}>
    <div className={`${styles.carouselCardBody} card-body`}>
      <img className={styles.productImage} src={`${process.env.PUBLIC_URL} ${product.image}`} alt="..." />
      <div className={styles.dealSockContainer} >
        <div className={styles.dealSock}  >
          <i className={`${styles.dealsockIcon} fa-solid fa-fire mx-1`} />
          <span className={styles.dealsockContent}>Giá cực sốc</span>
        </div>
      </div>
      <div className={styles.cardDescription}><strong>{product.description}</strong></div>
      <div className={styles.price}>
        <strong className={styles.newPrice} >{product.price.toLocaleString('vi-VN')}₫</strong>
        <div className={styles.oldPrice}>399.000₫ -10%</div>
      </div>
      <button className={styles.cardButton}>Mua Ngay</button>
    </div>
  </div>

};

export default ProductItem;
