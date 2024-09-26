import React, { FC } from 'react';
import s from './CartEmpty.module.scss'

const CartEmpty: FC = () => {
    return (
        <div className={s.empty_wrapper}>
            <h2 className={s.empty_text}>Корзина все еще пуста!</h2>
        </div>
    );
};

export default CartEmpty;