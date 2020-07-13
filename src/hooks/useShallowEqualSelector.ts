import { shallowEqual, useSelector } from 'react-redux';

import AppState from '../interfaces/AppState';

function useShallowEqualSelector<TReturn>(selector: (state: AppState) => TReturn) {
    return useSelector<AppState, TReturn>(selector, shallowEqual);
}

export default useShallowEqualSelector;
