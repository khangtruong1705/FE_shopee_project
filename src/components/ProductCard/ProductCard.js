// components/ProductCard.jsx
import { useRef, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { DOMAIN } from '../../util/config';
import styles from './ProductCard.module.css';

const ProductCard = ({ product, t }) => {
  const token = localStorage.getItem('token');
  const handleClick = async () => {
    try {
      const data = token
        ? {
          user_id: jwtDecode(token).user_id,
          product_id: product.product_id,
          name: product.name,
        }
        : {
          user_id: 0,
          product_id: product.product_id,
          name: product.name,
        };

      await axios.post(`${DOMAIN}/api/view-product/add-view-by-productid`, data);
    } catch (error) {
      console.error('error', error);
    }
  };

  return (
    <div className="col-lg-3 col-md-4 col-sm-6">
      <NavLink
        to={`/productdetail/${product.product_id}`}
        className={`${styles.carditem} card m-1`}
      >
        <div className="card-header d-flex" style={{ fontSize: '0.65vw' }}>
          <div
            style={{
              padding: '2px',
              color: '#d93843',
              backgroundColor: '#fff0f1',
              borderRadius: '10px',
            }}
            className="me-2"
          >
            <i className="fa-solid fa-thumbs-up me-1" />
            <strong>TOP DEAL</strong>
          </div>
          <div
            style={{
              padding: '2px',
              color: '#0157e0',
              backgroundColor: '#f2f7ff',
              borderRadius: '10px',
            }}
          >
            <i className="fa-solid fa-circle-check me-1" />
            <strong>CHÍNH HÃNG</strong>
          </div>
        </div>

        <div
          className="card-body"
          style={{ height: '21vw', backgroundColor: '#ffffff' }}
          onClick={handleClick}
        >
          <img
            className="w-100 h-75"
            alt="Product image"
            src={`${process.env.PUBLIC_URL}${product.image}`}
            style={{ border: '1px solid #f85902', borderRadius: '20px' }}
          />
        </div>

        <div className="card-footer" style={{ fontSize: '1vw' }}>
          <div
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            <strong>{product.description}</strong>
          </div>
          <div className="d-flex justify-content-between">
            <strong style={{ color: '#0a68ff' }}>
              {t('sold')}
              <i className="fa-solid fa-shuffle ms-1" /> :{product.sold}
            </strong>
            <strong className="text-center" style={{ color: '#f85902' }}>
              {product.price.toLocaleString('vi-VN')} VNĐ
            </strong>
          </div>
          <strong>
            {Array.from({ length: 5 }).map((_, index) => (
              <i
                key={index}
                className="fa-solid fa-star"
                style={{ color: '#f7d22c' }}
              />
            ))}
            {product.rating}
          </strong>
          <hr />
          <div className="d-flex align-items-center">
            <img
              style={{ width: '2vw', height: '1vw' }}
              src="https://salt.tikicdn.com/ts/tka/a8/31/b6/802e2c99dcce64c67aa2648edb15dd25.png"
              alt="delivery"
            />
            <div
              className="mx-2"
              style={{ color: '#adadb3', fontSize: '0.75vw' }}
            >
              Giao siêu tốc 2h
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default ProductCard;
