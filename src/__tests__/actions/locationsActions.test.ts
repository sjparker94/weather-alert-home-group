import thunk from 'redux-thunk';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';

import * as locationsActionTypes from '../../constants/actions';
import * as actions from '../../actions/locationsActions';
import { fakeLocation, fakeForcastList } from '../../utils/testUtils';
import ForecastResponse from '../../interfaces/ForecastResponse';

jest.mock('axios');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockLocation = fakeLocation();

describe('locations actions', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should create an action when get locations has started', () => {
        const expectedAction = {
            type: locationsActionTypes.GET_LOCATIONS_REQUEST,
        };

        expect(actions.getLocationsRequest()).toEqual(expectedAction);
    });

    it('should create an action when a get locations has been successful', () => {
        const expectedAction = {
            type: locationsActionTypes.GET_LOCATIONS_SUCCESS,
            payload: [mockLocation],
        };

        expect(actions.getLocationsSuccess([mockLocation])).toEqual(expectedAction);
    });

    it('should create an action when a get locations has failed', () => {
        const expectedAction = {
            type: locationsActionTypes.GET_LOCATIONS_FAIL,
        };

        expect(actions.getLocationsFail()).toEqual(expectedAction);
    });

    it('should create an action to start the get/fetch locations and another action to mark the success of the fetch', async () => {
        const anotherMockLocation = fakeLocation({
            name: 'Newcastle upon Tyne',
        });

        const store = mockStore({});

        axios.get = jest.fn().mockResolvedValue({
            data: {
                cnt: 2,
                list: [mockLocation, anotherMockLocation],
            },
        });

        const expectedActions = [
            { type: locationsActionTypes.GET_LOCATIONS_REQUEST },
            {
                type: locationsActionTypes.GET_LOCATIONS_SUCCESS,
                payload: [mockLocation, anotherMockLocation],
            },
        ];

        await store.dispatch(actions.getLocations([mockLocation, anotherMockLocation]) as any);

        expect(store.getActions()).toEqual(expectedActions);
        expect(axios.get).toBeCalledTimes(1);
    });

    it('should create an action to start the get/fetch locations and another action to mark the failure of the fetch', async () => {
        const anotherMockLocation = fakeLocation({
            name: 'Newcastle upon Tyne',
        });

        const store = mockStore({});

        axios.get = jest.fn().mockRejectedValue(new Error());

        const expectedActions = [
            { type: locationsActionTypes.GET_LOCATIONS_REQUEST },
            { type: locationsActionTypes.GET_LOCATIONS_FAIL },
        ];

        await store.dispatch(actions.getLocations([mockLocation, anotherMockLocation]) as any);

        expect(store.getActions()).toEqual(expectedActions);
        expect(axios.get).toBeCalledTimes(1);
    });

    it('should create an action when a location search has started', () => {
        const expectedAction = {
            type: locationsActionTypes.SEARCH_LOCATION_REQUEST,
        };

        expect(actions.searchLocationRequest()).toEqual(expectedAction);
    });

    it('should create an action when a location search has been successful', () => {
        const expectedAction = {
            type: locationsActionTypes.SEARCH_LOCATION_SUCCESS,
            payload: mockLocation,
        };

        expect(actions.searchLocationSuccess(mockLocation)).toEqual(expectedAction);
    });

    it('should create an action when a location search has failed', () => {
        const errorMessage = 'No results were found, please try searching again';

        const expectedAction = {
            type: locationsActionTypes.SEARCH_LOCATION_FAIL,
            payload: errorMessage,
        };

        expect(actions.searchLocationFail(errorMessage)).toEqual(expectedAction);
    });

    it('should create an action when a location has been added to favourites', () => {
        const expectedAction = {
            type: locationsActionTypes.ADD_LOCATION,
            payload: mockLocation,
        };

        expect(actions.addLocation(mockLocation)).toEqual(expectedAction);
    });

    it('should create an action when a location has been removed from favourites', () => {
        const expectedAction = {
            type: locationsActionTypes.REMOVE_LOCATION,
            payload: mockLocation.id,
        };

        expect(actions.removeLocation(mockLocation.id)).toEqual(expectedAction);
    });

    it('should create an action to start the fetch/search of a location and another action to mark the success of the fetch', async () => {
        const store = mockStore({});

        axios.get = jest.fn().mockResolvedValue({ data: mockLocation });

        const expectedActions = [
            { type: locationsActionTypes.SEARCH_LOCATION_REQUEST },
            { type: locationsActionTypes.SEARCH_LOCATION_SUCCESS, payload: mockLocation },
        ];

        await store.dispatch(actions.searchLocation('London') as any);

        expect(store.getActions()).toEqual(expectedActions);
        expect(axios.get).toBeCalledTimes(1);
    });

    it('should create an action to start the fetch/search of a location and another action to mark the failure of the fetch', async () => {
        const errorMessage = 'No results were found, please try searching again';

        const store = mockStore({});

        axios.get = jest.fn().mockRejectedValue(new Error());

        const expectedActions = [
            { type: locationsActionTypes.SEARCH_LOCATION_REQUEST },
            { type: locationsActionTypes.SEARCH_LOCATION_FAIL, payload: errorMessage },
        ];

        await store.dispatch(actions.searchLocation('London') as any);

        expect(store.getActions()).toEqual(expectedActions);
        expect(axios.get).toBeCalledTimes(1);
    });

    it('should create an action when get location forecast data has started', () => {
        const expectedAction = {
            type: locationsActionTypes.GET_LOCATION_FORECAST_REQUEST,
        };

        expect(actions.getLocationForecastRequest()).toEqual(expectedAction);
    });
    it('should create an action when get location forecast data has been successful', () => {
        const mockForecastList = fakeForcastList();
        const expectedAction = {
            type: locationsActionTypes.GET_LOCATION_FORECAST_SUCCESS,
            payload: {
                id: 123,
                data: mockForecastList,
            },
        };
        expect(
            actions.getLocationForecastSuccess({
                id: 123,
                data: mockForecastList,
            })
        ).toEqual(expectedAction);
    });

    it('should create an action when get location forecast data has failed', () => {
        const errorMessage = 'Failed to get the forecast data please refresh to try again';

        const expectedAction = {
            type: locationsActionTypes.GET_LOCATION_FORECAST_FAIL,
            payload: errorMessage,
        };
        expect(actions.getLocationForecastFail(errorMessage)).toEqual(expectedAction);
    });

    it('should create an action to start the get forecast of a location and another action to mark the success of the fetched data', async () => {
        const mockForecastList = fakeForcastList();
        const store = mockStore({});

        const mockLocationId = 123;
        const mockApiReturn: ForecastResponse = {
            cod: '200',
            message: 0,
            cnt: 8,
            list: mockForecastList,
            city: {
                id: mockLocationId,
                name: 'Newcastle upon Tyne',
                coord: {
                    lat: 54.9733,
                    lon: -1.614,
                },
                country: 'GB',
                timezone: 3600,
                sunrise: 1594871382,
            },
        };
        axios.get = jest.fn().mockResolvedValue({ data: mockApiReturn });

        const expectedActions = [
            { type: locationsActionTypes.GET_LOCATION_FORECAST_REQUEST },
            {
                type: locationsActionTypes.GET_LOCATION_FORECAST_SUCCESS,
                payload: {
                    id: mockLocationId,
                    data: mockForecastList,
                },
            },
        ];

        await store.dispatch(actions.getForecast(mockLocationId) as any);

        expect(store.getActions()).toEqual(expectedActions);
        expect(axios.get).toBeCalledTimes(1);
    });

    it('should create an action to start the get forecast of a location and another action to mark the failure of the fetched data', async () => {
        const errorMessage = 'Failed to get the forecast data please refresh to try again';
        const mockLocationId = 123;

        const store = mockStore({});

        axios.get = jest.fn().mockRejectedValue(new Error());

        const expectedActions = [
            { type: locationsActionTypes.GET_LOCATION_FORECAST_REQUEST },
            { type: locationsActionTypes.GET_LOCATION_FORECAST_FAIL, payload: errorMessage },
        ];

        await store.dispatch(actions.getForecast(mockLocationId) as any);

        expect(store.getActions()).toEqual(expectedActions);
        expect(axios.get).toBeCalledTimes(1);
    });
});
