import React, { FC, FormEventHandler, useEffect, useState } from 'react'
import s from './FormEnter.module.scss'
import {
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	TextField,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import {
	fetchByLogin,
	setEnter,
	toggleRedirect,
} from '../../store/slice/userSlice'
import { UserLogin } from '../../store/modules'
import { validateEmail } from '../../reused'
import Loading from '../Loading/Loading'
import 'animate.css'

const FormEnter: FC = () => {
	const [showPassword1, setShowPassword1] = useState(false)
	const dispatch = useAppDispatch()
	const { enter } = useAppSelector(state => state.user)
	const { error, loading, redirect } = useAppSelector(state => state.user)
	const [errorText, setErrorText] = useState('')
	const handleClickShowPassword = () => setShowPassword1(show => !show)
	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault()
	}
	const [userData, setUserData] = useState<UserLogin>({
		email: '',
		password: '',
	})

	const getUserData = (key: string, value: string) => {
		setUserData({ ...userData, [key]: value.trim() })
	}

	if (errorText.includes('Email не правильно введён')) {
		!validateEmail(userData.email) && setErrorText('')
	} else if (errorText.includes('Введите пароль!')) {
		userData.password && setErrorText('')
	}

	const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
		e.preventDefault()
		if (!validateEmail(userData.email) && userData.email && userData.password) {
			dispatch(fetchByLogin(userData))
		} else if (validateEmail(userData.email)) {
			setErrorText('Email не правильно введён')
		} else if (!userData.password) {
			setErrorText('Введите пароль!')
		}
	}

	const hideModal = () => {
		dispatch(setEnter(false))
	}

	useEffect(() => {
		if (redirect) {
			dispatch(setEnter(false))
		}
		return () => {
			dispatch(toggleRedirect(false))
		}
	}, [redirect])

	useEffect(() => {
		// При рождении убрать скрол
		document.body.style.overflow = 'hidden'
		// При нажатии на ESC закрыть модальное окно
		document.addEventListener('keydown', e => {
			e.code === 'Escape' && hideModal()
		})
		// При рождении навесит другое событие на кнопку назад у браузера
		if (enter) {
			window.history.pushState(null, '', window.location.href)
			window.onpopstate = () => hideModal()
		}
		return () => {
			// При закрытии  модального окна вернуть скролл
			document.body.style.overflow = 'auto'
			// При закрытии убрать действия с кнопки ESC
			document.removeEventListener('keydown', () => { })
			// При закрытии вернуть действие по умолчанию на кнопку назад в браузере
			window.onpopstate = () => { }
		}
	}, [])

	if (loading) {
		return <Loading />
	}

	return (
		<div className={s.wrapper} onClick={hideModal}>
			<div className={s.container} onClick={e => e.stopPropagation()}>
				<div className={`${s.content} animate__animated animate__slideInDown`}>
					<form onSubmit={handleSubmit} className={s.form}>
						<span onClick={hideModal} className={s.closed}>
							&#10006;
						</span>
						<h2>Вход</h2>
						<div className={s.username}>
							<h3
								className={
									errorText.includes('Email не правильно введён')
										? s.error_text
										: ''
								}
							>
								Введите Логин{' '}
							</h3>
							<TextField
								className={s.input_username}
								value={userData.email}
								onChange={e =>
									getUserData('email', e.target.value.toLowerCase())
								}
								label='Email'
								type='text'
								autoComplete='current-username'

							/>
						</div>
						<div className={s.password}>
							<h3
								className={
									errorText.includes('Введите пароль') ? s.error_text : ''
								}
							>
								Введите Пароль
							</h3>
							<FormControl sx={{ width: '100%' }} variant='outlined'>
								<InputLabel
									htmlFor='outlined-adornment-password'
									className={s.input_text}
								>
									Пароль
								</InputLabel>
								<OutlinedInput
									value={userData.password}
									onChange={e => getUserData('password', e.target.value)}
									className={s.input_password}
									type={showPassword1 ? 'text' : 'password'}
									endAdornment={
										<InputAdornment position='end' sx={{ color: 'white' }}>
											<IconButton
												aria-label='toggle password visibility'
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
												edge='end'
												sx={{ color: 'white' }}
											>
												{showPassword1 ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									}
									label='Password'

								/>
							</FormControl>
							<p className={s.forgot_password}>Забыли пароль?</p>
						</div>
						<div className={s.bottom_login}>
							<h5 className={s.error_text}>
								{error?.includes('Логин или пароль неправильно введён!')
									? error
									: error?.includes('Упс что-то пошло не так попробуйте снова!')
										? error
										: ''}{' '}
							</h5>
							<button type='submit'>Вход</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default FormEnter
