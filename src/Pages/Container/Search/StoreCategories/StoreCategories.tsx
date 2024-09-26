import React, { FC, useEffect, useState } from 'react';
import s from './StoreCategories.module.scss'
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../../../store/hooks/hooks';
import arrow from '../../../../assets/images/arrow.png'
import StoreCategoryList from './StoreCategoryList/StoreCategoryList';
import { fetchByCardsByCategories } from '../../../../store/slice/containerSlice';

interface StoreCategoriesProps {
    clearParams: () => void
}

const StoreCategories: FC<StoreCategoriesProps> = ({ clearParams }) => {
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const [show, setShow] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams();
    const [category] = useState(searchParams.get('c') || '')
    const [subCategory] = useState(searchParams.get('sub') || '')
    const [search] = useState(searchParams.get('search') || '')
    const [categoryStore, setCategoryStore] = useState(searchParams.get('c_store') || '')
    const [subCategoryStore, setSubCategoryStore] = useState(searchParams.get('sub_store') || '')
    const location = useLocation()

    const hide = () => {
        setShow(false)
    }

    const handleFilter = (cat_id: string, sub_id: string = '') => {
        const q = searchParams.get('q')
        if (q) {
            searchParams.delete('q')
        }
        setCategoryStore(cat_id)
        setSubCategoryStore(sub_id)
        setSearchParams({ c: category, sub: subCategory, search, c_store: cat_id, sub_store: sub_id })
        hide()
    }



    useEffect(() => {
        const cat = searchParams.get('c_store')
        if (cat) {
            setCategoryStore(cat)
        } else {
            setCategoryStore('')
        }
        const sub = searchParams.get('sub_store')
        if (sub) {
            setSubCategoryStore(sub)
        } else {
            setSubCategoryStore('')
        }
    }, [dispatch, location.search])

    useEffect(() => {
        if ((categoryStore || subCategoryStore) && id) {
            dispatch(fetchByCardsByCategories({ id, cat_id: categoryStore, sub_id: subCategoryStore }))
        }

    }, [dispatch, categoryStore, subCategoryStore])

    return (
        <div className={s.category_wrapper}>
            <h2
                onClick={() => setShow(!show)}
                className={s.category_title}>
                Категории
                <img src={arrow} onClick={() => setShow(!show)} className={`${s.arrow} ${show ? s.open : ''}`} />
            </h2>
            {show && <StoreCategoryList
                clearParams={clearParams}
                handleFilter={handleFilter}
                hide={hide} show={show}
            />}
        </div>
    );
};

export default StoreCategories;