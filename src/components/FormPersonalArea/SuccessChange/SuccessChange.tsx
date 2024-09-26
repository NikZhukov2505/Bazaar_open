import React, { FC, useEffect } from 'react';
import s from './SuccessChange.module.scss'
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks';
import { closeSuccess } from '../../../store/slice/userSlice';

interface SuccessChangeProps {
    closeModal: () => void
}

const SuccessChange: FC<SuccessChangeProps> = ({ closeModal }) => {
    const { success_changedata_modal } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    useEffect(() => {
        let timer: NodeJS.Timeout
        if (success_changedata_modal) {
            timer = setTimeout(() => {
                dispatch(closeSuccess())
                closeModal()
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                })
            }, 2500)
        }
        return () => clearTimeout(timer)
    }, [dispatch])
    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <h2>Данные были успешно изменены!</h2>
            </div>
        </div>
    );
};

export default SuccessChange;