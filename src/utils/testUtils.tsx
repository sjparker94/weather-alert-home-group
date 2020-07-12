import Location from '../interfaces/Location';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render as rtlRender } from '@testing-library/react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../reducers/index';
import thunk from 'redux-thunk';
import theme from '../styles/theme';

export const fakeLocation = (): Location => ({
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
});

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
