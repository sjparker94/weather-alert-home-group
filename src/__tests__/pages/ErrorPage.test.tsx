import React from 'react';
import { Router, Route } from 'react-router-dom';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';

// @ts-ignore
import { render, screen, fireEvent, waitFor, fakeLocation } from '../../utils/testUtils';
import Pages from '../../pages/Pages';
import AppState from '../../interfaces/AppState';
import { locationsInitialState } from '../../reducers/locationsReducer';
import { settingsInitialState } from '../../reducers/settingsReducer';
import theme from '../../styles/theme';
import PageLayout from '../../components/PageLayout/PageLayout';
import { speedUnitToggle } from '../../actions/settingsActions';

jest.mock('axios');

const mockLocation = fakeLocation();
const mockLocation2 = fakeLocation({
    id: 123,
    name: 'Newcastle upon Tyne',
});
mockLocation2.wind.deg = 146;
const mockLocation3 = fakeLocation({
    id: 456,
    name: 'Somewhere else',
});

const mockInitalReduxStateWithData: AppState = {
    locations: {
        ...locationsInitialState,
        isInitialLoad: false,
        data: [mockLocation, mockLocation2],
    },
    settings: {
        ...settingsInitialState,
    },
};

// Need to render full app with router to test the toggle of the settings
describe('<ErrorPage />', () => {
    it('renders on the error page when a bad url is used and displays correctly', () => {
        const history = createMemoryHistory({
            // id matches one of the items in the mock redux store
            initialEntries: ['/random-thing-that-does-not-exist'],
        });
        const { container } = render(
            <Router history={history}>
                <Pages />
            </Router>
        );

        const button = screen.getByRole('link', { name: 'Go back home' });

        // Check correct elements are there
        expect(screen.getByText(/404/i)).toBeInTheDocument();
        expect(screen.getByText(/Oops something went wrong/i)).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    it('sends you to the home page when clicking the error page button link', () => {
        const history = createMemoryHistory({
            // id matches one of the items in the mock redux store
            initialEntries: ['/random-thing-that-does-not-exist'],
        });
        render(
            <Router history={history}>
                <Pages />
            </Router>
        );

        const button = screen.getByRole('link', { name: 'Go back home' });

        fireEvent.click(button);

        expect(history.location.pathname).toBe('/');
    });
});
