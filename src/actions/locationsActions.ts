import { Action, Dispatch } from 'redux';
import axios from 'axios';
import * as locationsActionTypes from '../constants/actions';
import Location from '../interfaces/Location';
import MultipleLocationResponse from '../interfaces/MultipleLocationResponse';
import ForecastResponse from '../interfaces/ForecastResponse';
import Forecast from '../interfaces/Forecast';

export interface GetLocationsRequest extends Action {
    type: typeof locationsActionTypes.GET_LOCATIONS_REQUEST;
}
export interface GetLocationsSuccess extends Action {
    type: typeof locationsActionTypes.GET_LOCATIONS_SUCCESS;
    payload: Location[];
}
export interface GetLocationsFail extends Action {
    type: typeof locationsActionTypes.GET_LOCATIONS_FAIL;
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
export const getLocationsFail = (): GetLocationsFail => {
    return {
        type: locationsActionTypes.GET_LOCATIONS_FAIL,
    };
};

export const getLocations = (locations: Location[]) => {
    return async (dispatch: Dispatch) => {
        dispatch(getLocationsRequest());
        if (locations.length === 0) {
            dispatch(getLocationsFail());
            return;
        }
        try {
            const locationIdString = locations.map(location => location.id).join(',');

            const response = await axios.get<MultipleLocationResponse>(
                `${process.env.REACT_APP_OPENWEATHER_API_URL}group?id=${locationIdString}&units=${
                    process.env.REACT_APP_OPENWEATHER_API_UNITS
                }&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
            );

            dispatch(getLocationsSuccess(response.data.list));
        } catch (err) {
            dispatch(getLocationsFail());
        }
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
    };
};

export interface RemoveLocation extends Action {
    type: typeof locationsActionTypes.REMOVE_LOCATION;
    payload: number;
}
export const removeLocation = (locationId: number): RemoveLocation => {
    return {
        type: locationsActionTypes.REMOVE_LOCATION,
        payload: locationId,
    };
};

export interface GetLocationForecastRequest extends Action {
    type: typeof locationsActionTypes.GET_LOCATION_FORECAST_REQUEST;
}
interface LocationForecastPayload {
    id: number;
    data: Forecast[];
}
export interface GetLocationForecastSuccess extends Action {
    type: typeof locationsActionTypes.GET_LOCATION_FORECAST_SUCCESS;
    payload: LocationForecastPayload;
}
export interface GetLocationForecastFail extends Action {
    type: typeof locationsActionTypes.GET_LOCATION_FORECAST_FAIL;
    payload: string;
}

export const getLocationForecastRequest = (): GetLocationForecastRequest => {
    return {
        type: locationsActionTypes.GET_LOCATION_FORECAST_REQUEST,
    };
};

export const getLocationForecastSuccess = (
    payload: LocationForecastPayload
): GetLocationForecastSuccess => {
    return {
        type: locationsActionTypes.GET_LOCATION_FORECAST_SUCCESS,
        payload,
    };
};
export const getLocationForecastFail = (errorMessage: string): GetLocationForecastFail => {
    return {
        type: locationsActionTypes.GET_LOCATION_FORECAST_FAIL,
        payload: errorMessage,
    };
};
export const getForecast = (cityId: number) => {
    return async (dispatch: Dispatch) => {
        dispatch(getLocationForecastRequest());

        try {
            const response = await axios.get<ForecastResponse>(
                `${process.env.REACT_APP_OPENWEATHER_API_URL}weather?id=${cityId}&cnt=8&units=${
                    process.env.REACT_APP_OPENWEATHER_API_UNITS
                }&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
            );
            dispatch(
                getLocationForecastSuccess({
                    data: response.data.list,
                    id: cityId,
                })
            );
        } catch (err) {
            const noResultsMessage = 'Failed to get the forecast data please refresh to try again';
            dispatch(getLocationForecastFail(noResultsMessage));
        }
    };
};
