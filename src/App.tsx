import React, { useEffect } from 'react';
import { createBrowserHistory } from 'history';
import logo from './logo.svg';
import '@csstools/normalize.css';
import { useDispatch, useSelector } from 'react-redux';
import { Router, Route } from 'react-router-dom';

import Pages from './pages/Pages';
import PageLayout from './components/PageLayout/PageLayout';
import { getLocations } from './actions/locationsActions';
import AppState from './interfaces/AppState';
import LocationsState from './interfaces/LocationsState';

const history = createBrowserHistory();

const App: React.FC = () => {
    const dispatch = useDispatch();
    const locations = useSelector<AppState, LocationsState>((state: AppState) => state.locations);

    useEffect(() => {
        dispatch(getLocations());
    }, []);

    const app = !locations.isInitialLoad ? <Route component={Pages} /> : null;
    return (
        <Router history={history}>
            <PageLayout>{app}</PageLayout>
        </Router>
    );
};

export default App;
