import React, { FC, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import s from './Main.module.scss'
import Home from '../../Pages/Home/Home'
import Editor from '../../Pages/Editor/Editor'
import PersonalArea from '../../Pages/PersonalArea/PersonalArea'
import Rates from '../../Pages/Rates/Rates'
import Container from '../../Pages/Container/Container'
import NotFound from '../../Pages/NotFound/NotFound'
import CatalogDetailCard from '../../Pages/CatalogDetailCard/CatalogDetailCard'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import { getLSToken } from '../../LS'
import { fetchByToken, setToken } from '../../store/slice/userSlice'
import EditorMainPage from '../EditorMainPage/EditorMainPage'
import { fetchByCompanyInfo } from '../../store/slice/infoSlice'
import InfoPages from '../../Pages/InfoPages/InfoPages'

const Main: FC = () => {
	const dispatch = useAppDispatch()
	const { token } = useAppSelector(state => state.user)
	const { info } = useAppSelector(state => state.info)

	useEffect(() => {
		let lsToken = getLSToken()
		if (lsToken !== null && lsToken !== undefined) {
			dispatch(setToken(lsToken))
		}
	}, [dispatch, token])

	useEffect(() => {
		token && dispatch(fetchByToken(token))
	}, [dispatch, token])

	useEffect(() => {
		!info && dispatch(fetchByCompanyInfo())
	}, [dispatch])

	return (
		<main className={s.wrapper}>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/store/:id/:name' element={<Container />} />
				<Route path='/detail-card/:id/:store_name/:item_name' element={<CatalogDetailCard />} />
				<Route path='/info_page/:name' element={<InfoPages />} />
				{token && (
					<>
						<Route path='/editor' element={<Editor />} />
						<Route path='/personal-area' element={<PersonalArea />} />
						<Route path='/main-editor' element={<EditorMainPage />} />
						<Route path='/rates' element={<Rates />} />
					</>
				)}
				<Route path='*' element={<NotFound />} />
			</Routes>
		</main>
	)
}

export default Main
