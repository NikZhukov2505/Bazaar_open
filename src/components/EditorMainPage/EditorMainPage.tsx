import React, { FC, useEffect } from 'react'
import s from './EditorMainPage.module.scss'
import EditorHeader from './EditorHeader/EditorHeader'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import { fetchByGetProductList } from '../../store/slice/listProduct'
import Loading from '../Loading/Loading'
import ProductList from './ProductList/ProductList'
import EmptyProduct from './EmptyProduct/EmptyProduct'
import { Helmet } from 'react-helmet-async'

const EditorMainPage: FC = () => {
	const dispatch = useAppDispatch()
	const { error, loading, product } = useAppSelector(state => state.listProduct)
	const { user } = useAppSelector(state => state.user)

	useEffect(() => {
		user?.seller_user?.id && dispatch(fetchByGetProductList(user?.seller_user?.id))
	}, [dispatch, user?.seller_user?.id])

	return (
		<div className={s.wrapper}>
			<Helmet>
				<title>Список ваших товаров</title>
			</Helmet>
			<EditorHeader />
			{loading ? (
				<Loading />
			) : error ? (
				<div>{error}</div>
			) : product && product.length > 0 ? (
				product.map(item => <ProductList key={item.id} {...item} />)
			) : (
				<EmptyProduct />
			)}
		</div>
	)
}

export default EditorMainPage
