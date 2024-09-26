import mapboxgl from 'mapbox-gl';
import React, { FC, useEffect, useState } from 'react';
import Marker from '../Marker/Marker';
import { createRoot } from 'react-dom/client';
import s from './SearchForm.module.scss'
import Categories from './Categories/Categories';
import { useLocation, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/hooks';
import { getStoresBySearch, toggleStoreData, toggleStoreModal } from '../../../../store/slice/storesSlice';
import { IFeatures } from '../../../../store/modules';

interface SearchFormProps {
    map: mapboxgl.Map | undefined
}

const SearchForm: FC<SearchFormProps> = ({ map }) => {
    const { stores } = useAppSelector(state => state.stores)
    const dispatch = useAppDispatch()
    const [searchParams, setSearchParams] = useSearchParams()
    const location = useLocation()
    const [search, setSearch] = useState('')
    const [value, setValue] = useState('')
    const [markers, setMarkers] = useState<mapboxgl.Marker[]>([])

    // Функция открывающая модальное окно магазина, передаваемая в пропсы
    // т.к. Маркер рендерится отдельно от структуры с redux
    const toggleStoreModalAndData = (store: IFeatures | null, modal: boolean) => {
        dispatch(toggleStoreData(store))
        dispatch(toggleStoreModal(modal))
    }

    const clearParams = () => {
        const cat = searchParams.get('c')
        const sub = searchParams.get('sub')
        if (cat || (cat && sub)) {
            searchParams.delete('c')
            searchParams.delete('sub')
            setSearchParams(searchParams)
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!value.trim() || !map) return;
        clearParams()
        setSearchParams({ search: value })
        setSearch(value)
        setValue('');
    };

    const renderMarkers = () => {
        if (!map && !stores?.features && !stores?.features.length) return

        // Удаление существующих маркеров
        markers.forEach(marker => marker.remove());
        setMarkers([]);

        const newMarkers = stores?.features?.map(feature => {
            const markerDiv = document.createElement('div');
            markerDiv.className = 'marker';
            createRoot(markerDiv).render(<Marker
                callback={toggleStoreModalAndData}
                feature={feature}>{feature.properties.title}</Marker>);

            const marker = new mapboxgl.Marker(markerDiv)
                .setLngLat(feature.geometry.coordinates as [number, number])
                .addTo(map as mapboxgl.Map);

            return marker;
        });

        setMarkers(newMarkers as mapboxgl.Marker[]);
    }

    useEffect(() => {
        const search = searchParams.get('search')
        if (search) {
            setSearch(search)
        } else {
            setSearch('')
        }

        if (!location.search) {
            markers.forEach(marker => marker.remove());
            setMarkers([]);
        }
    }, [dispatch, location.search])

    // useEffect(() => {

    // }, [location.search])


    useEffect(() => {
        if (search) {
            dispatch(getStoresBySearch(search))
        }
    }, [dispatch, search])

    useEffect(() => {
        if (stores?.features) {
            renderMarkers()
        }
    }, [stores?.features, dispatch])

    useEffect(() => {
        if (markers.length > 0) {
            renderMarkers()
        }
    }, [markers.length, dispatch])

    return (
        <form onSubmit={handleSubmit} className={s.search}>
            <input
                placeholder='Поиск'
                type="search"
                value={value} onChange={(e) => setValue(e.target.value)} />
            <Categories clearParams={clearParams} />
        </form>
    );
};

export default SearchForm;