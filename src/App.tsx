import React from 'react';
import { createBrowserHistory } from 'history';
import logo from './logo.svg';
import '@csstools/normalize.css';
import { useDispatch } from 'react-redux';
import { Router, Route } from 'react-router-dom';

import Pages from './pages/Pages';
import PageLayout from './components/PageLayout/PageLayout';

const history = createBrowserHistory();

const App: React.FC = () => {
    const dispatch = useDispatch();
    const isInitialLoad = true;
    const app = isInitialLoad ? <Route component={Pages} /> : null;
    return (
        <Router history={history}>
            <PageLayout>{app}</PageLayout>
        </Router>
    );
};

export default App;
