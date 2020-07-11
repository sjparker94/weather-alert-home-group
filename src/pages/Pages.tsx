import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './HomePage';
import ErrorPage from './ErrorPage';

const Pages: React.FC = () => {
    // const { isLoggedIn } = useUser();

    return (
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route component={ErrorPage} />
        </Switch>
    );
};

export default Pages;
