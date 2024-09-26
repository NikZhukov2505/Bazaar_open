import React, { useEffect } from 'react'
import s from './NotFound.module.scss'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const NotFound = () => {
	const navigate = useNavigate()

	useEffect(() => {
		let timer = setTimeout(() => {
			navigate('/')
		}, 3000)

		return () => clearTimeout(timer)
	}, [navigate])
	return (
		<div className={s.wrapper}>
			<Helmet>
				<title>404 | Страница не найдена!</title>
			</Helmet>
			<div className={s.container}>
				<h2>404</h2>
				<h1>Упс, данная страница не найдена!</h1>
			</div>
		</div>
	)
}

export default NotFound
