import { createStore, applyMiddleware, Store, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import rootReducer from '../reducers';
import AppState from '../interfaces/AppState';

const loggerMiddleware = createLogger();

function configureStore(initialState?: AppState): Store<AppState> {
    // tslint:disable-next-line:no-any
    let composeEnhancers: any = compose;

    if (process.env.NODE_ENV !== 'production') {
        // tslint:disable-next-line:no-any
        composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    }

    return createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(thunkMiddleware, loggerMiddleware))
    );
}

export default configureStore;
