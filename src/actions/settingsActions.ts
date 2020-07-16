import * as settingsActionTypes from '../constants/settingsActions';
import { Action } from 'redux';

export interface TemperatureUnitToggle extends Action {
    type: typeof settingsActionTypes.TEMPERATURE_UNIT_TOGGLE;
}
export interface SpeedUnitToggle extends Action {
    type: typeof settingsActionTypes.SPEED_UNIT_TOGGLE;
}

export const temperatureUnitToggle = (): TemperatureUnitToggle => {
    return {
        type: settingsActionTypes.TEMPERATURE_UNIT_TOGGLE,
    };
};
export const speedUnitToggle = (): SpeedUnitToggle => {
    return {
        type: settingsActionTypes.SPEED_UNIT_TOGGLE,
    };
};
