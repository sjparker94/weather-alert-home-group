import Location from '../interfaces/Location';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render as rtlRender } from '@testing-library/react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../reducers/index';
import thunk from 'redux-thunk';
import theme from '../styles/theme';
import { addHours, getTime, format } from 'date-fns';
import Forecast from '../interfaces/Forecast';

export const fakeLocation = (edits?: Partial<Location>): Location => ({
    coord: {
        lon: -0.13,
        lat: 51.51,
    },
    weather: [
        {
            id: 802,
            main: 'Clouds',
            description: 'scattered clouds',
            icon: '03d',
        },
    ],
    base: 'stations',
    main: {
        temp: 22.85,
        feels_like: 19.87,
        temp_min: 22.22,
        temp_max: 24.44,
        pressure: 1028,
        humidity: 31,
    },
    visibility: 10000,
    wind: {
        speed: 2.6,
        deg: 0,
    },
    clouds: {
        all: 40,
    },
    dt: 1594560101,
    sys: {
        type: 1,
        id: 1414,
        country: 'GB',
        sunrise: 1594526265,
        sunset: 1594584852,
    },
    timezone: 3600,
    id: 2643743,
    name: 'London',
    cod: 200,
    ...edits,
});

const fakeForecast = (edits?: Partial<Forecast>): Forecast => ({
    weather: [
        {
            id: 802,
            main: 'Clouds',
            description: 'scattered clouds',
            icon: '03d',
        },
    ],
    main: {
        temp: 17.64,
        feels_like: 15.12,
        temp_min: 17.64,
        temp_max: 24.44,
        pressure: 1016,
        humidity: 74,
    },
    wind: {
        speed: 5.42,
        deg: 250,
    },
    clouds: {
        all: 40,
    },
    dt: 1594560101,
    sys: {
        pod: 'd',
    },
    dt_text: '2020-01-16 00:00:00',
    ...edits,
});

export const fakeForcastList = () => {
    // Base date that is pushed forward to mock 3 hour forecast data
    const originalMockDate = new Date('January 16, 2020 00:00:00');

    const mockedForecastData = new Array(8).fill(null).map((item, i) => {
        const newDate = addHours(originalMockDate, i * 3);
        const timeStamp = getTime(newDate);
        const dateFormatted = format(newDate, 'yyyy-LL-dd HH:mm:ss');
        return fakeForecast({
            dt_text: dateFormatted,
            dt: timeStamp,
        });
    });

    return mockedForecastData;
};

const render = (ui: any, initialStore = {}, options = {}) => {
    const store = createStore(rootReducer, initialStore, applyMiddleware(thunk));

    const Providers = ({ children }: any) => (
        <Provider store={store}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </Provider>
    );

    return rtlRender(ui, { wrapper: Providers, ...options });
};
// re-export everything
export * from '@testing-library/react';

// override render method
export { render };
