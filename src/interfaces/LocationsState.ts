import Location from './Location';
import DefaultActionState from './DefaultActionState';
import SearchLocationState from './SearchLocationState';
import GetLocationForecastState from './GetLocationForecastState';

interface LocationsState {
    data: Location[];
    isInitialLoad: boolean;
    getLocations: DefaultActionState;
    searchLocation: SearchLocationState;
    getForecast: GetLocationForecastState;
}
export default LocationsState;
