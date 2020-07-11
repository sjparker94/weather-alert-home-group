import produce, { Draft, castDraft } from 'immer';
import LocationsState from '../interfaces/LocationsState';
import neverReached from '../utils/neverReached';
import { AllActions } from '../actions/allActions';
import * as LocationsActionTypes from '../constants/actions';

// type LocationsActionTypes = any;
const locationsInitialState: LocationsState = {
    data: [],
    getLocations: {
        isPending: false,
        success: false,
    },
};

const locations = produce((draft: Draft<LocationsState>, action: AllActions) => {
    switch (action.type) {
        case LocationsActionTypes.GET_LOCATIONS_REQUEST:
            draft.getLocations.isPending = true;
            break;
        case LocationsActionTypes.GET_LOCATIONS_SUCCESS:
            draft.data = castDraft(action.payload);
            break;
        default:
            neverReached(action);
    }
}, locationsInitialState);

export default locations;
