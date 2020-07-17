import React from 'react';

import HomeContentWrapper from '../components/ContentBlock/ContentWrapper';
import SearchForm from '../components/SearchForm/SearchForm';
import ContentBlock from '../components/ContentBlock/ContentBlock';
import ConfirmLocationBlock from '../components/ConfirmLocationBlock/ConfirmLocationBlock';
import PageTitleSection from '../components/PageTitleSection/PageTitleSection';
import useForm from '../hooks/useForm';
import useShallowEqualSelector from '../hooks/useShallowEqualSelector';
import Location from '../interfaces/Location';

const HomePage: React.FC = () => {
    const { inputs, handleChange, resetForm } = useForm({
        city: '',
    });
    const locations = useShallowEqualSelector<Location[]>(state => state.locations.data);
    return (
        <>
            <PageTitleSection>
                <h1 className="welcome-heading">Welcome!</h1>
                <h3 className="welcome-paragraph">
                    Use the form below to search for a city and add it to your favourites
                </h3>
            </PageTitleSection>
            <HomeContentWrapper>
                {locations.length >= 20 ? (
                    <ContentBlock alert>
                        <h3>Maximum Locations Added</h3>
                        <p>
                            You have added the maximum of 20 locations. To change your favourites
                            please remove an existing location and the search will appear.
                        </p>
                    </ContentBlock>
                ) : (
                    <ContentBlock title="Location Search">
                        <SearchForm inputs={inputs} handleChange={handleChange} />
                        <ConfirmLocationBlock resetForm={resetForm} />
                    </ContentBlock>
                )}
            </HomeContentWrapper>
        </>
    );
};

export default HomePage;
