import React, { FC } from 'react';
import s from './CartCard.module.scss'
// import { filterCart, minusCount, plusCount } from '../../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
import { IProductInCart } from '../../../store/modules';
import { useAppDispatch } from '../../../store/hooks/hooks';
import { filterCart } from '../../../store/slice/cartSlice';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface CartCardProps {
    hide: () => void
    el: IProductInCart
}

const CartCard: FC<CartCardProps> = ({ hide, el }) => {
    const dispatch = useAppDispatch()
    const { id, image, name, price, sub_category_name, container_name } = el

    const deleteItem = (id: number) => {
        dispatch(filterCart({ id }))
    }

    // const increment = (id) => {
    //     dispatch(plusCount({ id }))
    // }

    // const decrement = (id) => {
    //     dispatch(minusCount({ id }))
    // }

    return (
        <Link to={`/detail-card/${id}/${container_name}/${name}`} onClick={hide} className={s.card}>
            <div className={s.card_img_block}>
                {/* <img className={s.img_gift} src={image} alt={name} /> */}
                <LazyLoadImage
                    alt={`Photo by ${name}`}
                    effect="blur"
                    src={`https${image.slice(4)}`}
                    className={s.img_gift}
                />
            </div>
            <div onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
            }}
                className={s.card_right_block}>
                <div className={s.card_info_block}>
                    <h3 title={el.name}>
                        {el.name}
                    </h3>
                    <h4 className={s.category}>{container_name} / {sub_category_name}</h4>
                    <h4 className={s.price}>{price} сом</h4>
                    {/* <div onClick={(e) => e.stopPropagation()} className={s.info}>
                        <span>{t("cart.count")}</span>
                        <div className={s.count_block}>
                            <button disabled={el.count <= 1 ? true : false} onClick={() => decrement(el.id_item)}>-</button>
                            {el.count}
                            <button onClick={() => increment(el.id_item)}>+</button>
                        </div>
                    </div> */}
                </div>
            </div>
            <span className={s.delete_btn}
                onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    deleteItem(el.id)
                }}>Удалить</span>
        </Link>
    );
};

export default CartCard;