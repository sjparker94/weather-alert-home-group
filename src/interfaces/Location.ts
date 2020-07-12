import LocationWind from './LocationWind';

interface LocationSys {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
}
interface LocationCoord {
    lon: number;
    lat: number;
}
interface LocationWeather {
    id: number;
    main: string;
    description: string;
    icon: string;
}
interface LocationMain {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
}
interface LocationClouds {
    all: number;
}
interface Location {
    coord: LocationCoord;
    weather: LocationWeather[];
    base: string;
    main: LocationMain;
    visibility: number;
    wind: LocationWind;
    clouds: LocationClouds;
    dt: number;
    sys: LocationSys;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

export default Location;
