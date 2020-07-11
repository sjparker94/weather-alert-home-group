import Location from './Location';
import DefaultActionState from './DefaultActionState';

interface LocationsState {
    data: Location[];
    getLocations: DefaultActionState;
}
export default LocationsState;
