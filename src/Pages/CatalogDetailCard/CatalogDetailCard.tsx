import React, { FC, useEffect, useState } from 'react';
import s from './CatalogDetailCard.module.scss'
import detail_small from '../../assets/DetailCard/images/detail_small.png'
import detail_big from '../../assets/DetailCard/images/detail_big.png'
import LightGallery from 'lightgallery/react'
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import './CatalogDetailCard.scss'
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { clearProduct, fetchByDetailInfo } from '../../store/slice/containerSlice';
import AddToCart from '../../components/Cart/AddToCart/AddToCart';
import { Helmet } from 'react-helmet-async';
import arrow from '../../assets/images/arrow.png'
import wh from '../../assets/images/whatsapp.png'
import insta from '../../assets/images/insta.png'
import tg from '../../assets/images/Telegram_2019_Logo.svg.png'

const CatalogDetailCard: FC = () => {
	const dispatch = useAppDispatch()
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
	const { detail_product } = useAppSelector(state => state.container)
	const { id, item_name, store_name } = useParams()
	const navigate = useNavigate()

	const product = detail_product && {
		image: detail_product?.image,
		name: detail_product?.name,
		price: detail_product?.price,
		id: detail_product?.id,
		seller: detail_product?.seller,
		sub_category_name: detail_product?.sub_category_name,
		container_name: detail_product.container_name
	}

	const goBack = () => {
		navigate(-1)
	}


	useEffect(() => {
		if (id) {
			dispatch(fetchByDetailInfo(+id))
		}

		return () => {
			dispatch(clearProduct())
		}
	}, [id, dispatch])

	return (
		<>
			<Helmet>
				<meta property="og:title" content={`${item_name} | Bazaar Jok`} />
				<meta name="twitter:title" content={`${item_name} | Bazaar Jok`} />
				<link rel="canonical" href={`https://bazarjok.com/detail-card/${id}/${store_name}/${item_name}`} />
				<title>{item_name ? item_name : ''} | {store_name} | Bazaar Jok</title>
			</Helmet>
			{
				product &&
				<LightGallery
					selector='.gallery_item'
					speed={500}
					plugins={[lgThumbnail, lgZoom]}
				>
					<div className={s.container}>
						<div className={s.top_info_wrapper}>
							<div onClick={goBack} className={s.arrow}>
								<img src={arrow} alt="arrow" />
							</div>
							<h1 className={s.title}>{store_name} / {detail_product.category_name} / {detail_product.sub_category_name}</h1>
						</div>
						<div className={s.wrapper}>
							<div className='display'>
								<Swiper
									loop={detail_product?.images && detail_product?.images.length > 0 ? true : false}
									spaceBetween={10}
									thumbs={{ swiper: thumbsSwiper }}
									modules={[FreeMode, Navigation, Thumbs]}
									className="mySwiper2"
								>
									<SwiperSlide className='cursor' >
										<a className='gallery_item' href={`https${detail_product?.image.slice(4)}`}>
											<img src={`https${detail_product?.image.slice(4)}`} />
										</a>
									</SwiperSlide>
									{
										detail_product?.images &&
										detail_product?.images.length > 0 &&
										detail_product.images.map(el => (
											<SwiperSlide key={el.id} className='cursor' >
												<a className='gallery_item' href={`https${el.image.slice(4)}`}>
													<img src={`https${el.image.slice(4)}`} />
												</a>
											</SwiperSlide>
										))
									}
								</Swiper>
								<Swiper
									onSwiper={setThumbsSwiper}
									spaceBetween={10}
									slidesPerView={4.5}
									freeMode={true}
									watchSlidesProgress={true}
									modules={[FreeMode, Navigation, Thumbs]}
									direction='vertical'
									className="mySwiper"
								>
									<SwiperSlide className='cursor' >
										<img src={`https${detail_product?.image.slice(4)}`} />
									</SwiperSlide>
									{
										detail_product?.images &&
										detail_product?.images.length > 0 &&
										detail_product.images.map(el => (
											<SwiperSlide key={el.id} className='cursor' >
												<img src={`https${el.image.slice(4)}`} />
											</SwiperSlide>
										))
									}
								</Swiper>
							</div>

							<div className={s.product_info}>
								<h2 className={s.product_name}>{detail_product?.name}</h2>
								<h3 className={s.price}>{detail_product?.price} сом</h3>
								<p className={s.description}>{detail_product?.description}</p>
								<div className={s.social_wrapper}>
									{
										detail_product.whatsapp_number &&
										<a className={s.whA} href={`https://wa.me/${detail_product?.whatsapp_number}?text=Здравствуйте,%20понравился%20этот%20товар%20на%20сайте%20https://bazarjok.com/detail-card/${id}/${store_name}/${item_name}`} target="_blank" rel='noopener noreferrer'>
											<p>Связатся в WhatsApp</p>
											<img src={wh} alt="img" />
										</a>
									}
									{
										detail_product.instagram_link &&
										<a className={s.instA} href={detail_product?.instagram_link} target="_blank" rel='noopener noreferrer'>
											<p>Связатся в Instagram</p>
											<img className={s.inst} src={insta} alt="img" />
										</a>
									}
									{
										detail_product.telegram_link &&
										<a className={s.tg}
											href={detail_product?.telegram_link.startsWith('https')
												? detail_product?.telegram_link : `https://t.me/${detail_product?.telegram_link.startsWith('+')
													? detail_product?.telegram_link : detail_product?.telegram_link.startsWith('@')
														? detail_product?.telegram_link.slice(1) : detail_product?.telegram_link}`}
											target="_blank" rel='noopener noreferrer'>
											<p>Связатся в Telegram</p>
											<img src={tg} alt="img" />
										</a>
									}
								</div>
								<AddToCart product={product}>
									<button className={s.btn}>Добавить в корзину</button>
								</AddToCart>

							</div>
						</div>
					</div>
				</LightGallery>
			}
		</>
	);
};

export default CatalogDetailCard;