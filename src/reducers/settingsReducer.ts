import { AllSettingsActions } from '../actions/allActions';
import SettingsState from '../interfaces/SettingsState';
import * as settingsActionTypes from '../constants/settingsActions';

export const settingsInitialState: SettingsState = {
    isFahrenheit: false,
    isKm: false,
};

const settings = (
    state: SettingsState = settingsInitialState,
    action: AllSettingsActions
): SettingsState => {
    switch (action.type) {
        case settingsActionTypes.TEMPERATURE_UNIT_TOGGLE:
            return {
                ...state,
                isFahrenheit: !state.isFahrenheit,
            };
        case settingsActionTypes.SPEED_UNIT_TOGGLE:
            return {
                ...state,
                isKm: !state.isKm,
            };
        default:
            return state;
    }
};

export default settings;
