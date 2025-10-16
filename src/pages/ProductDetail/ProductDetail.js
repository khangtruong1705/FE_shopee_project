import styles from './ProductDetail.module.scss'
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { getAmountCartApi } from '../../redux/reducers/getAmountCart'
import { useFormik } from 'formik'
import { DOMAIN } from '../../util/config';
import { Button, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/effect-fade';
import { FreeMode, Navigation, Pagination, Thumbs, EffectFade } from 'swiper/modules';
import { productInfoDetail } from './productDetailRawData'



const ProductDetail = () => {
    const dispatch = useDispatch();
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const { t } = useTranslation();
    const token = localStorage.getItem('token');
    const navigate = useNavigate()
    const { productid } = useParams();
    const [shopName, setShopName] = useState({});
    const [comments, setComments] = useState([]);
    const [product, setProduct] = useState({});
    const images = [
        product.image,
        'https://picsum.photos/id/1015/600/400',
        'https://picsum.photos/id/1019/600/400',
        'https://picsum.photos/id/1020/600/400',
    ];
    let user_id = null;
    notification.config({
        placement: 'topLeft',
        top: 60,
        duration: 1
    });
    if (token && typeof token === 'string') {
        try {
            const decoded = jwtDecode(token);
            user_id = decoded.user_id;
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    }
    const frm = useFormik({
        initialValues: {
            comment: ''
        },
        onSubmit: async (values, { resetForm }) => {
            try {
                const dataComment = {
                    'user_id': user_id,
                    'product_id': productid,
                    'comment_content': values.comment
                }
                let res = await axios.post(`${DOMAIN}/api/comments/add-comment-by-productid`, dataComment);
                setComments((prevComments) => [...prevComments, res.data]);
                resetForm();
            } catch (error) {
                console.log(error)
                notification.warning({
                    message: 'Cảnh báo',
                    description: t('needlogin'),
                });
                setTimeout(() => {
                    navigate(`/login`)
                }, 1200);
            }
        }
    });
    const addProducttocart = async (item) => {
        try {
            const response = await axios.post(`${DOMAIN}/api/carts/add-product-to-cart-by-productid`, item);
            notification.success({
                message: 'Thành công',
                description: 'Thêm vào giỏ hàng thành công !!!',
            });
            setProduct(response.data);
        } catch (error) {
            notification.warning({
                message: 'Cảnh báo',
                description: error.response.data.detail,
            });
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`${DOMAIN}/api/products/get-product-by-productid/${productid}`);
            setProduct(response.data);
            const responseComments = await axios.get(`${DOMAIN}/api/comments/get-comments-by-productid/${productid}`);
            setComments(responseComments.data);
            const responseShopName = await axios.get(`${DOMAIN}/api/shop-name/get-shop-name-by-productid/${productid}`);
            setShopName(responseShopName.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    const ratingData = [
        { stars: 5, count: 8 },
        { stars: 4, count: 8 },
        { stars: 3, count: 0 },
        { stars: 2, count: 0 },
        { stars: 1, count: 0 },
    ];
    useEffect(() => {
        fetchData()
    }, [productid])
    return <>
        <div className='mb-4' style={{ height: '1rem' }}></div>
        <div className={`${styles.card1} card w-75 mx-auto`}>
            <div className='card-body d-flex justify-content-between'>
                <div className={styles.galleryWrapper}>
                    {thumbsSwiper && !thumbsSwiper.destroyed && (
                        <Swiper
                            spaceBetween={10}
                            effect="fade"
                            navigation={true}
                            pagination={{ clickable: true }}
                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[Thumbs, Pagination, EffectFade, Navigation, FreeMode]}
                            className={styles.mainSwiper}
                        >
                            {images.map((img, idx) => (
                                <SwiperSlide key={idx}>
                                    <img
                                        src={img}
                                        alt={`image-${idx}`}
                                        className={styles.mainImage}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={10}
                        slidesPerView={4}
                        watchSlidesProgress={true}
                        modules={[Thumbs, Navigation, FreeMode]}
                        className={styles.thumbsSwiper}
                    >
                        {images.map((img, idx) => (
                            <SwiperSlide key={idx}>
                                <img src={img} alt={`thumb-${idx}`} className={styles.thumbImage} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className={styles.itemInfoContainer}>
                    <div className={styles.itemInfo}>
                        <div className={styles.itemInfo1}>
                            <div className={`${styles.itemInfo11} me-2`}>
                                <i className="fa-solid fa-thumbs-up me-1" />
                                <strong>TOP DEAL</strong>
                            </div>
                            <div className={`${styles.itemInfo12} me-2`}>
                                <i className="fa-solid fa-box me-1" />
                                <strong>30 NGÀY ĐỔI TRẢ</strong>
                            </div>
                            <div className={`${styles.itemInfo13} me-2`}>
                                <i className="fa-solid fa-circle-check me-1" />
                                <strong>CHÍNH HÃNG</strong>
                            </div>
                        </div>
                        <div>
                            <span style={{ fontSize: '1.2vw', fontWeight: '500' }}>{product.description}</span>
                        </div>
                        <div className="p-1 d-flex left ">
                            <div className="border-end pe-3">{product.rating}
                                {[...Array(5)].map((_, index) => (
                                    <i key={index} className={`${styles.star} fa-solid fa-star`} />
                                ))}
                            </div>
                            <div className="border-end px-3">334 {t('reviews')}</div>
                            <div className="border-end px-3" >{product.sold} {t('sold')}</div>
                        </div>
                    </div>
                    <div className={styles.price}>
                        <strong>{product.price?.toLocaleString('vi-VN')}₫</strong>
                    </div>
                    <div className={styles.infoGrid}>
                        {productInfoDetail.map((item, index) => (
                            <React.Fragment key={index}>
                                <div className={styles.label}>{item.label}</div>
                                <div className={styles.value}>{item.value}</div>
                            </React.Fragment>
                        ))}
                    </div>
                    <div className={`${styles.buttonContainer} my-3`} >
                        <Button
                            className={`${styles.addToCardButton} p-4 me-3`}
                            onClick={async () => {
                                if (user_id === null) {
                                    notification.warning({
                                        message: 'Cảnh báo',
                                        description: 'Bạn cần đăng nhập !!!',
                                    });

                                    navigate(`/login`)
                                    return
                                }
                                let item = {
                                    'user_id': user_id,
                                    'total_amount': product.price,
                                    'status': 'pending',
                                    'created_at': new Date(),
                                    'updated_at': new Date(),
                                    product_id: product.product_id
                                }
                                await addProducttocart(item);
                                const actionAsyns = await getAmountCartApi(user_id);
                                dispatch(actionAsyns);
                                setTimeout(() => {
                                    navigate('/')
                                }, 1000);
                            }}> {t('addtocart')}
                            <i className='fa-solid fa-cart-shopping' />
                        </Button>
                        <Button
                            className={`${styles.buttonBuyNow} p-4`}
                            onClick={async () => {
                                if (user_id === null) {
                                    notification.warning({
                                        message: 'Cảnh báo',
                                        description: 'Bạn cần đăng nhập !!!',
                                    });
                                    navigate(`/login`)
                                    return
                                } let item = {
                                    'user_id': user_id,
                                    'total_amount': product.price,
                                    'status': 'pending',
                                    'created_at': new Date(),
                                    'updated_at': new Date(),
                                    product_id: product.product_id
                                }
                                await addProducttocart(item);
                                const actionAsyns = await getAmountCartApi(user_id);
                                dispatch(actionAsyns);
                                setTimeout(() => {
                                    navigate('/cart', { state: { scrollToProductId: product.product_id } })
                                }, 1000);
                            }}
                        > {t('buynow')}
                            <i className="fa-solid fa-money-bill-trend-up" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
        <div className={`${styles.card2} card w-75 mx-auto mb-5`}>
            <div className={`${styles.card2Container}`}>
                <div className={`${styles.shopName}`} >
                    <div className={`${styles.shopNameLogo} p-3`}>
                        <img src={`${process.env.PUBLIC_URL}${shopName.image}`} />
                    </div>
                    <div className={`${styles.shopNameName}`}>
                        <h5 >{shopName.name}</h5>
                        <NavLink className={`${styles.viewshopName} border border-primary`} to={`/shopname/${shopName.shop_name_id}`} state={{ fromProductId: productid }} >
                            {t('view')} Shop
                            <i className="fa-solid fa-hand-point-left mx-2" />
                        </NavLink>
                    </div>
                </div>
                <h5 className='text-center'>{t('rating')} :{shopName.rating}<i style={{ color: '#fbff00' }} className='fa-solid fa-star' /></h5>
                <h5 className='text-center'>{t('joindate')}:{shopName.created_at}</h5>
            </div>
        </div>
        {/* <div className='detailinfo card w-75 mx-auto' style={{ fontSize: '1vw' }}>
            <div className='iteminfo w-50'>
                {productInfo.map((item, index) => (
                    <div key={index} className='d-flex justify-content-between'>
                        <div>{item.label}</div>
                        <div>{item.value}</div>
                    </div>
                ))}
            </div>
            <div className='itemdescribe'>
                <div>
                    <h3 style={{ fontSize: '1.6vw' }}>MÔ TẢ SẢN PHẨM</h3>
                    Hương đầu: Cam Bergamot, Tiêu
                    Hương giữa: Tiêu Sichuan, Hoa Oải Hương, Tiêu Hồng, Cỏ Hương Bài, Hoắc Hương, Phong Lữ, Nhựa Elemi
                    Hương cuối: Ambroxan, Tuyết Tùng, Labannum

                    Ra mắt từ năm 2015, với tuổi đời của chỉ vỏn vẹn 7 năm nhưng điều đó cũng không thể cản trở Sauvage trở thành một trong những chai nước hoa kinh điển nhất . Mặc cho rất nhiều ý kiến trái chiều về Dior Sauvage, không ai có thể phủ nhận rằng đây là một mùi hương rất nam tính và quyến rũ.

                    Những đặc điểm nổi bật về mùi hương của Sauvage là một mùi hương Xanh, nam tính và nịnh mũi với các nốt hương chủ đạo của Cam Chanh, hòa quyện với vị cay cay, mạnh mẽ của Tiêu và kết lại với nốt hương Ambroxan - nguyên liệu lấy cảm hứng từ món quà của đại dương, Long Diên Hương. Luôn đứng đầu danh sách những chai nước hoa được săn đón, phổ biến nhất, nhưng mùi hương của Sauvage vẫn luôn giữ vững được phong độ, không hề mờ nhạt trước muôn vàn ấn phẩm mùi hương khác.

                    Không chỉ xứng đáng sở hữu vì mùi hương mà độ bám tỏa của Sauvage chắc chắn cũng sẽ làm bạn hài lòng. Đảm bảo Sauvage sẽ mang lại cho bạn một trải nghiệm, hình ảnh của một người đàn ông nam tính, lịch lãm và có đôi phần hoang dã, phong trần như Johnny Depp trong chiến dịch quảng cáo cho mùi hương này.
                </div>
            </div>
        </div> */}
        <div className={`${styles.card3} card w-75 mx-auto`}>
            <div style={{ fontSize: '1.3vw', fontWeight: '500' }} className='mx-2'>Câu hỏi thường gặp</div>
            <div style={{ border: 'none' }}>
                <div className="accordion accordion-flush" id="accordionFlushExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                <span className='me-2' style={{ background: '#6a7888', padding: '0.2vw 0.4vw', borderRadius: '99px', color: 'white' }}>
                                    <i className="fa-solid fa-question" />
                                </span>
                                Nguồn Gốc Sản Phẩm?
                            </button>
                        </h2>
                        <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item’s accordion body.</div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                <span className='me-2' style={{ background: '#6a7888', padding: '0.2vw 0.4vw', borderRadius: '99px', color: 'white' }}>
                                    <i className="fa-solid fa-question" />
                                </span>
                                Quốc Gia Sản Xuất?
                            </button>
                        </h2>
                        <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item’s accordion body. Let’s imagine this being filled with some actual content.</div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                <span className='me-2' style={{ background: '#6a7888', padding: '0.2vw 0.4vw', borderRadius: '99px', color: 'white' }}>
                                    <i className="fa-solid fa-question" />
                                </span>
                                Chính Sách Bảo Hành?
                            </button>
                        </h2>
                        <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item’s accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                <span className='me-2' style={{ background: '#6a7888', padding: '0.2vw 0.4vw', borderRadius: '99px', color: 'white' }}>
                                    <i className="fa-solid fa-question" />
                                </span>
                                Chính Sách Vận Chuyển?
                            </button>
                        </h2>
                        <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item’s accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className={`${styles.card4} card`}>
            <div style={{ fontSize: '1.6vw', fontWeight: '500' }}>{t('rating')} {t('product')}</div>
            <hr></hr>
            <div className='d-flex'>
                <div>
                    <div style={{ fontSize: '1.2vw' }}>Trung Bình</div>
                    <div style={{ fontSize: '1.9vw' }}>
                        <span >5</span>
                        <i style={{ color: '#fbff00' }} className='fa-solid fa-star' />
                    </div>
                    <button style={{ padding: '0.6vw', background: '#225fe0', color: 'white', border: 'none', borderRadius: '99px' }}>Gửi đánh giá</button>

                </div>
                <div className='mx-2'>
                    {ratingData.map((item, idx) => (
                        <div key={idx} className="d-flex align-items-center">
                            <div className="d-flex">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <i
                                        key={i}
                                        className="fa-solid fa-star"
                                        style={{ color: i <= item.stars ? '#fbff00' : '#ccc' }}
                                    />
                                ))}
                            </div>
                            <div
                                style={{
                                    height: '0.5vw',
                                    background: 'linear-gradient(to right, #fca81c, #fca81c)',
                                    borderRadius: '999px',
                                    marginLeft: '0.9vw',
                                    marginRight: '0.9vw',
                                    minWidth: '15vw',
                                }}
                            ></div>
                            <div>{item.count}</div>
                        </div>
                    ))}
                </div>
            </div>
            <hr></hr>
            <div className={styles.commentcontainer}>
                <div className='d-flex justify-content-around align-items-center w-50 my-3'>
                    <div>Lọc Theo:</div>
                    <button style={{ padding: '0.3vw 1.2vw', background: '#225fe0', color: 'white', border: 'none', borderRadius: '99px' }}>5 sao</button>
                    <button style={{ padding: '0.3vw 1.2vw', background: '#225fe0', color: 'white', border: 'none', borderRadius: '99px' }}>4 sao</button>
                    <button style={{ padding: '0.3vw 1.2vw', background: '#225fe0', color: 'white', border: 'none', borderRadius: '99px' }}>3 sao</button>
                    <button style={{ padding: '0.3vw 1.2vw', background: '#225fe0', color: 'white', border: 'none', borderRadius: '99px' }}>2 sao</button>
                    <button style={{ padding: '0.3vw 1.2vw', background: '#225fe0', color: 'white', border: 'none', borderRadius: '99px' }}>1 sao</button>
                </div>
                <div className={styles.commentcontent}>
                    {comments?.map((comment, index) => {
                        return <div key={index}>
                            <div className='avatar d-flex align-items-center'>
                                <img className={`${styles.avatarimage}`} src={process.env.PUBLIC_URL + '/asset/images/ngau1.webp'} />
                                <div className='mx-2' style={{ fontWeight: '500', color: '#225fe0' }}>khang123</div>
                            </div>
                            <div>{comment.created_at}</div>
                            <div>
                                {comment.comment_content}
                            </div>
                            <hr></hr>
                        </div>
                    })}
                    <form onSubmit={frm.handleSubmit} className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">{t('comment')}</label>
                        <textarea id='comment'
                            name='comment'
                            className="form-control"
                            onChange={frm.handleChange}
                            onBlur={frm.handleBlur}
                            rows={3}
                            value={frm.values.comment} />
                        <button className='mt-4 px-3'>{t('submit')}
                        </button>
                    </form>
                </div>
            </div>
        </div>
        <div className='py-5' style={{ background: '#f5f5f5' }}></div>
    </>

};

export default ProductDetail