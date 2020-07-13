import {
    GetLocationsRequest,
    GetLocationsSuccess,
    GetLocationsFail,
    SearchLocationRequest,
    SearchLocationSuccess,
    SearchLocationFail,
    SearchLocationCancel,
    AddLocation,
} from './locationsActions';

// export type AllActions = GetLocationsRequest | GetLocationsSuccess | GetLocationsFail;
export type AllActions =
    | GetLocationsRequest
    | GetLocationsSuccess
    | GetLocationsFail
    | SearchLocationRequest
    | SearchLocationSuccess
    | SearchLocationFail
    | SearchLocationCancel
    | AddLocation;
