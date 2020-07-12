import { Action, Dispatch } from 'redux';
import axios from 'axios';
import * as locationsActionTypes from '../constants/actions';
import LocationsState from '../interfaces/LocationsState';
import Location from '../interfaces/Location';

export interface GetLocationsRequest extends Action {
    type: typeof locationsActionTypes.GET_LOCATIONS_REQUEST;
}
export interface GetLocationsSuccess extends Action {
    type: typeof locationsActionTypes.GET_LOCATIONS_SUCCESS;
    payload: Location[];
}
export interface GetLocationsFail extends Action {
    type: typeof locationsActionTypes.GET_LOCATIONS_FAIL;
    payload: string;
}

export const getLocationsRequest = (): GetLocationsRequest => {
    return {
        type: locationsActionTypes.GET_LOCATIONS_REQUEST,
    };
};
export const getLocationsSuccess = (locations: Location[]): GetLocationsSuccess => {
    return {
        type: locationsActionTypes.GET_LOCATIONS_SUCCESS,
        payload: locations,
    };
};
export const getLocationsFail = (errorMessage: string): GetLocationsFail => {
    return {
        type: locationsActionTypes.GET_LOCATIONS_FAIL,
        payload: errorMessage,
    };
};

export const getLocations = () => {
    return (dispatch: Dispatch) => {
        dispatch(getLocationsRequest());
        try {
            const localStorageLocations = localStorage.getItem('locations');
            const savedLocations = localStorageLocations ? JSON.parse(localStorageLocations) : [];

            if (!localStorageLocations) {
                localStorage.setItem('locations', JSON.stringify([]));
            }

            dispatch(getLocationsSuccess(savedLocations));

            if (savedLocations.length) {
                // TODO Fetch latest data for each item
            }
        } catch (err) {}
    };
};

export interface SearchLocationRequest extends Action {
    type: typeof locationsActionTypes.SEARCH_LOCATION_REQUEST;
}
export interface SearchLocationSuccess extends Action {
    type: typeof locationsActionTypes.SEARCH_LOCATION_SUCCESS;
    payload: Location;
}
export interface SearchLocationFail extends Action {
    type: typeof locationsActionTypes.SEARCH_LOCATION_FAIL;
    payload: string;
}
export interface SearchLocationCancel extends Action {
    type: typeof locationsActionTypes.SEARCH_LOCATION_CANCEL;
}

export const searchLocationRequest = (): SearchLocationRequest => {
    return {
        type: locationsActionTypes.SEARCH_LOCATION_REQUEST,
    };
};
export const searchLocationSuccess = (location: Location): SearchLocationSuccess => {
    return {
        type: locationsActionTypes.SEARCH_LOCATION_SUCCESS,
        payload: location,
    };
};
export const searchLocationFail = (errorMessage: string): SearchLocationFail => {
    return {
        type: locationsActionTypes.SEARCH_LOCATION_FAIL,
        payload: errorMessage,
    };
};

export const searchLocationCancel = (): SearchLocationCancel => {
    return {
        type: locationsActionTypes.SEARCH_LOCATION_CANCEL,
    };
};

export const searchLocation = (cityName: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(searchLocationRequest());

        try {
            const response = await axios.get<Location>(
                `${process.env.REACT_APP_OPENWEATHER_API_URL}weather?q=${cityName}&units=${
                    process.env.REACT_APP_OPENWEATHER_API_UNITS
                }&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
            );

            dispatch(searchLocationSuccess(response.data));
        } catch (err) {
            const noResultsMessage = 'No results were found, please try searching again';
            dispatch(searchLocationFail(noResultsMessage));
        }
    };
};

export interface AddLocation extends Action {
    type: typeof locationsActionTypes.ADD_LOCATION;
    payload: Location;
}
export const addLocation = (location: Location): AddLocation => {
    return {
        type: locationsActionTypes.ADD_LOCATION,
        payload: location,
    } as const;
};
