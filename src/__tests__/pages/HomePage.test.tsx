import React from 'react';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

// @ts-ignore
import { render, screen, fireEvent, waitFor, fakeLocation } from '../../utils/testUtils';
import HomePage from '../../pages/HomePage';
import App from '../../App';
import AppState from '../../interfaces/AppState';
import { locationsInitialState } from '../../reducers/locationsReducer';
import { settingsInitialState } from '../../reducers/settingsReducer';

jest.mock('axios');

const mockLocation = fakeLocation();
const mockLocation2 = fakeLocation({
    id: 123,
    name: 'Newcastle upon Tyne',
});
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

describe('<App />', () => {
    afterEach(() => {
        window.localStorage.removeItem('locations');
    });

    it('renders and matches snapshot', async () => {
        const { container } = render(<App />);
        // Check that the search input is in the dom
        expect(screen.getByTestId('location-search-input')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
    it('handles user input', async () => {
        render(<App />);
        const inputEl = screen.getByTestId('location-search-input');
        const selectEl = screen.getByDisplayValue('Any');

        await userEvent.type(inputEl, 'London');
        fireEvent.change(selectEl, { target: { value: 'GB' } });

        expect(inputEl).toBeInTheDocument();
        expect(selectEl).toBeInTheDocument();
        expect(inputEl).toHaveAttribute('value', 'London');
        expect(screen.getByDisplayValue('United Kingdom')).toBeInTheDocument();
    });
    it('clears the select when the button is pressed', async () => {
        render(<App />);
        const selectEl = screen.getByDisplayValue('Any');
        const buttonEl = screen.getByRole('button', {
            name: /clear/i,
        });

        fireEvent.change(selectEl, { target: { value: 'GB' } });
        fireEvent.click(buttonEl);

        // Tested that the value changes in another test so check that this clears it
        expect(screen.getByDisplayValue('Any')).toBeInTheDocument();
    });
    it('displays confirm block after a successful search', async () => {
        const { getByText, queryByTestId } = render(<HomePage />, mockInitalReduxStateWithData);

        const selectEl = screen.getByDisplayValue('Any');
        const inputEl = screen.getByPlaceholderText(/Newcastle Upon Tyne/i);
        const buttonEl = screen.getByTestId('main-search-button');
        axios.get = jest.fn().mockResolvedValueOnce({ data: mockLocation3 });

        await userEvent.type(inputEl, 'Somewhere else');
        fireEvent.change(selectEl, { target: { value: 'GB' } });
        fireEvent.click(buttonEl);

        await waitFor(() => {
            // Check the api has been called
            expect(axios.get).toHaveBeenCalledTimes(1);
        });
        // // Check any errors are not displaying
        expect(queryByTestId('search-error')).not.toBeInTheDocument();
        // // Check that the return from the api is being displayed
        expect(getByText(mockLocation3.name)).toBeInTheDocument();
    });
    it('displays error block after a search failure', async () => {
        render(<App />);
        const inputEl = screen.getByPlaceholderText(/Newcastle Upon Tyne/i);
        const buttonEl = screen.getByTestId('main-search-button');
        axios.get = jest.fn().mockRejectedValue(new Error());

        await userEvent.type(inputEl, 'lssdk');
        fireEvent.click(buttonEl);

        await waitFor(() => {
            // Check that the error is being displayed
            expect(screen.getByTestId('search-error')).toBeInTheDocument();
        });
    });
    it('handles the cancelling of a location search', async () => {
        const { getByPlaceholderText, getByTestId } = render(<HomePage />);
        const inputEl = getByPlaceholderText(/Newcastle Upon Tyne/i);
        const buttonEl = getByTestId('main-search-button');
        axios.get = jest.fn().mockResolvedValue({ data: mockLocation });

        await userEvent.type(inputEl, 'London');
        fireEvent.click(buttonEl);

        const cancelButton = await screen.findByTestId('cancel-search-button');
        fireEvent.click(cancelButton);

        // Check that the confirm block has been removed from the dom
        expect(screen.queryByText(mockLocation.name)).not.toBeInTheDocument();
    });
    it('handles the confirming of a location search and adds to the favourites', async () => {
        const { getByPlaceholderText, getByTestId } = render(<App />);
        const inputEl = getByPlaceholderText(/Newcastle Upon Tyne/i);
        const buttonEl = getByTestId('main-search-button');
        axios.get = jest.fn().mockResolvedValue({ data: mockLocation });

        userEvent.type(inputEl, 'London');
        fireEvent.click(buttonEl);

        const confirmButton = await screen.findByTestId('confirm-search-button');
        fireEvent.click(confirmButton);

        // Get the list of favourites
        const favouriteLocationEls: HTMLElement[] = screen.getAllByTestId('favourite-location');
        // Check that the favourite locations have been updated and now contain an item
        expect(favouriteLocationEls.length).toBe(1);
        // Check that the correct location has been added
        expect(favouriteLocationEls[0]).toHaveTextContent(mockLocation.name);
    });

    it('shows the error message when a user has 20 locations and does not show the form', async () => {
        // fill an array with 20 locations to mock the store
        const fullLocations = new Array(20).fill(null).map((_, i) => fakeLocation({ id: 123 + i }));
        const mockInitalReduxStateWithFullData: AppState = {
            locations: {
                ...locationsInitialState,
                isInitialLoad: false,
                data: fullLocations,
            },
            settings: {
                ...settingsInitialState,
            },
        };

        render(<App />, mockInitalReduxStateWithFullData);

        axios.get = jest.fn().mockResolvedValue({ data: mockLocation });

        const errorHeading = screen.getByRole('heading', {
            name: 'Maximum Locations Added',
        });
        const errorMessageText = `You have added the maximum of 20 locations. To change your favourites please remove an existing location and the search will appear.`;
        const errorPara = screen.getByText(errorMessageText);
        const searchInput = screen.queryByPlaceholderText(/Newcastle upon Tyne/i);

        expect(errorHeading).toBeInTheDocument();
        expect(errorPara).toBeInTheDocument();
        expect(searchInput).not.toBeInTheDocument();
    });
});
