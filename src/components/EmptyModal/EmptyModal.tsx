import React, { FC, ReactNode, useEffect } from 'react';
import s from './EmptyModal.module.scss'
import { useAppDispatch } from '../../store/hooks/hooks';
import { closeEmptyModal } from '../../store/slice/storesSlice';

interface EmptyModalProps {
    children: ReactNode
}

const EmptyModal: FC<EmptyModalProps> = ({ children }) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(closeEmptyModal())
        }, 2400)

        return () => clearTimeout(timer)
    }, [dispatch])

    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                {children}
            </div>
        </div>
    );
};

export default EmptyModal;