import locationsReducer, { locationsInitialState } from '../../reducers/locationsReducer';
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
            ...locationsInitialState,
            getLocations: {
                isPending: true,
                success: false,
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
            ...locationsInitialState,
            data: [mockLocation],
            isInitialLoad: false,
            getLocations: {
                isPending: false,
                success: true,
            },
        });
    });
    it('should handle GET_LOCATIONS_FAIL', () => {
        expect(
            locationsReducer(undefined, {
                type: locationsActionTypes.GET_LOCATIONS_FAIL,
            })
        ).toEqual({
            ...locationsInitialState,
            isInitialLoad: false,
            getLocations: {
                isPending: false,
                success: false,
            },
        });
    });

    it('should handle SEARCH_LOCATION_REQUEST', () => {
        expect(
            locationsReducer(undefined, {
                type: locationsActionTypes.SEARCH_LOCATION_REQUEST,
            })
        ).toEqual({
            ...locationsInitialState,
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
            ...locationsInitialState,
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
            ...locationsInitialState,
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
            ...locationsInitialState,
            data: [mockLocation],
            searchLocation: {
                isPending: false,
                success: false,
                error: null,
                data: null,
            },
        });
    });
    it('should handle REMOVE_LOCATION', () => {
        const mockLocationToRemove = fakeLocation({
            id: 123,
            name: 'Newcastle upon Tyne',
        });

        // Base initial state with 2 items
        const initialState = {
            ...locationsInitialState,
            data: [mockLocation, mockLocationToRemove],
        };

        // Removes corrent item from the array of locations
        expect(
            locationsReducer(initialState, {
                type: locationsActionTypes.REMOVE_LOCATION,
                payload: mockLocationToRemove.id,
            })
        ).toEqual({
            ...locationsInitialState,
            data: [mockLocation],
        });

        // No change when removing an item that does not exist
        expect(
            locationsReducer(undefined, {
                type: locationsActionTypes.REMOVE_LOCATION,
                payload: mockLocation.id,
            })
        ).toEqual(locationsInitialState);
    });
});
