import React, { FC, useEffect, useState } from 'react'
import s from './Container.module.scss'
import AllProduct from '../../components/AllProduct/AllProduct'
import tg from '../../assets/Container/images/tg.png'
import inst from '../../assets/Container/images/inst.png'
import wa from '../../assets/Container/images/wa.png'
import tel from '../../assets/Container/images/tel.png'
import mail from '../../assets/Container/images/mail.png'
import rightimage from '../../assets/Container/images/right_photo.png'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import { clearStore, fetchByGetStore, fetchByProduct, fetchByProfileCategories } from '../../store/slice/containerSlice'
import Loading from '../../components/Loading/Loading'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import SearchInStore from './Search/SearchInStore'
import arrow from '../../assets/images/arrow.png'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Helmet } from 'react-helmet-async'

const Container: FC = () => {
	const dispatch = useAppDispatch()
	const { loading, allInfoStore, product } = useAppSelector(state => state.container)
	const { id } = useParams()
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()

	// console.log(allInfoStore);



	useEffect(() => {
		if (id) {
			dispatch(fetchByGetStore(+id))
			!searchParams.get('q') && dispatch(fetchByProduct(+id))
			dispatch(fetchByProfileCategories(+id))
		}

		return () => {
			dispatch(clearStore())
		}
	}, [id, dispatch, searchParams.get('q')])

	const goBack = () => {
		if (searchParams.get('c') || (searchParams.get('c') && searchParams.get('sub'))) {
			navigate(`/?c=${searchParams.get('c')}&sub=${searchParams.get('sub')}`)
		} else if (searchParams.get('search')) {
			navigate(`/?search=${searchParams.get('search')}`)
		} else {
			navigate('/')
		}
	}

	return (
		<>
			<Helmet>
				<meta property="og:title" content={`${allInfoStore?.container_name} | Bazaar Jok`} />
				<meta name="twitter:title" content={`${allInfoStore?.container_name} | Bazaar Jok`} />
				<link rel="canonical" href={`https://bazarjok.com/store/${id}/${allInfoStore?.container_name}?c=${searchParams.get('c') || ''}&sub=${searchParams.get('sub') || ''}&search=${searchParams.get('search') || ''}`} />
				<title>{allInfoStore?.container_name ? allInfoStore?.container_name : ''} | Bazaar Jok</title>
			</Helmet>
			{
				allInfoStore &&
				<div className={`${s.content} ${s.container}`}>
					<div onClick={goBack} className={s.arrow}>
						<img src={arrow} alt="arrow" />
					</div>
					<div className={s.top_section}>
						<div className={s.info}>
							<h1 className={s.title}>
								Контейнер №{allInfoStore?.container_number}, Ряд: {allInfoStore.container_row}
							</h1>
							<div className={s.mail_tel}>
								<p>@{allInfoStore.container_name}</p>
							</div>
							<h2 className={s.subtitle}>{allInfoStore?.description} </h2>
							<div className={s.social_images}>
								{allInfoStore.telegram_link &&
									<a target='_blank' rel='noopener noreferrer' href={allInfoStore.telegram_link}><img src={tg} alt="tg" /></a>}
								{allInfoStore.instagram_link &&
									<a target='_blank' rel='noopener noreferrer' href={allInfoStore.instagram_link}><img src={inst} alt="inst" /></a>}
								<a
									target='_blank'
									rel='noopener noreferrer'
									href={`https://wa.me/${allInfoStore?.whatsapp_number}`}><img src={wa} alt="wa" /></a>
							</div>
							<div className={s.mail_tel}>
								<img className={s.tel} src={tel} alt="tel" />
								<a href={`tel:${allInfoStore?.whatsapp_number}`}><p>+{allInfoStore?.whatsapp_number}</p></a>
							</div>
							<SearchInStore />
						</div >
						<div className={s.rightimage}>
							{/* <img src={allInfoStore?.avatar || rightimage} alt={allInfoStore?.avatar} /> */}
							<LazyLoadImage
								alt={`Photo by ${allInfoStore?.container_name}`}
								effect="blur"
								src={`https${allInfoStore?.avatar.slice(4)}` || rightimage}
								className={s.product_image}
							/>
						</div>
					</div >
					<div className={s.catalog_sect}>
						<h2 className={s.title_catalog}>Каталог </h2>
						<div className={s.wrapper_products}>
							{loading ?
								<Loading />
								: product.length > 0 ?
									product.map(el => <AllProduct key={el.id} {...el} />)
									:
									<h2 className={s.empty}>Упс, товары не найдены.</h2>
							}
						</div>
					</div>
				</div >

			}
		</>
	)
}

export default Container
