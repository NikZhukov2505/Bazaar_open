import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import s from './Burger.module.scss'
import close from '../../../assets/Header/close.png'
import LogOut from '../LogOut/LogOut'
import { useAppSelector } from '../../../store/hooks/hooks'
import BasketIcon from '../BasketIcon/BasketIcon'
import UserIcon from '../UserIcon/UserIcon'
import { Link } from 'react-router-dom'

interface IBurger {
	setBurger: (e: boolean) => void
	burger: boolean
	toggleClose: () => void
	setShow: Dispatch<SetStateAction<boolean>>
}

const Burger: FC<IBurger> = ({ burger, setBurger, setShow, toggleClose }) => {
	const [logOut, setLogOut] = useState(false)
	const { token } = useAppSelector(state => state.user)

	const hideModal = () => {
		setBurger(false)
	}

	const handleLogOut: React.MouseEventHandler<HTMLLIElement> = (e) => {
		e.stopPropagation()
		setLogOut(true)
	}

	useEffect(() => {
		// При рождении убрать скрол
		document.body.style.overflow = 'hidden'
		// При нажатии на ESC закрыть модальное окно
		document.addEventListener('keydown', e => {
			e.code === 'Escape' && hideModal()
		})
		// При рождении навесит другое событие на кнопку назад у браузера
		if (burger) {
			window.history.pushState(null, '', window.location.href)
			window.onpopstate = () => setBurger(false)
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

	return (
		<div className={s.content} onClick={hideModal}>
			<div className={s.container} onClick={e => e.stopPropagation()}>
				<div
					className={`${s.wrapper} animate__animated animate__fadeInRight animate__faster`}
				>
					<div className={s.close_block}>
						<img onClick={hideModal} src={close} alt='Close_Icon' />
					</div>
					<div onClick={hideModal} className={s.icons_wrapper}>
						<UserIcon toggleClose={toggleClose} />
						<BasketIcon setShow={setShow} />
					</div>
					<ul onClick={hideModal}>
						<li><Link to={'/'}>На главную</Link></li>
						<li><Link to={'/info_page/contacts'}>Контакты</Link></li>
						<li><Link to={'/info_page/about'}>О нас</Link></li>
						<li><Link to={'/info_page/privacy'}>Политика конфиденциальности</Link></li>
						<li><Link to={'/info_page/payment'}>Оплата</Link></li>
						{token && (
							<li onClick={handleLogOut} className={s.log_out}>
								Выйти из аккаунта
							</li>
						)}
					</ul>

				</div>
			</div>
			{logOut && <LogOut logOut={logOut} setLogOut={setLogOut} />}
		</div>
	)
}

export default Burger
