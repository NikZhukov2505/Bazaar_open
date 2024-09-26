import React, { Dispatch, FC, SetStateAction, useEffect, useRef } from 'react';
import mapboxgl from "mapbox-gl";
import axios from 'axios';


interface MapboxMapProps {
    setMap: Dispatch<SetStateAction<mapboxgl.Map | undefined>>
    initialOptions?: Omit<mapboxgl.MapboxOptions, "container">;
    onCreated?(map: mapboxgl.Map): void;
    onLoaded?(map: mapboxgl.Map): void;
    onRemoved?(): void;
}

const Map: FC<MapboxMapProps> = ({ initialOptions, onCreated, onLoaded, onRemoved, setMap }) => {
    // React ref для хранения ссылки на DOM ноду который будет 
    // использоваться как обязательный параметр `container` 
    // при инициализации карты `mapbox-gl`
    // по-умолчанию будет содержать `null`
    const mapNode = useRef(null);




    useEffect(() => {
        const node = mapNode.current;
        // если объект window не найден,
        // то есть компонент рендерится на сервере
        // или dom node не инициализирована, то ничего не делаем
        if (typeof window === "undefined" || node === null) return;

        // иначе создаем инстанс карты передавая ему ссылку на DOM ноду
        // а также accessToken для mapbox
        const mapboxMap = new mapboxgl.Map({
            container: node,
            minZoom: 15,
            // maxZoom: 17,
            accessToken: `pk.eyJ1IjoibmljazI1MDUiLCJhIjoiY2x3MHFyYXQ4MDRmeTJrcGh1cWdrMDNxcyJ9.8cv6cyTnHs5QZdTPa_hm_w`,
            style: "mapbox://styles/nick2505/clpcaqcik009g01o07wrd4x4q",
            center: [74.6210, 42.9383],
            zoom: 16,
            ...initialOptions,
        });

        // и сохраняем созданный объект карты в React.useState
        setMap(mapboxMap);
        if (onCreated) onCreated(mapboxMap)

        // если onLoaded указан, он будет вызван единожды
        // по событию загрузка карты
        if (onLoaded) mapboxMap.once("load", () => onLoaded(mapboxMap));


        // if (onLoaded) mapboxMap.once("load", async () => {
        //     onLoaded(mapboxMap);

        //     onLoaded(mapboxMap);

        //     // Добавление Tileset на карту
        //     mapboxMap.addSource('tilesetSource', {
        //         type: 'image',
        //         url: 'mapbox://nick2505.clwfwhi1c21o21tmb1rrhmaic-1f06y'
        //     });

        //     mapboxMap.addLayer({
        //         id: 'tilesetLayer',
        //         type: 'line',
        //         source: 'tilesetSource',
        //         'source-layer': 'New_tileset', // Укажите правильное имя слоя
        //         layout: {},
        //         paint: {
        //             'line-color': '#888',
        //             'line-width': 8
        //         }
        //     });
        // });


        // Add navigation control (the +/- zoom buttons)
        mapboxMap.addControl(new mapboxgl.NavigationControl(), 'bottom-left');

        // чтобы избежать утечки памяти удаляем инстанс карты
        // когда компонент будет демонтирован
        return () => {
            mapboxMap.remove();
            setMap(undefined);
            if (onRemoved) onRemoved();
        };
    }, []);

    return (
        <div ref={mapNode} style={{ width: "100vw", height: "100vh" }} className='map-container'>

        </div>
    );
};

export default Map;