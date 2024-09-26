import React, { FC, useEffect } from 'react';
import s from './StoreModal.module.scss'
import { IFeatures } from '../../../../store/modules';
import { pathLink } from '../../../../reused';
import { Link, useSearchParams } from 'react-router-dom';
import store_img from '../../../../assets/images/store_img.png'
import { toggleStoreData, toggleStoreModal } from '../../../../store/slice/storesSlice';
import { useAppDispatch } from '../../../../store/hooks/hooks';

interface StoreModalProps {
    feature: IFeatures
    show: boolean
}

const StoreModal: FC<StoreModalProps> = ({ feature, show }) => {
    const [searchParams] = useSearchParams()
    const { properties } = feature
    const dispatch = useAppDispatch()

    const hide = () => {
        dispatch(toggleStoreModal(false))
        dispatch(toggleStoreData(null))
    }

    useEffect(() => {
        if (show) {
            window.history.pushState(null, "", window.location.href);
            window.onpopstate = (e) => {
                hide()
            };
        }
        return () => {
            window.onpopstate = () => { };
        };
    }, [show, dispatch]);

    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            if (e.code === "Escape") {
                hide()
            }
        })

        return () => {
            document.removeEventListener('keydown', () => { })
        }
    }, [dispatch])


    return (
        <div onClick={hide} className={`${s.wrapper}`}>
            <div onClick={(e) => e.stopPropagation()} className={s.card}>
                <img src={pathLink + properties?.avatar || store_img} alt={properties?.title} />
                <div className={s.info_wrapper}>
                    <h1 className={s.title}>{properties?.title}</h1>
                    <p className={s.description}>
                        {properties.description.length > 107 ? properties.description.slice(0, 107) + '...' : properties.description}
                    </p>
                    <Link
                        className={s.btn}
                        to={`/store/${properties.id}/${properties.title}/?c=${searchParams.get('c') || ''}&sub=${searchParams.get('sub') || ''}&search=${searchParams.get('search') || ''}`}>
                        Перейти в магазин
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default StoreModal;