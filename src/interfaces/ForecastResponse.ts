import Forecast from './Forecast';
import Location from './Location';

interface ForecastResponse {
    cod: string;
    message: number;
    cnt: number;
    list: Forecast[];
    city: Pick<Location, 'id' | 'name' | 'coord' | 'timezone'> & {
        sunrise: number;
        country: string;
    };
}

export default ForecastResponse;
