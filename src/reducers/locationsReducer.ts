import produce, { Draft, castDraft } from 'immer';
import LocationsState from '../interfaces/LocationsState';
import neverReached from '../utils/neverReached';
import { AllActions } from '../actions/allActions';
import * as LocationsActionTypes from '../constants/actions';
import { findByProp } from '../utils/arrayUtils';
import Location from '../interfaces/Location';

// type LocationsActionTypes = any;
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
        case LocationsActionTypes.GET_LOCATIONS_REQUEST:
            draft.getLocations.isPending = true;
            break;
        case LocationsActionTypes.GET_LOCATIONS_SUCCESS:
            draft.data = castDraft(action.payload);
            draft.isInitialLoad = false;
            break;
        case LocationsActionTypes.SEARCH_LOCATION_REQUEST:
            draft.searchLocation.isPending = true;
            draft.searchLocation.data = null;
            draft.searchLocation.error = null;
            break;
        case LocationsActionTypes.SEARCH_LOCATION_SUCCESS:
            draft.searchLocation.isPending = false;
            draft.searchLocation.error = null;
            draft.searchLocation.data = action.payload;
            break;
        case LocationsActionTypes.SEARCH_LOCATION_CANCEL:
            draft.searchLocation.data = null;
            draft.searchLocation.error = null;
            break;
        case LocationsActionTypes.SEARCH_LOCATION_FAIL:
            draft.searchLocation.isPending = false;
            draft.searchLocation.error = action.payload;
            break;
        case LocationsActionTypes.ADD_LOCATION:
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
        default:
            neverReached(action);
    }
}, locationsInitialState);

export default locations;
