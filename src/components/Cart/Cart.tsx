import React, { FC, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import s from './Cart.module.scss'
import close_img from '../../assets/images/close.svg'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import CartCard from './CartCard/CartCard';
import CartEmpty from './CartEmpty/CartEmpty';
import { Link } from 'react-router-dom';
import { totalSumInCart } from '../../reused';
import { fetchBySellersIds } from '../../store/slice/storesSlice';

interface CartProps {
    hide: () => void
    show: boolean
}

const Cart: FC<CartProps> = ({ hide, show }) => {
    const { cartArr } = useAppSelector(state => state.cart)
    const dispatch = useAppDispatch()

    const showMyChoosedStores = () => {
        const seller_ids = cartArr.map(el => (
            el.seller
        ))
        if (!seller_ids.length) return
        dispatch(fetchBySellersIds(seller_ids))
    }

    useEffect(() => {
        if (show) {
            window.history.pushState(null, '', window.location.href)
            window.onpopstate = (e) => {
                hide()
            }
        }
        return () => {
            window.onpopstate = () => { }
        }
    }, [show])

    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            if (e.code === "Escape") {
                hide()
            }
        })

        return () => {
            document.removeEventListener('keydown', () => { })
        }
    }, [])

    return (
        <div
            onClick={hide} className={`close animate__animated animate__fadeIn animate__faster  ${s.cart_wrapper}`}>
            <Helmet prioritizeSeoTags>
                <title>
                    Корзина | BazarJok
                </title>
            </Helmet>
            <div onClick={(e) => e.stopPropagation()} className={s.cart_visible}>
                <div className={s.cart_container}>
                    <div className={s.cart_top_block}>
                        <h2>Корзина</h2>
                        <img onClick={hide} className={`close ${s.close_btn}`} src={close_img} alt="close" />
                    </div>

                    <div className={s.cart_cards_wrapper}>
                        {
                            cartArr?.length > 0 ?
                                cartArr?.map(el => (
                                    <CartCard hide={hide} key={el.id} el={el} />
                                ))
                                :
                                <CartEmpty />
                        }
                    </div>
                    <div className={s.cart_bottom_block}>
                        {
                            cartArr?.length > 0 ?
                                <div className={s.order_info_block}>
                                    <div className={s.total_block}>
                                        <span className={s.total_text}>Итоговая цена:</span>
                                        <span className={s.total}>{totalSumInCart(cartArr)}</span>
                                    </div>
                                    <Link to={'/'}
                                        onClick={() => {
                                            showMyChoosedStores()
                                            hide()
                                        }}>
                                        <button className={s.shopping_btn}>Показать на карте</button>
                                    </Link>
                                </div>
                                :
                                <div className={s.go_shopping}>
                                    <Link to={'/'} onClick={hide}>
                                        <button className={s.shopping_btn}>К покупкам!</button>
                                    </Link>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;