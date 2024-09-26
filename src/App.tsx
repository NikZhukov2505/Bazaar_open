import React, { useEffect } from 'react'
import Main from './components/Main/Main'
import './App.scss'
import Header from './components/Header/Header'
import { useAppDispatch } from './store/hooks/hooks'
import { getLS } from './LS'
import { setCartArr } from './store/slice/cartSlice'

const App = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		const data = getLS('cart') || []
		if (data !== null || data !== undefined) {
			dispatch(setCartArr(data))
		}
	}, [])
	return (
		<div>
			<Header />
			<Main />
		</div>
	)
}

export default App
