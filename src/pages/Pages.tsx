import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import ErrorPage from './ErrorPage';
import LocationDetailPage from './LocationDetailPage';

const Pages: React.FC = () => {
    return (
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/location/:id" component={LocationDetailPage} />
            <Route component={ErrorPage} />
        </Switch>
    );
};

export default Pages;
