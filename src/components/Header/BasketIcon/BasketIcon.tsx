import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import s from '../Header.module.scss'
import { useAppSelector } from '../../../store/hooks/hooks';
import basket from '../../../assets/Header/basket.png'

interface BasketIconProps {
    setShow: Dispatch<SetStateAction<boolean>>
}

const BasketIcon: FC<BasketIconProps> = ({ setShow }) => {
    const { cartArr } = useAppSelector(state => state.cart)
    return (
        <div data-count={cartArr.length} className={s.basket}>
            <img className={s.image} onClick={() => setShow(true)} src={basket} alt='Basket' />
        </div>
    );
};

export default BasketIcon;