import { Action, Dispatch } from 'redux';
import * as LocationsActionTypes from '../constants/actions';
import LocationsState from '../interfaces/LocationsState';
import Location from '../interfaces/Location';

export interface GetLocationsRequest extends Action {
    type: typeof LocationsActionTypes.GET_LOCATIONS_REQUEST;
}
export interface GetLocationsSuccess extends Action {
    type: typeof LocationsActionTypes.GET_LOCATIONS_SUCCESS;
    payload: Location[];
}

export interface GetLocationsFail extends Action {
    type: typeof LocationsActionTypes.GET_LOCATIONS_FAIL;
    payload: string;
}

export const getLocationsRequest = (): GetLocationsRequest => {
    return {
        type: LocationsActionTypes.GET_LOCATIONS_REQUEST,
    } as const;
};
export const getLocationsSuccess = (locations: Location[]): GetLocationsSuccess => {
    return {
        type: LocationsActionTypes.GET_LOCATIONS_SUCCESS,
        payload: locations,
    } as const;
};
export const getLocationsFail = (errorMessage: string): GetLocationsFail => {
    return {
        type: LocationsActionTypes.GET_LOCATIONS_FAIL,
        payload: errorMessage,
    } as const;
};

export const getLocations = () => {
    return (dispatch: Dispatch) => {
        dispatch(getLocationsRequest());

        const localStorageLocations = localStorage.getItem('locations');
        const savedLocations = localStorageLocations ? JSON.parse(localStorageLocations) : [];

        if (!localStorageLocations) {
            localStorage.setItem('locations', JSON.stringify([]));
        }

        dispatch(getLocationsSuccess(savedLocations));

        if(savedLocations.length ){

        }

    };
};

