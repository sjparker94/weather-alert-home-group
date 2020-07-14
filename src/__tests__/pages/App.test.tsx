import React from 'react';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

// @ts-ignore
import { render, screen, fireEvent, waitFor, fakeLocation } from '../../utils/testUtils';
import HomePage from '../../pages/HomePage';
import App from '../../App';

jest.mock('axios');

const mockLocation = fakeLocation();

describe('<App />', () => {
    it('renders and matches snapshot', async () => {
        const { container } = render(<App />);

        // Check that the search input is in the dom
        expect(screen.getByTestId('location-search-input')).toBeInTheDocument();

        expect(container).toMatchSnapshot();
    });

    it('handles user input', async () => {
        render(<App />);

        const inputEl = screen.getByTestId('location-search-input');

        expect(inputEl).toBeInTheDocument();

        await userEvent.type(inputEl, 'London');

        expect(inputEl).toHaveAttribute('value', 'London');
    });

    it('displays confirm block after a successful search', async () => {
        const { getByText, queryByTestId } = render(<App />);

        const inputEl = screen.getByPlaceholderText(/Newcastle Upon Tyne/i);
        const buttonEl = screen.getByTestId('main-search-button');

        axios.get = jest.fn().mockResolvedValue({ data: mockLocation });

        expect(inputEl).toBeInTheDocument();
        await userEvent.type(inputEl, 'London');

        fireEvent.click(buttonEl);

        await waitFor(() => {
            // Check the api has been called
            expect(axios.get).toHaveBeenCalledTimes(1);
        });
        // Check any errors are not displaying
        expect(queryByTestId('search-error')).not.toBeInTheDocument();
        // Check that the return from the api is being displayed
        expect(getByText(mockLocation.name)).toBeInTheDocument();
    });

    it('displays error block after a search failure', async () => {
        const { getByPlaceholderText, getByTestId } = render(<App />);

        const inputEl = screen.getByPlaceholderText(/Newcastle Upon Tyne/i);
        const buttonEl = screen.getByTestId('main-search-button');

        axios.get = jest.fn().mockRejectedValue(new Error());

        await userEvent.type(inputEl, 'lssdk');

        fireEvent.click(buttonEl);

        await waitFor(() => {
            // Check that the error is being displayed
            expect(getByTestId('search-error')).toBeInTheDocument();
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

        userEvent.click(buttonEl);

        const confirmButton = await screen.findByTestId('confirm-search-button');
        fireEvent.click(confirmButton);

        // Get the list of favourites
        const favouriteLocationEls: HTMLElement[] = screen.getAllByTestId('favourite-location');

        // Check that the favourite locations have been updated and now contain an item
        expect(favouriteLocationEls.length).toBe(1);

        // Check that the correct location has been added
        expect(favouriteLocationEls[0]).toHaveTextContent(mockLocation.name);
    });
});