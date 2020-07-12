import Location from './Location';
import DefaultActionState from './DefaultActionState';
import SearchLocationState from './SearchLocationState';

interface LocationsState {
    data: Location[];
    isInitialLoad: boolean;
    getLocations: DefaultActionState;
    searchLocation: SearchLocationState;
}
export default LocationsState;
