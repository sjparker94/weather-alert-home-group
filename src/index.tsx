import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/configureStore';
import { loadState, saveState } from './utils/localStorage';

const persistedState = loadState();
const store = configureStore(persistedState);

// Subscribe to changes to save the locations added into localStorage
store.subscribe(() => {
    saveState(store.getState().locations.data);
});

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
