import React, { FC } from 'react'
import s from './EmptyProduct.module.scss'
import { Link } from 'react-router-dom'

const EmptyProduct: FC = () => {
	return (
		<div className={s.wrapper}>
			<h1>Пока не создано не одного товара!</h1>
			<Link to={'/editor'}>
				<button>Создать товар</button>
			</Link>
		</div>
	)
}

export default EmptyProduct
