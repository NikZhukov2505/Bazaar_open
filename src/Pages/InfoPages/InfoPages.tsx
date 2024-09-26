import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import s from './InfoPages.module.scss'
import { useAppSelector } from '../../store/hooks/hooks';
import { Helmet } from 'react-helmet-async';
import wh from '../../assets/images/whatsapp.png'
import insta from '../../assets/images/insta.png'
import tg from '../../assets/images/Telegram_2019_Logo.svg.png'

const InfoPages: FC = () => {
    const { name } = useParams()
    const { info } = useAppSelector(state => state.info)

    return (
        <div>
            {
                name === 'contacts' &&
                <div className={s.wrapper}>
                    <Helmet>
                        <meta property="og:title" content={`Контакты | Bazaar Jok`} />
                        <meta name="twitter:title" content={`Контакты | Bazaar Jok`} />
                        <link rel="canonical" href={`https://bazarjok.com/info_page/contacts`} />
                        <title>Контакты | Bazaar Jok</title>
                    </Helmet>
                    <div className={s.container}>
                        <h1 className={s.title}>Контакты</h1>
                        <a className={s.whA} href={`https://wa.me/${info?.whatsapp_info}`} target="_blank" rel='noopener noreferrer'>
                            <p>Связатся в WhatsApp</p>
                            <img src={wh} alt="img" />
                        </a>
                        <a className={s.instA} href={info?.instagram_info} target="_blank" rel='noopener noreferrer'>
                            <p>Связатся в Instagram</p>
                            <img className={s.inst} src={insta} alt="img" />
                        </a>
                        <a className={s.tg}
                            href={info?.telegram_info.startsWith('https')
                                ? info?.telegram_info : `https://t.me/${info?.telegram_info.startsWith('+')
                                    ? info?.telegram_info : info?.telegram_info.startsWith('@')
                                        ? info?.telegram_info.slice(1) : info?.telegram_info}`}
                            target="_blank" rel='noopener noreferrer'>
                            <p>Связатся в Telegram</p>
                            <img src={tg} alt="img" />
                        </a>
                    </div>
                </div>
            }
            {
                name === 'about' &&
                <div className={s.text_container}>
                    <Helmet>
                        <meta property="og:title" content={`О нас | Bazaar Jok`} />
                        <meta name="twitter:title" content={`О нас | Bazaar Jok`} />
                        <link rel="canonical" href={`https://bazarjok.com/info_page/about`} />
                        <title>О нас | Bazaar Jok</title>
                    </Helmet>
                    <h1 className={s.title}>О нас: {info?.company_name}</h1>
                    <p>{info?.about_info}</p>
                </div>
            }

            {
                name === 'privacy' &&
                <div className={s.text_container}>
                    <Helmet>
                        <meta property="og:title" content={`Политика конфиденциальности | Bazaar Jok`} />
                        <meta name="twitter:title" content={`Политика конфиденциальности | Bazaar Jok`} />
                        <link rel="canonical" href={`https://bazarjok.com/info_page/privacy`} />
                        <title>Политика конфиденциальности | Bazaar Jok</title>
                    </Helmet>
                    <h1 className={s.title}>Политика конфиденциальности</h1>
                    <p>{info?.privacy_policy_info}</p>
                </div>
            }

            {
                name === 'payment' &&
                <div className={s.text_container}>
                    <Helmet>
                        <meta property="og:title" content={`Оплата | Bazaar Jok`} />
                        <meta name="twitter:title" content={`Оплата | Bazaar Jok`} />
                        <link rel="canonical" href={`https://bazarjok.com/info_page/payment`} />
                        <title>Оплата | Bazaar Jok</title>
                    </Helmet>
                    <h1 className={s.title}>Оплата</h1>
                    <p>{info?.payment_info}</p>
                </div>
            }
        </div>
    );
};

export default InfoPages;