import Location from './Location';
import DefaultActionState from './DefaultActionState';

interface LocationsState {
    data: Location[];
    isInitialLoad: boolean;
    getLocations: DefaultActionState;
}
export default LocationsState;
