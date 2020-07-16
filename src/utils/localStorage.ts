import AppState from '../interfaces/AppState';
import Location from '../interfaces/Location';
import { locationsInitialState } from '../reducers/locationsReducer';
import { settingsInitialState } from '../reducers/settingsReducer';

export const loadState = (): AppState | undefined => {
    try {
        const serializedLocations = localStorage.getItem('locations');

        const isFahrenheit = localStorage.getItem('isFahrenheit') === 'true';
        const isKm = localStorage.getItem('isKm') === 'true';

        const locations: Location[] =
            serializedLocations === null
                ? locationsInitialState.data
                : JSON.parse(serializedLocations);

        return {
            locations: {
                ...locationsInitialState,
                data: locations,
            },
            settings: {
                ...settingsInitialState,
                isFahrenheit,
                isKm,
            },
        };
    } catch (err) {
        // undefined will initialise the store with default values
        return undefined;
    }
};

export const saveState = (state: AppState) => {
    try {
        const {
            locations: { data: locations },
            settings: { isFahrenheit, isKm },
        } = state;
        const serializedLocations = JSON.stringify(locations);
        localStorage.setItem('locations', serializedLocations);
        localStorage.setItem('isFahrenheit', JSON.stringify(isFahrenheit));
        localStorage.setItem('isKm', JSON.stringify(isKm));
    } catch {
        // ignore errors
    }
};
