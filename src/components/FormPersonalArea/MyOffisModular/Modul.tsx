import React, {
	FC,
	useEffect,
	useState,
	ChangeEventHandler,
} from 'react'
import Photo from '../../../assets/images/Photo.svg'
import classes from './Modul.module.scss'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ISellerUser } from '../../../store/modules'
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks'
import { fetchByChangeUserData } from '../../../store/slice/userSlice'
import { pathLink } from '../../../reused'
import SuccessChange from '../SuccessChange/SuccessChange'

interface ModalProps {
	closeModal: () => void
}

const compareObjects = (obj1: ISellerUser, obj2: ISellerUser) => {
	// Сравниваем значения каждого свойства
	for (const key in obj1) {
		if (obj1.hasOwnProperty(key)) {
			if (obj1[key] !== obj2[key]) {
				// Если значения свойств различаются, возвращаем false
				return false;
			}
		}
	}
	// Если все свойства совпадают, возвращаем true
	return true;
}

const Modal: FC<ModalProps> = ({ closeModal }) => {
	const [file, setFile] = useState<string | File>('')
	const [changeError, setChangeError] = useState(false)
	const dispatch = useAppDispatch()
	const { user, token, loading, error, success_changedata_modal } = useAppSelector(state => state.user)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, defaultValues },
	} = useForm<ISellerUser>({
		defaultValues: {
			tin: user?.seller_user?.tin,
			container_name: user?.seller_user?.container_name,
			whatsapp_number: user?.seller_user?.whatsapp_number,
			telegram_link: user?.seller_user?.telegram_link,
			instagram_link: user?.seller_user?.instagram_link,
			description: user?.seller_user?.description,
		},
	})

	const fetchData = (data: ISellerUser) => {
		token &&
			user?.seller_user?.id &&
			dispatch(
				fetchByChangeUserData({
					token,
					id: user?.seller_user?.id,
					seller_user: { ...data, user: user.seller_user.user, avatar: file || null },
				})
			)
	}

	const onSubmit: SubmitHandler<ISellerUser> = data => {
		if (!user?.seller_user) return
		const newData = data
		delete newData.avatar

		if (compareObjects(defaultValues as ISellerUser, newData)) {
			if (file) {
				fetchData(data)
			} else {
				setChangeError(true)
			}
		} else {
			changeError && setChangeError(false)
			fetchData(data)
		}
	}

	const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation()
		closeModal()
	}

	const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation()
	}

	const fileSelectedHandler: ChangeEventHandler<HTMLInputElement> = event => {
		const files = event.target.files
		if (files && files.length > 0) {
			setFile(files[0])
		}
	}

	useEffect(() => {
		// Обновление данных в форме после успешной отправки запроса
		if (user) {
			reset(defaultValues)
		}
	}, [user, dispatch])

	useEffect(() => {
		// При нажатии на ESC закрыть модальное окно
		document.addEventListener('keydown', e => {
			e.code === 'Escape' && closeModal()
		})

		// При открытой модалке, меняем нажатие кнопки назад на закрытие
		// модального окна, после возвращаем
		window.history.pushState(null, "", window.location.href);
		window.onpopstate = (e) => {
			closeModal()
		};

		return () => {
			window.onpopstate = () => { };
			document.removeEventListener('keydown', () => { })
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			})
		}
	}, [dispatch])

	return (
		<>
			<div onClick={handleBackgroundClick} className={classes.modal_block}>
				<div onClick={handleModalClick} className={classes.modal_content}>
					<h1>Данные продавца</h1>
					<br />
					<form onSubmit={handleSubmit(onSubmit)}>
						<ul>
							<li className={classes.photo_upload}>
								<input
									type='file'
									id='file-upload'
									placeholder='Добавить фото'
									{...register('avatar')}
									onChange={fileSelectedHandler}
									accept='image/*'
								/>

								<label
									htmlFor='file-upload'
									className={classes.custom_file_upload}
								>
									<div>
										{file instanceof File ? (
											<img
												className={classes.image_form}
												src={URL.createObjectURL(file)}
												alt='Photos'
											/>
										) : (
											<img
												src={
													user?.seller_user?.avatar
														? user.seller_user.avatar.toString().startsWith('http')
															? `${user.seller_user.avatar}`
															: pathLink + user?.seller_user?.avatar
														: Photo
												}
												className={
													user?.seller_user?.avatar
														? `${classes.image_form}`
														: `${classes.photo}`
												}
												alt='User Seller'
											/>
										)}
									</div>
									{user?.seller_user?.avatar ? 'Изменить фото' : 'Добавить фото'}
								</label>

								{errors.avatar && (
									<div className={classes.error_text}>
										{errors.avatar?.message}
									</div>
								)}
							</li>
							<br />
							<li>
								<label htmlFor='inn-input'>Введите Инн <span style={{ color: 'red' }}>*</span></label>
								<input
									{...register('tin', {
										required: 'ИНН обязательное поле',
									})}
									type='string'
									id='inn-input'
									placeholder='Инн'
								/>
								{errors.tin && (
									<div className={classes.error_text}>{errors.tin?.message}</div>
								)}
							</li>
							<li>
								<label htmlFor='container-number-input'>
									Название контейнера <span style={{ color: 'red' }}>*</span>
								</label>
								<input
									{...register('container_name', {
										required: 'Название контейнера обязательное поле',
									})}
									type='text'
									id='container-number-input'
									placeholder='Название контейнера'
								/>
								{errors.container_name && (
									<div className={classes.error_text}>
										{errors.container_name?.message}
									</div>
								)}
							</li>
							<li>
								<label htmlFor='telegram-input'>
									Ссылка Telegram
									<p>Не обязательно</p>
								</label>
								<input
									{...register('telegram_link')}
									type='text'
									id='telegram-input'
									placeholder='Telegram'
								/>
							</li>
							<li>
								<label htmlFor='whatsapp-input'>
									Номер WhatsApp <span style={{ color: 'red' }}>*</span>
									<p>Обязательно</p>
								</label>
								<input
									{...register('whatsapp_number', {
										required: 'Номер WhatsApp обязательное поле',
									})}
									type='text'
									id='whatsapp-input'
									placeholder='+996XXXXXXXXX'
								/>
								{errors.whatsapp_number && (
									<div className={classes.error_text}>{errors.whatsapp_number.message}</div>
								)}
							</li>
							<li>
								<label htmlFor='instagram-input'>
									Ссылка Instagram
									<p>Не обязательно</p>
								</label>
								<input
									{...register('instagram_link')}
									type='text'
									id='instagram-input'
									placeholder='Instagram'
								/>
							</li>
							<li>
								<label htmlFor='instagram-input'>
									Описание
									<p>Не обязательно</p>
								</label>
								<textarea
									{...register('description')}
									rows={4}
									cols={50}
									placeholder={'Описание'}
									className={classes.description}
								></textarea>
							</li>
							<li className={classes.form_button}>
								{error && <span className={classes.error_text}>{error}</span>}
								{changeError && <span className={classes.error_text}>Изменений не было.</span>}
								<button disabled={loading} type='submit'>
									{loading ? 'Загрузка' : 'Сохранить'}
								</button>
							</li>
						</ul>
					</form>
				</div>
			</div>
			{success_changedata_modal && <SuccessChange closeModal={closeModal} />}
		</>
	)
}

export default Modal
