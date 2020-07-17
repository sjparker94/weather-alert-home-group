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
describe('<LocationDetailPage />', () => {
    it('renders with the correct location and matches snapshot', async () => {
        const history = createMemoryHistory({
            // id matches one of the items in the mock redux store
            initialEntries: ['/location/123'],
        });
        const { container } = render(
            <Router history={history}>
                <Pages />
            </Router>,
            mockInitalReduxStateWithData
        );

        // Check that the correct city is showing based on the id used in the url
        expect(screen.getByText(/Newcastle upon Tyne/i)).toBeInTheDocument();

        expect(container).toMatchSnapshot();
    });

    it('renders with the correct location and is displaying the data correctly', async () => {
        const history = createMemoryHistory({
            // id matches one of the items in the mock redux store
            initialEntries: ['/location/123'],
        });
        render(
            <Router history={history}>
                <Pages />
            </Router>,
            mockInitalReduxStateWithData
        );

        const expectedWindDirectionCssValue = `${mockLocation2.wind.deg - 180}deg`;
        const expectedWindMph = '6';
        const expectedWindSpeedColor = theme.green;
        const expectedSpeedUnit = 'mph';
        const expectedTempUnit = '°C';
        const expectedSpeedText = 'Gentle';
        const expectedDirectionText = 'South Easterly';

        // Get elements
        const windDirectionIcon = screen.getByTestId('wind-direction-icon');
        const mainWindSpeedHeading = screen.getByTestId('main-wind-speed-title');
        const windSpeedTextValue = screen.getByTestId('wind-speed-text-value');
        const windDirectionTextValue = screen.getByTestId('wind-direction-text-value');
        const speedUnitEls = screen.getAllByTestId('speed-units');
        const tempUnitEls = screen.getAllByTestId('temp-units');

        // Check wind direction icon is showing and that the correct rotate
        expect(windDirectionIcon).toHaveStyle(
            `transform: rotate(${expectedWindDirectionCssValue});`
        );
        // Check the value of wind is showing
        expect(mainWindSpeedHeading).toHaveTextContent(expectedWindMph);
        // Check that the variable color scheme is displaying the right color value
        expect(mainWindSpeedHeading).toHaveStyle(`color: ${expectedWindSpeedColor}`);
        // check that the textual value is correct
        expect(windSpeedTextValue).toHaveTextContent(expectedSpeedText);
        // Check that the textual direction is correct
        expect(windDirectionTextValue).toHaveTextContent(expectedDirectionText);

        // loop all of the speed & temp unit elements and check they are set the to initial redux store value
        speedUnitEls.forEach(el => {
            expect(el).toHaveTextContent(expectedSpeedUnit);
        });
        tempUnitEls.forEach(el => {
            expect(el).toHaveTextContent(expectedTempUnit);
        });
    });

    // rendering with the PageLayout so we can use the
    it('show correct location and toggles units and values correctly', async () => {
        const history = createMemoryHistory({
            // id matches one of the items in the mock redux store
            initialEntries: ['/location/123'],
        });
        render(
            <Router history={history}>
                <PageLayout>
                    <Route component={Pages} />
                </PageLayout>
            </Router>,
            mockInitalReduxStateWithData
        );

        // All of the values that can change via settings
        const expectedChangedWindValue = '9';
        const expectedChangedSpeedUnit = 'km/h';
        const expectedChangedTempUnit = '°F';

        // Get elements
        const mainWindSpeedHeading = screen.getByTestId('main-wind-speed-title');
        const speedUnitEls = screen.getAllByTestId('speed-units');
        const tempUnitEls = screen.getAllByTestId('temp-units');

        const settingsButton = screen.getByRole('button', {
            name: 'Open Settings',
        });

        // fire events to toggle settings menu open
        fireEvent.click(settingsButton);

        const tempToggle = screen.getByRole('checkbox', {
            name: 'Temperature unit',
        });
        const speedToggle = screen.getByRole('checkbox', {
            name: 'Wind speed unit',
        });

        // fire events to toggle the units
        fireEvent.click(tempToggle);
        fireEvent.click(speedToggle);

        // Check the value of wind has changed to correct km/h value
        expect(mainWindSpeedHeading).toHaveTextContent(expectedChangedWindValue);

        // loop all of the speed & temp unit elements and check they have switched
        speedUnitEls.forEach(el => {
            expect(el).toHaveTextContent(expectedChangedSpeedUnit);
        });
        tempUnitEls.forEach(el => {
            expect(el).toHaveTextContent(expectedChangedTempUnit);
        });
    });

    it('redirects to the error page when location is deleted and you are on that page', () => {
        const history = createMemoryHistory({
            // id matches one of the items in the mock redux store
            initialEntries: ['/location/123'],
        });
        render(
            <Router history={history}>
                <PageLayout>
                    <Route component={Pages} />
                </PageLayout>
            </Router>,
            mockInitalReduxStateWithData
        );

        const sidebarDeleteEl = screen.getByRole('button', {
            name: 'Remove Newcastle upon Tyne from favourites',
        });
        fireEvent.click(sidebarDeleteEl);

        expect(history.location.pathname).toBe('/404');
    });
});
