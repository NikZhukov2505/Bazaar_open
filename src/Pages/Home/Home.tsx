import React, { FC, useEffect, useState } from 'react'
import Map from './Map/Map'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import { getAllDataForCategories } from '../../store/slice/storesSlice'
import SearchForm from './Map/SearchForm/SearchForm'
import Loading from '../../components/Loading/Loading'
import EmptyModal from '../../components/EmptyModal/EmptyModal'
import { useSearchParams } from 'react-router-dom'
import StoreModal from './Map/StoreModal/StoreModal'
import { Helmet } from 'react-helmet-async'

const Home: FC = () => {
	// здесь будет храниться инстанс карты после инициализации
	const [map, setMap] = useState<mapboxgl.Map | undefined>()
	const [loadingMap, setLoadingMap] = useState(true)
	const handleMapLoading = () => setLoadingMap(false)
	const dispatch = useAppDispatch()
	const {
		all_categories,
		stores,
		empty_modal,
		loading,
		store_data,
		store_modal,
	} = useAppSelector(state => state.stores)
	const [searchParams, setSearchParams] = useSearchParams()

	useEffect(() => {
		!all_categories.length && dispatch(getAllDataForCategories())
	}, [dispatch])

	useEffect(() => {
		if (empty_modal) {
			searchParams.delete('search')
			searchParams.delete('c')
			searchParams.delete('sub')
			setSearchParams(searchParams)
		}
	}, [dispatch, empty_modal])

	return (
		<div>
			<Helmet>
				<meta property="og:title" content={`Магазины | Bazaar Jok`} />
				<meta name="twitter:title" content={`Магазины | Bazaar Jok`} />
				<link rel="canonical" href={`https://bazarjok.com/`} />
				<title>Магазины | Bazaar Jok</title>
			</Helmet>
			<SearchForm map={map} />
			<Map
				setMap={setMap}
				onLoaded={handleMapLoading} />
			{store_modal && store_data && <StoreModal feature={store_data} show={store_modal} />}
			{(loadingMap || loading) && <Loading />}
			{!stores?.features.length && empty_modal && (
				<EmptyModal>Упс по данному запросу магазины не найдены!</EmptyModal>
			)}
		</div>
	)
}

export default Home
