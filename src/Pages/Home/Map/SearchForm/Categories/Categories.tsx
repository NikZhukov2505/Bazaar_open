import React, { FC, useEffect, useState } from 'react'
import s from './Categories.module.scss'
import CategoryList from './CategoryList/CategoryList'
import { useLocation, useSearchParams } from 'react-router-dom'
import { useAppDispatch } from '../../../../../store/hooks/hooks'
import { getStoresByCategories } from '../../../../../store/slice/storesSlice'
import arrow from '../../../../../assets/images/arrow.png'

interface CategoriesProps {
	clearParams: () => void
}

const Categories: FC<CategoriesProps> = ({ clearParams }) => {
	const dispatch = useAppDispatch()
	const [show, setShow] = useState(false)
	const [searchParams, setSearchParams] = useSearchParams();
	const [category, setCategory] = useState(searchParams.get('c') || '')
	const [subCategory, setSubCategory] = useState(searchParams.get('sub') || '')
	const location = useLocation()

	const hide = () => {
		setShow(false)
	}

	const handleFilter = (cat_id: string, sub_id: string = '') => {
		const search = searchParams.get('search')
		if (search) {
			searchParams.delete('search')
		}
		setCategory(cat_id)
		setSubCategory(sub_id)
		setSearchParams({ c: cat_id, sub: sub_id })
		hide()
	}

	useEffect(() => {
		const cat = searchParams.get('c')
		if (cat) {
			setCategory(cat)
		} else {
			setCategory('')
		}
		const sub = searchParams.get('sub')
		if (sub) {
			setSubCategory(sub)
		} else {
			setSubCategory('')
		}
	}, [dispatch, location.search])

	useEffect(() => {
		if (category || subCategory) {
			dispatch(getStoresByCategories({ cat_id: category, sub_id: subCategory }))
		}

	}, [dispatch, category, subCategory])


	return (
		<div onClick={() => setShow(!show)} className={s.categories}>
			<div className={s.category_wrapper}>
				<h2 className={s.category_title}>
					Категории
				</h2>
				<img className={`${s.arrow} ${show && s.open}`} src={arrow} alt="arrow" />
				{show && <CategoryList
					clearParams={clearParams}
					handleFilter={handleFilter}
					hide={hide} show={show} />}
			</div>
		</div>
	)
}

export default Categories
