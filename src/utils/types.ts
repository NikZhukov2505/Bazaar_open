export type GeoData = {
    "type": string,
    "properties": {
        "title": string,
        "description": string
    },
    "geometry": {
        "coordinates": number[],
        "type": string
    }
}