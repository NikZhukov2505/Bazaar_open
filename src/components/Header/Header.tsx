import React, { FC, useState } from 'react'
import s from './Header.module.scss'
import { BiMenuAltRight } from 'react-icons/bi'
import Burger from './Burger/Burger'
import FormEnter from '../FormEnter/FormEnter'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import { setEnter } from '../../store/slice/userSlice'
import Cart from '../Cart/Cart'
import BasketIcon from './BasketIcon/BasketIcon'
import UserIcon from './UserIcon/UserIcon'

const Header: FC = () => {
	// const [enter, setEnter] = useState<boolean>(false)
	const dispatch = useAppDispatch()
	const [show, setShow] = useState(false)
	const [burger, setBurger] = useState<boolean>(false)
	const { enter } = useAppSelector(state => state.user)


	const toggleClose = () => {
		dispatch(setEnter(!enter))
	}

	const hideCart = () => {
		setShow(false)
	}
	return (
		<header className={s.wrapper}>
			<div className={s.icons_wrapper}>
				<UserIcon toggleClose={toggleClose} />
			</div>
			<div className={s.icons_wrapper}>
				<BasketIcon setShow={setShow} />
			</div>
			<BiMenuAltRight onClick={() => setBurger(!burger)} className={s.icon} />
			{enter && <FormEnter />}
			{burger && <Burger toggleClose={toggleClose} setShow={setShow} burger={burger} setBurger={setBurger} />}
			{show && <Cart show={show} hide={hideCart} />}
		</header>
	)
}

export default Header
