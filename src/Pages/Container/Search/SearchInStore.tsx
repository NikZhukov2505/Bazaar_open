import React, { FC, useEffect, useState } from 'react';
import s from '../Container.module.scss'
import StoreCategories from './StoreCategories/StoreCategories';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../../store/hooks/hooks';
import { fetchBySellerProductsByName } from '../../../store/slice/containerSlice';

const SearchInStore: FC = () => {
    const { id } = useParams()
    const [value, setValue] = useState<string>('');
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState('')
    const dispatch = useAppDispatch()
    const location = useLocation()


    const clearParams = () => {
        const cat = searchParams.get('c_store')
        const sub = searchParams.get('sub_store')
        const q = searchParams.get('q')
        if (cat || (cat && sub)) {
            searchParams.delete('c_store')
            searchParams.delete('sub_store')
            setSearchParams(searchParams)
        } else if (q) {
            searchParams.delete('q')
            setSearchParams(searchParams)
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!value.trim()) return;
        clearParams()
        setSearchParams({
            c: searchParams.get('c') || '',
            sub: searchParams.get('sub') || '',
            search: searchParams.get('search') || '',
            q: value
        })
        setSearch(value)
        setValue('');
    };

    useEffect(() => {
        const search = searchParams.get('q')
        if (search) {
            setSearch(search)
        } else {
            setSearch('')
        }
    }, [dispatch, location.search])

    useEffect(() => {
        if (search && id) {
            dispatch(fetchBySellerProductsByName({ id, q: search }))
        }
    }, [dispatch, search])

    return (
        <div className={s.submit_wrapper}>
            <form onSubmit={handleSubmit} className={s.search_block}>
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className={s.search_inp} type="search" placeholder='Поиск ' />
            </form>
            <StoreCategories clearParams={clearParams} />
        </div>
    );
};

export default SearchInStore;