import React from 'react';
import '@csstools/normalize.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Pages from './pages/Pages';
import PageLayout from './components/PageLayout/PageLayout';

const App: React.FC = () => {
    // const isInitialLoad = useSelector<AppState, boolean>(state => state.locations.isInitialLoad);
    // const app = !isInitialLoad ? <Route component={Pages} /> : null;
    return (
        <Router>
            <PageLayout>
                <Route component={Pages} />
            </PageLayout>
        </Router>
    );
};

export default App;
