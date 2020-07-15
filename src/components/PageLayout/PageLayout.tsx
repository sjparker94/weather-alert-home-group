import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Meta from '../Meta/Meta';
import theme from '../../styles/theme';
import GlobalStyle from '../../styles/GlobalStyle';
import FavouritesSidebarStyles from '../FavouritesSidebar/FavouritesSidebarStyles';
import FavouritesSidebar from '../FavouritesSidebar/FavouritesSidebar';
import Header from '../Header/Header';

const StyledPage = styled.div`
    position: relative;
    min-height: 100vh;
    /* display: flex; */
    /* flex-direction: column; */
    /* > .main-app-content-wrapper {
        flex: 1 1 100%;
    } */
    .main-page-layout-wrapper {
        height: 100vh;
        display: flex;
        /* display: grid; */
        /* grid-template-columns: 1fr minmax(1fr, ${props =>
            props.theme.favouritesSidebarMaxWidth}); */
    }
    .main-page-content {
        flex: 1 1 100%;
        overflow-y: auto;
    }
    ${FavouritesSidebarStyles} {
        flex: 1 0 35%;
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
                {/* <Footer /> */}
            </StyledPage>
        </ThemeProvider>
    );
};

export default PageLayout;
