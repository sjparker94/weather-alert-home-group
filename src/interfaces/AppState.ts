import LocationsState from './LocationsState';
import SettingsState from './SettingsState';

interface AppState {
    locations: LocationsState;
    settings: SettingsState;
}

export default AppState;
