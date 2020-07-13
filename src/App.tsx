import React, { useEffect } from 'react';
import { createBrowserHistory } from 'history';
import '@csstools/normalize.css';
import { useDispatch } from 'react-redux';
import { Router, Route } from 'react-router-dom';

import Pages from './pages/Pages';
import PageLayout from './components/PageLayout/PageLayout';

const history = createBrowserHistory();

const App: React.FC = () => {
    return (
        <Router history={history}>
            <PageLayout>
                <Route component={Pages} />
            </PageLayout>
        </Router>
    );
};

export default App;
