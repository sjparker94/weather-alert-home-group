import {
    GetLocationsRequest,
    GetLocationsSuccess,
    GetLocationsFail,
    SearchLocationRequest,
    SearchLocationSuccess,
    SearchLocationFail,
    SearchLocationCancel,
    AddLocation,
    RemoveLocation,
} from './locationsActions';

import { SpeedUnitToggle, TemperatureUnitToggle } from './settingsActions';

// export type AllActions = GetLocationsRequest | GetLocationsSuccess | GetLocationsFail;
export type AllSettingsActions = SpeedUnitToggle | TemperatureUnitToggle;

export type AllLocationsActions =
    | GetLocationsRequest
    | GetLocationsSuccess
    | GetLocationsFail
    | SearchLocationRequest
    | SearchLocationSuccess
    | SearchLocationFail
    | SearchLocationCancel
    | AddLocation
    | RemoveLocation;
