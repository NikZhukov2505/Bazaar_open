import React, { FC } from 'react'
import s from './EditorHeader.module.scss'
import { Link } from 'react-router-dom'

const EditorHeader: FC = () => {
	return (
		<div className={s.wrapper}>
			<Link to={'/editor'}>
				<button className={s.btn_add}>Добавить товар +</button>
			</Link>
		</div>
	)
}

export default EditorHeader
