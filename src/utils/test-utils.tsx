import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { createStore, Store } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../reducers/index';

function render(
    ui: React.ReactElement,
    {
        // @ts-ignore
        initialState = {},
        store = createStore(reducer, initialState),
        ...renderOptions
    }
) {
    function Wrapper({ children }: any): React.ReactElement {
        return <Provider store={store}>{children}</Provider>;
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { render };
