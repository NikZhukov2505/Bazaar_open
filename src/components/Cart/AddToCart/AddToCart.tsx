import React, { FC, ReactNode, useState } from 'react';
import s from './AddToCart.module.scss'
import { getLS, setLS } from '../../../LS';
import { IProductInCart } from '../../../store/modules';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks';
import { setCartArr } from '../../../store/slice/cartSlice';

interface AddToCartProps {
    children: ReactNode
    product: IProductInCart | null
}

const AddToCart: FC<AddToCartProps> = ({ children, product }) => {
    const dispatch = useAppDispatch()
    const { cartArr } = useAppSelector(state => state.cart)

    const addToCart = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.preventDefault()
        if (product) {
            let all_products: IProductInCart[] = getLS('cart') || []
            let one_elem = all_products.find(elem => elem.id === product.id)
            if (one_elem) {
                return
            } else {
                all_products.push(product)
                setLS('cart', all_products)
                dispatch(setCartArr(all_products))
            }
        }
    }

    return (
        <>
            {!cartArr.find(el => el.id === product?.id) ? <span onClick={addToCart}>
                {children}
            </span>
                :
                <span className={s.in_cart}>В корзине</span>}
        </>
    );
};

export default AddToCart;