import React, { FC, FormEventHandler, useEffect, useState } from 'react'
import s from './AddProductForm.module.scss'
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks'
import { fetchByAllCategory } from '../../../store/slice/addProductSlice'
import { IAddProductsCard, ISubCategory } from '../../../store/modules'
interface AddProductFormProps {
	handleAddProduct: FormEventHandler<HTMLFormElement>
	setProductCard: (e: IAddProductsCard) => void
	setCategories: (e: string) => void
	productCard: IAddProductsCard
	categories: string
	errorText: string
	query: string | null
}
const AddProductForm: FC<AddProductFormProps> = ({
	handleAddProduct,
	setProductCard,
	productCard,
	errorText,
	query,
	setCategories,
	categories,
}) => {
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(fetchByAllCategory())
	}, [dispatch])
	const [subCategories, setSubCategories] = useState<ISubCategory[]>([])
	const getProductCard = (key: string, value: string) => {
		setProductCard({ ...productCard, [key]: value.trimStart() })
	}
	const { category } = useAppSelector(state => state.addProductSlice)
	// console.log(category)

	useEffect(() => {
		if (categories) {
			category.filter(
				el => el.name === categories && setSubCategories(el.sub_categories)
			)
		} else if (categories === '') {
			setSubCategories([])
		}
	}, [categories])

	return (
		<form onSubmit={handleAddProduct} className={s.add_form}>
			<div className={s.field_to_fill}>
				<div className={s.left_part}>
					<div
						className={
							errorText.includes('Введите название!')
								? `${s.error_text} ${s.left_part_field}`
								: s.left_part_field
						}
					>
						<h2>Введите название</h2>
						<input
							value={productCard.name}
							onChange={e => getProductCard('name', e.target.value)}
							className={s.text_field}
							type='text'
							placeholder='Название'
						/>
					</div>
					<div
						className={
							errorText.includes('Введите описание!')
								? `${s.error_text} ${s.left_part_field}`
								: s.left_part_field
						}
					>
						<h2>Введите Описание</h2>
						<textarea
							onChange={e => getProductCard('description', e.target.value)}
							value={productCard.description}
							rows={4}
							cols={50}
							placeholder='Описание'
							className={s.description}
						></textarea>
					</div>
					<div
						className={
							errorText.includes('Введите стоимость!') ||
								errorText.includes('Стоимость должен быть менее 9999999999сом!')
								? `${s.error_text} ${s.left_part_field}`
								: s.left_part_field
						}
					>
						<h2>Введите Стоимость</h2>
						<input
							value={productCard.price}
							onChange={e => getProductCard('price', e.target.value)}
							className={s.text_field}
							type='number'
							placeholder='Стоимость'
						/>
					</div>
				</div>
				<div className={s.right_part}>
					<div className={s.right_part_field}>
						<h2>Выберите Категорию</h2>
						<div className={s.select}>
							<select
								value={categories}
								onChange={e => setCategories(e.target.value)}
							>
								<option disabled value=''>Выберите категорию</option>
								{category.length > 0 &&
									category.map(el => (
										<option key={el.id} value={el.name}>
											{el.name}
										</option>
									))}
							</select>
							<div className={s.select_arrow}></div>
						</div>
					</div>
					{subCategories.length > 0 && (
						<div
							className={
								errorText.includes('Введите подкатегорию!')
									? `${s.error_text} ${s.right_part_field}`
									: s.right_part_field
							}
						>
							<h2>Выберите подкатегорию</h2>
							<div className={s.select}>
								<select
									value={
										productCard.sub_category ? productCard.sub_category : ''
									}
									onChange={e => getProductCard('sub_category', e.target.value)}
								>
									<option disabled value=''>Выберите подкатегорию</option>

									{subCategories.length > 0 &&
										subCategories.map(el => (
											<option key={el.id} value={el.id}>
												{el.name}
											</option>
										))}
								</select>
								<div className={s.select_arrow}></div>
							</div>
						</div>
					)}
				</div>
			</div>
			<div className={s.button_form}>
				<h2>{errorText}</h2>
				<button>{query ? 'Изменить' : 'Сохранить'}</button>
			</div>
		</form>
	)
}

export default AddProductForm
