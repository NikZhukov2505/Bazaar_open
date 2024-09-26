import React, { ChangeEventHandler, FC, useEffect, useRef, useState } from 'react';
import s from './CategoryList.module.scss'
import List from './List/List';
import { useAppDispatch, useAppSelector } from '../../../../../../store/hooks/hooks';
import { ICategory } from '../../../../../../store/modules';

interface CategoryListProps {
    show: boolean
    hide: () => void
    handleFilter: (cat_id: string, sub_id?: string) => void
    clearParams: () => void
}

const CategoryList: FC<CategoryListProps> = ({ clearParams, handleFilter, hide, show }) => {
    const dispatch = useAppDispatch()
    const [value, setValue] = useState('')
    const [listCategories, setListCategories] = useState<ICategory[]>([])
    const { all_categories } = useAppSelector(state => state.stores)
    const blockRef = useRef<HTMLDivElement | null>(null)

    const toggleBlock = (e: MouseEvent) => {
        const { target } = e
        if (blockRef.current && !blockRef.current.contains(target as Node)
            && target instanceof HTMLElement && !target.className.includes('CategoryList')
            && !target.className.includes('category_title') && !target.className.includes('category_wrapper')
            && !target.className.includes('arrow')) {
            hide()
        }
    }

    const filterCategoriesByName: ChangeEventHandler<HTMLInputElement> = (e) => {
        const name = e.target.value.toLowerCase()
        setValue(name)
        if (name.trim().length && name.length > 2) {
            setListCategories(all_categories.filter(el => {
                // Проверяем, соответствует ли основное имя категории поисковому запросу
                const matchesCategoryName = el.name.toLowerCase().includes(name.toLowerCase());

                // Проверяем, есть ли подкатегории, соответствующие поисковому запросу
                const matchesSubcategories = el.sub_categories.some(subcategory =>
                    subcategory.name.toLowerCase().includes(name.toLowerCase())
                );

                // Возвращаем true, если найдено совпадение хотя бы в одном из случаев
                return matchesCategoryName || matchesSubcategories;
            }))
        } else {
            setListCategories(all_categories)
        }
    }


    useEffect(() => {
        document.addEventListener('mousedown', toggleBlock)
        if (all_categories) {
            setListCategories(all_categories)
        }

        return () => document.removeEventListener('mousedown', toggleBlock)
    }, [show, hide, dispatch])


    return (
        <div
            ref={blockRef}
            onClick={(e) => e.stopPropagation()}
            className={s.category_block}
        >
            <input
                onChange={filterCategoriesByName}
                type="search"
                placeholder='Поиск категорий'
                className={s.search} />
            <ul className={s.list}>
                {
                    listCategories.length > 0 &&
                    listCategories.map(el => <List value={value}
                        handleFilter={handleFilter} key={el.id} {...el} />)
                }
            </ul>
        </div>
    );
};

export default CategoryList;