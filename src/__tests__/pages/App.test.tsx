import React from 'react';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

// @ts-ignore
import { render, wait, fakeLocation } from '../../utils/testUtils';
import HomePage from '../../pages/HomePage';
import App from '../../App';

jest.mock('axios');

const mockLocation = fakeLocation();

describe('<App />', () => {
    it('renders and matches snapshot', async () => {
        const { container, getByTestId } = render(<App />);

        // Check that the search button is in the dom
        expect(getByTestId('location-search-input')).toBeInTheDocument();

        expect(container).toMatchSnapshot();
    });

    it('handles user input', async () => {
        const { getByPlaceholderText, getByTestId } = render(<App />);

        const inputEl = getByTestId('location-search-input');

        expect(inputEl).toBeInTheDocument();
        await userEvent.type(inputEl, 'London');

        expect(inputEl).toHaveAttribute('value', 'London');
    });

    it('handles user input', async () => {
        const { getByText, getByPlaceholderText } = render(<App />);

        const inputEl = getByPlaceholderText(/Newcastle Upon Tyne/i);

        expect(getByText('Search')).toBeInTheDocument();
        expect(inputEl).toBeInTheDocument();
        await userEvent.type(inputEl, 'London');

        expect(inputEl).toHaveAttribute('value', 'London');
    });

    it('displays confirm block after a successful search', async () => {
        const { getByPlaceholderText, getByTestId, getByText, queryByTestId } = render(<App />);

        const inputEl = getByPlaceholderText(/Newcastle Upon Tyne/i);
        const buttonEl = getByTestId('main-search-button');

        axios.get = jest.fn().mockResolvedValue({ data: mockLocation });

        expect(inputEl).toBeInTheDocument();
        await userEvent.type(inputEl, 'London');

        await userEvent.click(buttonEl);
        await wait(() => {
            // Check the api has been called
            expect(axios.get).toHaveBeenCalledTimes(1);
            // Check any errors are not displaying
            expect(queryByTestId('search-error')).not.toBeInTheDocument();
            // Check that the return from the api is being displayed
            expect(getByText(mockLocation.name)).toBeInTheDocument();
        });
    });

    it('displays error block after a search failure', async () => {
        const { getByPlaceholderText, getByTestId } = render(<App />);

        const inputEl = getByPlaceholderText(/Newcastle Upon Tyne/i);
        const buttonEl = getByTestId('main-search-button');

        axios.get = jest.fn().mockRejectedValue(new Error());

        expect(inputEl).toBeInTheDocument();
        await userEvent.type(inputEl, 'lssdk');

        userEvent.click(buttonEl);

        await wait(() => {
            // Check that the error is being displayed
            expect(getByTestId('search-error')).toBeInTheDocument();
        });
    });

    it('handles the cancelling of a location search', async () => {
        const { getByPlaceholderText, getByTestId, queryByText, queryByTestId } = render(
            <HomePage />
        );

        const inputEl = getByPlaceholderText(/Newcastle Upon Tyne/i);
        const buttonEl = getByTestId('main-search-button');

        axios.get = jest.fn().mockResolvedValue({ data: mockLocation });

        expect(inputEl).toBeInTheDocument();
        await userEvent.type(inputEl, 'London');

        userEvent.click(buttonEl);
        await wait(() => {
            userEvent.click(getByTestId('cancel-search-button'));

            // Check that the confirm block has been removed from the dom
            expect(queryByText(mockLocation.name)).not.toBeInTheDocument();
        });
    });

    it('handles the confirming of a location search and adds to the favourites', async () => {
        const {
            getByPlaceholderText,
            getByTestId,
            getAllByTestId,
            queryByText,
            queryByTestId,
        } = render(<App />);

        const inputEl = getByPlaceholderText(/Newcastle Upon Tyne/i);
        const buttonEl = getByTestId('main-search-button');

        axios.get = jest.fn().mockResolvedValue({ data: mockLocation });

        expect(inputEl).toBeInTheDocument();
        await userEvent.type(inputEl, 'London');

        userEvent.click(buttonEl);
        await wait(() => {
            userEvent.click(getByTestId('confirm-search-button'));

            const favouriteLocationEls: HTMLElement[] = getAllByTestId('favourite-location');

            // Check that the favourite locations have been updated and now contain an item
            expect(favouriteLocationEls.length).toBe(1);
            // Check that the correct location has been added
            expect(favouriteLocationEls[0]).toHaveTextContent(mockLocation.name);
        });
    });
});
