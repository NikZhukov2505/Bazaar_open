import React, { FC } from 'react'
import MyOffisInfo from '../FormPersonalArea/myOffisInfo/MyOffisInfo'
import MyOffisPremium from '../FormPersonalArea/MyOffisPemiumr/MyOffisPremium'
import personalArea from './FormPersonalArea.module.scss'
import { useNavigate } from 'react-router-dom'
import arrow from '../../assets/images/arrow.png'

interface FormPersonalAreaProps {
	openModal: () => void
}

const FormPersonalArea: FC<FormPersonalAreaProps> = ({ openModal }) => {
	const navigate = useNavigate()

	const goBack = () => navigate(-1)
	return (
		<div className={personalArea.block}>
			<div className={personalArea.arrow}>
				<img onClick={goBack} src={arrow} alt="arrow" />
			</div>
			<div className={personalArea.myOffis}>
				<MyOffisInfo openModal={openModal} />
				<MyOffisPremium />
			</div>
		</div>
	)
}

export default FormPersonalArea
