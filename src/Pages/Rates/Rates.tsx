import React, { FC } from 'react';
import s from './Rates.module.scss'


const Rates: FC = () => {
	return (
		<div className={s.container}>
			<div className={s.wrapper}>
				<h1 className={s.title}>Тарифы</h1>
			</div>
			<div className={s.cards_wrapper}>
				<div className={s.wrapper_top}>
					<div className={s.card}>
						<h2 className={s.card_title}>Free</h2>
						<h3 className={s.card_subtitle}>1 Товар на страницу</h3>
						<div className={s.card_price}>
							<h4 className={s.price}>$</h4>
							<h5 className={s.price_num}>0</h5>
						</div>
					</div>
					<div className={s.card}>
						<h2 className={s.card_title}>Starter</h2>
						<h3 className={s.card_subtitle}>30 Товаров на страницу</h3>
						<div className={s.card_price}>
							<h4 className={s.price}>$</h4>
							<h5 className={s.price_num}>36</h5>
						</div>
					</div>
					<div className={s.card}>
						<h2 className={s.card_title}>Pro</h2>
						<h3 className={s.card_subtitle}>100 Товаров на страницу</h3>
						<div className={s.card_price}>
							<h4 className={s.price}>$</h4>
							<h5 className={s.price_num}>100</h5>
						</div>
					</div>
					<div className={s.card}>
						<h2 className={s.card_title}>Premium</h2>
						<h3 className={s.card_subtitle}>1000 Товаров на страницу</h3>
						<div className={s.card_price}>
							<h4 className={s.price}>$</h4>
							<h5 className={s.price_num}>1000</h5>
						</div>
					</div>
				</div>
				<div className={s.wrapper_bottom}>
					<div className={s.card}>
						<h2 className={s.card_title}>Free</h2>
						<h3 className={s.card_subtitle}>1 Товар на страницу</h3>
						<div className={s.card_price}>
							<h4 className={s.price}>$</h4>
							<h5 className={s.price_num}>0</h5>
						</div>
					</div>
					<div className={s.cards_info}>
						<h2 className={s.name}>"Premium Plus"</h2>
						<p className={s.description}>Тариф "Premium Plus" предоставляет
							полный спектр услуг для вашего
							личного аккаунта, чтобы
							удовлетворить все ваши
							потребности в онлайн-активностях.</p>
						<h2 className={s.conditions_name}>Условия тарифа:</h2>
						<ol className={s.conditions_description}>
							<li>Скорость Интернета: до 100 Мбит/с.</li>
							<li>Ежемесячный лимит трафика: неограничен.</li>
							<li>Почтовый ящик: 5 почтовых ящиков с емкостью 10 Гб каждый.</li>
							<li>Облачное хранилище: 100 Гб на облачном сервере.</li>
							<li>Поддержка: 24/7 круглосуточная техническая поддержка.</li>
							<li>Антивирусная защита: встроенный антивирус на все устройства.</li>
							<li>VPN: доступ к виртуальной частной сети (VPN) для безопасного и анонимного соединения с Интернетом.</li>
							<li>Мультиплатформенность: доступен на всех устройствах — компьютерах, смартфонах и планшетах.</li>
							<li>Эксклюзивные предложения: регулярные специальные предложения и скидки для абонентов тарифа "Premium Plus".</li>
							<li>Стоимость: $19.99 в месяц.</li>
						</ol>
						<button className={s.btn}>Оформить подписку</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Rates;