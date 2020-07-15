import React from 'react';
import HomeContentWrapper from '../components/ContentBlock/ContentWrapper';
import SearchForm from '../components/SearchForm/SearchForm';
import ContentBlock from '../components/ContentBlock/ContentBlock';
import ConfirmLocationBlock from '../components/ConfirmLocationBlock/ConfirmLocationBlock';
import PageTitleSection from '../components/PageTitleSection/PageTitleSection';

const HomePage: React.FC = () => {
    return (
        <>
            <PageTitleSection>
                <h1 className="welcome-heading">Welcome!</h1>
                <h3 className="welcome-paragraph">
                    Use the form below to search for a city and add it to your favourites
                </h3>
            </PageTitleSection>
            <HomeContentWrapper>
                <ContentBlock title="Location Search">
                    <SearchForm />
                    <ConfirmLocationBlock />
                </ContentBlock>
            </HomeContentWrapper>
        </>
    );
};

export default HomePage;
