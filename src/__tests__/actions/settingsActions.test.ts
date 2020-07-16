import * as settingsActionTypes from '../../constants/settingsActions';
import * as actions from '../../actions/settingsActions';

describe('settings actions', () => {
    it('should create an action when temparature unit has been toggled', () => {
        const expectedAction = {
            type: settingsActionTypes.TEMPERATURE_UNIT_TOGGLE,
        };

        expect(actions.temperatureUnitToggle()).toEqual(expectedAction);
    });
    it('should create an action when speed unit has been toggled', () => {
        const expectedAction = {
            type: settingsActionTypes.SPEED_UNIT_TOGGLE,
        };

        expect(actions.speedUnitToggle()).toEqual(expectedAction);
    });
});
