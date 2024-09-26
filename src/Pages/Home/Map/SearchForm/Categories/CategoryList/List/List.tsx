import React, { FC, useEffect, useState } from 'react';
import s from './List.module.scss'
import arrow from '../../../../../../../assets/images/arrow.png'
import { ICategory } from '../../../../../../../store/modules';

interface ListProps {
    handleFilter: (cat_id: string, sub_id?: string) => void
    value: string
}

const List: FC<ListProps & ICategory> = ({ handleFilter, id, name, sub_categories, value }) => {
    const [openId, setOpenId] = useState<null | number>(null)

    const toggleAnswer = (id: number) => {
        setOpenId(openId === id ? null : id)
    }

    useEffect(() => {
        if (value.length > 2 && (name.toLowerCase().includes(value) || sub_categories.some(subcategory =>
            subcategory.name.toLowerCase().includes(value)))) {
            setOpenId(id)
        } else {
            setOpenId(null)
        }
    }, [value])



    return (
        <div className={s.wrapper}>
            <div className={s.category_name_wrapper}>
                <h4
                    className={value.length && name.toLowerCase().includes(value) ? s.choosed : ''}
                    onClick={() => handleFilter(`${id}`)}>{name}</h4>
                <img onClick={() => toggleAnswer(id)}
                    src={arrow} className={`${s.arrow} ${id === openId && s.open}`} alt="arrow" />
            </div>
            {
                openId === id &&
                <ul className={s.sub_list}>
                    {
                        sub_categories.length &&
                        sub_categories.map(el => (
                            <li
                                className={value.length && el.name.toLowerCase().includes(value) ? s.choosed : ''}
                                onClick={() => handleFilter(`${id}`, `${el.id}`)}
                                key={el.id}>{el.name}</li>
                        ))
                    }
                </ul>
            }
        </div>
    );
};

export default List;