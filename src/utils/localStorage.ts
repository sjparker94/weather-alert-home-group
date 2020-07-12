import AppState from '../interfaces/AppState';
import Location from '../interfaces/Location';
import { locationsInitialState } from '../reducers/locationsReducer';

export const loadState = (): AppState | undefined => {
    try {
        const serializedLocations = localStorage.getItem('locations');
        if (serializedLocations === null) {
            return undefined;
        }
        const locations = JSON.parse(serializedLocations);
        return {
            locations: {
                ...locationsInitialState,
                data: locations,
            },
        };
    } catch (err) {
        return undefined;
    }
};

export const saveState = (locations: Location[]) => {
    try {
        const serializedLocations = JSON.stringify(locations);
        localStorage.setItem('locations', serializedLocations);
    } catch {
        // ignore errors
    }
};
