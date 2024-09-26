import React, { FC } from 'react';
import s from './DeleteProduct.module.scss'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/hooks';
import { getchByDeleteProduct } from '../../../../store/slice/listProduct';

interface DeleteProductProps {
    id: number
    name: string
    hide: () => void
}

const DeleteProduct: FC<DeleteProductProps> = ({ hide, id, name }) => {
    const dispatch = useAppDispatch()
    const { token } = useAppSelector(state => state.user)

    const handleDelete = () => {
        id && token &&
            dispatch(getchByDeleteProduct({ id, token }))
    }

    return (
        <div onClick={hide} className={s.wrapper}>
            <div onClick={(e) => e.stopPropagation()} className={s.container}>
                <h2>Вы действительно хотите удалить {name}?</h2>
                <div className={s.btns_wrapper}>
                    <button className={s.delete} onClick={handleDelete}>Удалить</button>
                    <button className={s.cancel} onClick={hide}>Отмена</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteProduct;