import React from 'react';
import HomeContentWrapper from '../components/ContentBlock/ContentWrapper';
import SearchForm from '../components/SearchForm/SearchForm';
import ContentBlock from '../components/ContentBlock/ContentBlock';

const HomePage: React.FC = () => {
    return (
        <HomeContentWrapper>
            <h1 className="welcome-heading">Welcome!</h1>
            <p className="welcome-paragraph">
                Use the form below to search for a city and add it to your favourites
            </p>
            <ContentBlock>
                <SearchForm />
            </ContentBlock>
        </HomeContentWrapper>
    );
};

export default HomePage;
