import React, { FC, useState } from 'react'
import FormPersonalArea from '../../components/FormPersonalArea/FormPersonalArea'
import Modal from '../../components/FormPersonalArea/MyOffisModular/Modul'
import { Helmet } from 'react-helmet-async'

const PersonalArea: FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const closeModal = () => {
		setIsModalOpen(false)
	}
	const openModal = () => {
		setIsModalOpen(true)
	}

	return (
		<>
			<Helmet>
				<title>Личный кабинет</title>
			</Helmet>
			<FormPersonalArea openModal={openModal} />
			{isModalOpen && <Modal closeModal={closeModal} />}
		</>
	)
}

export default PersonalArea
