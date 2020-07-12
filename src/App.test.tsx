import React from 'react';
import App from './App';
import { render, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

afterEach(cleanup);

it('renders App with Provider correctly', () => {
    // beforeAll(() => {});
    // const { getByText } = render(
    //     <Provider store={configureStore()}>
    //         <App />
    //     </Provider>
    // );
    // const element = getByText(/Welcome!/i);
    // expect(element).toBeInTheDocument();
});
