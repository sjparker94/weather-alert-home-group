import produce, { Draft } from 'immer';
import LocationsState from '../interfaces/LocationsState';
import neverReached from '../utils/neverReached';
import { AllActions } from '../actions/allActions';
import * as locationsActionTypes from '../constants/actions';
import { findByProp } from '../utils/arrayUtils';
import Location from '../interfaces/Location';

export const locationsInitialState: LocationsState = {
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
};

const locations = produce((draft: Draft<LocationsState>, action: AllActions) => {
    switch (action.type) {
        case locationsActionTypes.GET_LOCATIONS_REQUEST:
            draft.getLocations.isPending = true;
            draft.getLocations.success = false;
            break;
        case locationsActionTypes.GET_LOCATIONS_SUCCESS:
            draft.data = action.payload;
            draft.getLocations.isPending = false;
            draft.getLocations.success = true;
            draft.isInitialLoad = false;
            break;
        case locationsActionTypes.GET_LOCATIONS_FAIL:
            draft.getLocations.isPending = false;
            draft.getLocations.success = false;
            draft.isInitialLoad = false;
            break;
        case locationsActionTypes.SEARCH_LOCATION_REQUEST:
            draft.searchLocation.isPending = true;
            draft.searchLocation.success = false;
            draft.searchLocation.data = null;
            draft.searchLocation.error = null;
            break;
        case locationsActionTypes.SEARCH_LOCATION_SUCCESS:
            draft.searchLocation.isPending = false;
            draft.searchLocation.error = null;
            draft.searchLocation.success = true;
            draft.searchLocation.data = action.payload;
            break;
        case locationsActionTypes.SEARCH_LOCATION_CANCEL:
            draft.searchLocation.data = null;
            draft.searchLocation.error = null;
            break;
        case locationsActionTypes.SEARCH_LOCATION_FAIL:
            draft.searchLocation.isPending = false;
            draft.searchLocation.success = false;
            draft.searchLocation.error = action.payload;
            break;
        case locationsActionTypes.ADD_LOCATION:
            // See if the location is already in favourites
            const currentIdx = draft.data.findIndex(findByProp<Location>('id', action.payload.id));

            if (currentIdx === -1) {
                draft.data.push(action.payload);
            } else {
                // Update existing location with the latest data fetched
                draft.data[currentIdx] = action.payload;
            }
            draft.searchLocation.data = null;
            break;
        case locationsActionTypes.REMOVE_LOCATION:
            // See if the location exists
            const locationIdx = draft.data.findIndex(findByProp<Location>('id', action.payload));

            if (locationIdx !== -1) {
                draft.data.splice(locationIdx, 1);
            }
            break;
        default:
            neverReached(action);
    }
}, locationsInitialState);

export default locations;
