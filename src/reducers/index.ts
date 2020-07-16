import { combineReducers } from 'redux';
import locations from './locationsReducer';
import settings from './settingsReducer';

const rootReducer = combineReducers({
    locations,
    settings,
});

export default rootReducer;
