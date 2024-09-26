import React, { FC } from 'react'
import myOffisInfo from './MyOffisInfo.module.scss'
import editor from '../../../assets/images/Groupeditor.svg'
import telegram from '../../../assets/images/Frametelegram.svg'
import instagram from '../../../assets/images/Frameinstagram.svg'
import telephone from '../../../assets/images/Vectortelephone.svg'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../../store/hooks/hooks'
import { pathLink } from '../../../reused'
import empty from '../../../assets/PersonalProfile/empty.png'

interface MyOffisInfoProps {
	openModal: () => void
}

const MyOffisInfo: FC<MyOffisInfoProps> = ({ openModal }) => {
	const { user } = useAppSelector(state => state.user)

	return (
		<>
			<div className={myOffisInfo.myOffisInfo}>
				<div className={myOffisInfo.photo}>
					<div className={myOffisInfo.photoImg}>
						<img
							src={
								user?.seller_user && user?.seller_user?.avatar
									? user.seller_user.avatar.toString().startsWith('http')
										? `https${user.seller_user.avatar.slice(4)}`
										: pathLink + user?.seller_user?.avatar
									: empty
							}
							alt='photo'
						/>
					</div>
					<div className={myOffisInfo.photoText}>
						<h2>
							{user?.first_name} {user?.last_name}
						</h2>

						<button onClick={openModal}>
							<div>
								<img src={editor} alt='photo' />
							</div>
							<p>Редактировать информацию</p>
						</button>
					</div>
				</div>
				<ul className={myOffisInfo.inf}>
					<li>
						<span>Инн | </span>
						<span className={myOffisInfo.user_text}>{user?.seller_user?.tin}</span>
					</li>
					<li>
						<span>Телефон | </span>
						<span className={myOffisInfo.user_text}>{user?.seller_user?.whatsapp_number}</span>
					</li>
					<li>
						<span>Email | </span>
						<span className={myOffisInfo.user_text}>{user?.email}</span>
					</li>
					<li>
						<span>Название контейнера | </span>
						<span className={myOffisInfo.user_text}>{user?.seller_user?.container_name}</span>
					</li>
				</ul>
				<ul className={myOffisInfo.img}>
					{user?.seller_user?.telegram_link && <li>
						<a href={user?.seller_user?.telegram_link}>
							<img src={telegram} alt='Telegram' />
						</a>
					</li>}
					{user?.seller_user?.instagram_link && <li>
						<a href={user?.seller_user?.instagram_link}>
							<img src={instagram} alt='Instagram' />
						</a>
					</li>}
					<li>
						<a href={user?.seller_user?.whatsapp_number}>
							<img src={telephone} alt='Telephon' />
						</a>
					</li>
					<li>
						<Link to={'/main-editor'}>
							<button className={myOffisInfo.btn_editor}>Список товаров</button>
						</Link>
					</li>
				</ul>
			</div>
		</>
	)
}

export default MyOffisInfo
