import locationsReducer from '../../reducers/locationsReducer';
import * as locationsActionTypes from '../../constants/actions';
import { fakeLocation } from '../../utils/testUtils';

const mockLocation = fakeLocation();

describe('locations reducer', () => {
    it('should return the initial state', () => {
        // Ignore to test intialise
        // @ts-ignore
        expect(locationsReducer(undefined, {})).toEqual({
            data: [],
            isInitialLoad: true,
            getLocations: {
                isPending: false,
                success: false,
            },
            searchLocation: {
                isPending: false,
                success: false,
                error: null,
                data: null,
            },
        });
    });

    it('should handle GET_LOCATIONS_REQUEST', () => {
        expect(
            locationsReducer(undefined, {
                type: locationsActionTypes.GET_LOCATIONS_REQUEST,
            })
        ).toEqual({
            data: [],
            isInitialLoad: true,
            getLocations: {
                isPending: true,
                success: false,
            },
            searchLocation: {
                isPending: false,
                success: false,
                error: null,
                data: null,
            },
        });
    });

    it('should handle GET_LOCATIONS_SUCCESS', () => {
        expect(
            locationsReducer(undefined, {
                type: locationsActionTypes.GET_LOCATIONS_SUCCESS,
                payload: [mockLocation],
            })
        ).toEqual({
            data: [mockLocation],
            isInitialLoad: false,
            getLocations: {
                isPending: false,
                success: true,
            },
            searchLocation: {
                isPending: false,
                success: false,
                error: null,
                data: null,
            },
        });
    });

    it('should handle SEARCH_LOCATION_REQUEST', () => {
        expect(
            locationsReducer(undefined, {
                type: locationsActionTypes.SEARCH_LOCATION_REQUEST,
            })
        ).toEqual({
            data: [],
            isInitialLoad: true,
            getLocations: {
                isPending: false,
                success: false,
            },
            searchLocation: {
                isPending: true,
                success: false,
                error: null,
                data: null,
            },
        });
    });

    it('should handle SEARCH_LOCATION_SUCCESS', () => {
        expect(
            locationsReducer(undefined, {
                type: locationsActionTypes.SEARCH_LOCATION_SUCCESS,
                payload: mockLocation,
            })
        ).toEqual({
            data: [],
            isInitialLoad: true,
            getLocations: {
                isPending: false,
                success: false,
            },
            searchLocation: {
                isPending: false,
                success: true,
                error: null,
                data: mockLocation,
            },
        });
    });

    it('should handle SEARCH_LOCATION_FAIL', () => {
        const errorMessage = 'No results were found, please try searching again';
        expect(
            locationsReducer(undefined, {
                type: locationsActionTypes.SEARCH_LOCATION_FAIL,
                payload: errorMessage,
            })
        ).toEqual({
            data: [],
            isInitialLoad: true,
            getLocations: {
                isPending: false,
                success: false,
            },
            searchLocation: {
                isPending: false,
                success: false,
                error: errorMessage,
                data: null,
            },
        });
    });

    it('should handle ADD_LOCATION', () => {
        expect(
            locationsReducer(undefined, {
                type: locationsActionTypes.ADD_LOCATION,
                payload: mockLocation,
            })
        ).toEqual({
            data: [mockLocation],
            isInitialLoad: true,
            getLocations: {
                isPending: false,
                success: false,
            },
            searchLocation: {
                isPending: false,
                success: false,
                error: null,
                data: null,
            },
        });
    });
});
