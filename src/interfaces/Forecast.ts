import Location from './Location';

interface ForecastSys {
    pod: string;
}
type Forecast = Pick<Location, 'dt' | 'main' | 'weather' | 'clouds' | 'wind'> & {
    sys: ForecastSys;
    dt: number;
    dt_txt: string;
};

export default Forecast;
