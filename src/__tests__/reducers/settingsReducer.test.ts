import settingsReducer, { settingsInitialState } from '../../reducers/settingsReducer';
import * as settingsActionTypes from '../../constants/settingsActions';

describe('settings reducer', () => {
    it('should return the initial state', () => {
        expect(settingsReducer(undefined, {})).toEqual({
            isFahrenheit: false,
            isKm: false,
        });
    });
    // SPEED_UNIT_TOGGLE
    it('should handle TEMPERATURE_UNIT_TOGGLE from false to true', () => {
        expect(
            settingsReducer(
                {
                    ...settingsInitialState,
                    isFahrenheit: false,
                },
                {
                    type: settingsActionTypes.TEMPERATURE_UNIT_TOGGLE,
                }
            )
        ).toEqual({
            ...settingsInitialState,
            isFahrenheit: true,
        });
    });
    it('should handle TEMPERATURE_UNIT_TOGGLE from true to false', () => {
        expect(
            settingsReducer(
                {
                    ...settingsInitialState,
                    isFahrenheit: true,
                },
                {
                    type: settingsActionTypes.TEMPERATURE_UNIT_TOGGLE,
                }
            )
        ).toEqual({
            ...settingsInitialState,
            isFahrenheit: false,
        });
    });

    it('should handle SPEED_UNIT_TOGGLE from false to true', () => {
        expect(
            settingsReducer(
                {
                    ...settingsInitialState,
                    isKm: false,
                },
                {
                    type: settingsActionTypes.SPEED_UNIT_TOGGLE,
                }
            )
        ).toEqual({
            ...settingsInitialState,
            isKm: true,
        });
    });
    it('should handle SPEED_UNIT_TOGGLE from true to false', () => {
        expect(
            settingsReducer(
                {
                    ...settingsInitialState,
                    isKm: true,
                },
                {
                    type: settingsActionTypes.SPEED_UNIT_TOGGLE,
                }
            )
        ).toEqual({
            ...settingsInitialState,
            isKm: false,
        });
    });
});
