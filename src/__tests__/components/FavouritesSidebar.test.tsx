import React from 'react';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';

// @ts-ignore
import { render, waitFor, fakeLocation, fireEvent, screen } from '../../utils/testUtils';
import FavouritesSidebar from '../../components/FavouritesSidebar/FavouritesSidebar';
import AppState from '../../interfaces/AppState';
import { locationsInitialState } from '../../reducers/locationsReducer';

jest.mock('axios');

const mockLocation = fakeLocation();
const mockLocation2 = fakeLocation({
    id: 123,
    name: 'Newcastle upon Tyne',
});

const mockInitalReduxStateWithData: AppState = {
    locations: {
        ...locationsInitialState,
        data: [mockLocation, mockLocation2],
    },
};

describe('<FavouritesSidebar />', () => {
    it('renders with no locations and matches snapshot', async () => {
        const { container } = render(
            <Router>
                <FavouritesSidebar />
            </Router>
        );

        // Check that the there are no favourites set
        expect(screen.queryAllByTestId('favourite-location')).toHaveLength(0);

        expect(container).toMatchSnapshot();
    });

    it('renders with 2 locations with fetching state before latest data is there', async () => {
        render(
            <Router>
                <FavouritesSidebar />
            </Router>,
            mockInitalReduxStateWithData
        );

        expect(screen.getAllByText(/fetching/i)).toHaveLength(2);
    });
    it('renders with 2 locations and matches snapshot', async () => {
        const { container } = render(
            <Router>
                <FavouritesSidebar />
            </Router>,
            mockInitalReduxStateWithData
        );

        // Wait for the latest data which displays the temperature of each location with icon
        const tempIcons = await screen.findAllByTitle('Temperature');
        const windSpeedIcons = await screen.findAllByTitle('Wind Speed');

        // Check that both of the mock loactions are in the dom and the weather is displaying
        expect(screen.getAllByTestId('favourite-location')).toHaveLength(2);
        expect(screen.getByText(mockLocation.name)).toBeInTheDocument();
        expect(screen.getByText(mockLocation2.name)).toBeInTheDocument();
        expect(tempIcons).toHaveLength(2);
        expect(windSpeedIcons).toHaveLength(2);

        expect(container).toMatchSnapshot();
    });

    it('removes location when the delete button is pressed', async () => {
        render(
            <Router>
                <FavouritesSidebar />
            </Router>,
            mockInitalReduxStateWithData
        );

        // Wait for the latest data which displays the temperature of each location with icon
        const deleteButtons = await screen.findAllByRole('button');

        fireEvent.click(deleteButtons[0]);

        const locations = screen.getAllByTestId('favourite-location');
        expect(deleteButtons[0]).not.toBeInTheDocument();
        expect(locations).toHaveLength(1);
    });

    it('it changes page/url when location link is clicked', async () => {
        render(
            <Router>
                <FavouritesSidebar />
            </Router>,
            mockInitalReduxStateWithData
        );

        // Wait for the latest data which displays the temperature of each location with icon
        const links = await screen.findAllByTestId('favourite-location-link');

        fireEvent.click(links[1]);
        expect(window.location.pathname).toBe('/location/123');
    });
});
