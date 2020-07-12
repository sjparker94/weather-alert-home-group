import DefaultActionState from './DefaultActionState';
import Location from './Location';

interface SearchLocationState extends DefaultActionState {
    data: Location | null;
    error: string | null;
}

export default SearchLocationState;
