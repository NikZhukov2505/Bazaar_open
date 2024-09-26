import React, { FC } from 'react';
import s from './Marker.module.scss'
import { IFeatures } from '../../../../store/modules';

interface MarkerProps {
    feature: IFeatures
    children: React.ReactNode
    callback: (store: IFeatures | null, modal: boolean) => void
}

const Marker: FC<MarkerProps> = ({ children, feature, callback }) => {
    const setStoreData = () => {
        if (!feature) return;
        callback(feature, true)
    }

    return (
        <>
            <span
                onClick={setStoreData}
                className={s.marker} title={feature.properties.title}></span>
        </>
    );
};

export default Marker;