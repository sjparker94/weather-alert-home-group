import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../components/Button/Button';
import PageTitleSection from '../components/PageTitleSection/PageTitleSection';

const ErrorPageStyles = styled(PageTitleSection)`
    padding: ${props => props.theme.gutterPercentage(2)};
    height: 100vh;
    display: flex;
    align-items: center;
    .content-wrapper {
        max-width: 500px;
        flex: 1 1 100%;
        margin: 0 auto;
        ${props => props.theme.lastItemMargin}
    }
`;
const ErrorPage: React.FC = () => {
    return (
        <ErrorPageStyles>
            <div className="content-wrapper">
                <h1>404</h1>
                <h3>Oops something went wrong</h3>
                <Button as={Link} to="/" colorTheme="white">
                    Go back home
                </Button>
            </div>
        </ErrorPageStyles>
    );
};

export default ErrorPage;
