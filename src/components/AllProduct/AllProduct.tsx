import React, { FC, useEffect } from 'react';
import s from './AllProduct.module.scss'
import basket from '../../assets/Product/images/basket.png'
import test from '../../assets/Product/images/test.png'
import { Link } from 'react-router-dom';
import { IProductCard } from '../../store/modules';
import AddToCart from '../Cart/AddToCart/AddToCart';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const AllProduct: FC<IProductCard> = ({ image, name, price, id, seller, sub_category_name, container_name }) => {
	const product = {
		image,
		name,
		price,
		id,
		seller,
		sub_category_name,
		container_name
	}



	return (
		<Link className={s.card} to={`/detail-card/${id}/${container_name}/${name}`}>
			{/* <img className={s.product_image} src={image || test} alt="images" /> */}
			<LazyLoadImage
				alt={`Photo by ${name}`}
				effect="blur"
				src={`https${image.slice(4)}` || test}
				className={s.product_image}
			/>
			<h2 title={name} className={s.name}>{name}</h2>
			<div className={s.card_bottom}>
				<h3 className={s.price}>{price}</h3>
				<AddToCart product={product}>
					<img title='В корзину' className={s.basket} src={basket} alt="basket" />
				</AddToCart>
			</div>
		</Link>
	);
};

export default AllProduct;