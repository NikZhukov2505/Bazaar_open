import React, { FC, useState } from 'react'
import s from './ProductList.module.scss'
import { IListProduct } from '../../../store/modules'
import { Link } from 'react-router-dom'
import test from '../../../assets/Product/images/test.png'
import change_icon from '../../../assets/Editor/change_product.png'
import { MdDeleteForever } from "react-icons/md";
import DeleteProduct from './DeleteProduct/DeleteProduct'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const ProductList: FC<IListProduct> = ({
	image,
	name,
	price,
	id,
	container_name
}) => {
	const [show, setShow] = useState(false)

	const hide = () => {
		setShow(false)
	}

	return (
		<>
			<div className={s.card}>
				<Link to={`/detail-card/${id}/${container_name}/${name}`}>
					{/* <img className={s.product_image} src={image || test} alt='images' /> */}
					<LazyLoadImage
						alt={`Photo by ${name}`}
						effect="blur"
						src={`https${image.slice(4)}` || test}
						className={s.product_image}
					/>
				</Link>
				<h2 title={name} className={s.name}>
					{name}
				</h2>
				<div className={s.card_bottom}>
					<h3 className={s.price}>{price}</h3>
					<div className={s.btns_wrapper}>
						<button onClick={() => setShow(true)} className={s.delete_btn}>
							<MdDeleteForever />
						</button>
						<Link to={`/editor?id_card=${id}`}>
							<img src={change_icon} alt='Change_Product_Icon' />
						</Link>
					</div>
				</div>
			</div>
			{show && <DeleteProduct hide={hide} id={id} name={name} />}
		</>
	)
}

export default ProductList
