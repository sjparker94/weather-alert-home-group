import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import Meta from '../Meta/Meta';
import theme from '../../styles/theme';
import GlobalStyle from '../../styles/GlobalStyle';
import FavouritesSidebarStyles from '../FavouritesSidebar/FavouritesSidebarStyles';
import FavouritesSidebar from '../FavouritesSidebar/FavouritesSidebar';
import Header from '../Header/Header';
import { device } from '../../styles/breakpoint';

const StyledPage = styled.div`
    position: relative;
    min-height: 100vh;

    .main-page-layout-wrapper {
        height: 100vh;
        display: flex;
    }
    .main-page-content,
    ${FavouritesSidebarStyles} .favourites-wrapper {
        --scrollbarBG: ${props => props.theme.blueGrey};
        --thumbBG: ${props => props.theme.darkBlueGrey};
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-color: var(--thumbBG) var(--scrollbarBG);
        &::-webkit-scrollbar {
            width: 12px;
            scrollbar-width: thin;
            scrollbar-color: var(--thumbBG) var(--scrollbarBG);
        }
        &::-webkit-scrollbar-track {
            background: var(--scrollbarBG);
        }
        &::-webkit-scrollbar-thumb {
            background-color: var(--thumbBG);
            border-radius: 6px;
            border: 3px solid var(--scrollbarBG);
        }
    }
    .main-page-content {
        flex: 1 1 100%;
    }

    ${FavouritesSidebarStyles} {
        flex: 1 0 600px;
        overflow-y: auto;
        .favourites-wrapper {
            --scrollbarBG: ${props => props.theme.lightBlueGrey};
            --thumbBG: ${props => props.theme.blueGrey};
        }
        @media ${device.laptopMMax} {
            flex: 1 0 300px;
        }
    }
`;

/** Shared layout across all pages */
const PageLayout: React.FC = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <StyledPage>
                <GlobalStyle />
                <Meta />
                <Header />
                <div className="main-page-layout-wrapper">
                    <main className="main-page-content">{children}</main>
                    <FavouritesSidebar />
                </div>
            </StyledPage>
        </ThemeProvider>
    );
};

export default PageLayout;
