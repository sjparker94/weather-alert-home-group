import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import Button from '../Button/Button';
import MainSearchInput from './MainSearchInput';
import { searchLocation } from '../../actions/locationsActions';
import ErrorAlertBox from '../ErrorAlertBox/ErrorAlertBox';
import SearchLocationState from '../../interfaces/SearchLocationState';
import useShallowEqualSelector from '../../hooks/useShallowEqualSelector';

const SearchFormStyles = styled.form`
    ${props => props.theme.lastItemMargin}
    margin-bottom: ${props => props.theme.gutter};
`;

interface Props {
    inputs: {
        city: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const SearchForm: React.FC<Props> = ({ inputs, handleChange }) => {
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement>(null);

    const { isPending, error, data } = useShallowEqualSelector<SearchLocationState>(
        state => state.locations.searchLocation
    );

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputs.city.length) {
            dispatch(searchLocation(inputs.city));
        }
    };

    useEffect(() => {
        // Focus in on the search input when there is no data
        // This means the user has either hit cancel/confirm or is yet to search
        if (inputRef.current && !data) {
            inputRef.current.focus();
        }
    }, [data, inputRef]);

    const isFormLoading = !inputs.city.length || isPending;
    return (
        <SearchFormStyles onSubmit={handleSubmit}>
            <div className="inputs-wrapper">
                <MainSearchInput
                    type="text"
                    name="city"
                    label="Enter the name of a city"
                    handleChange={handleChange}
                    placeholder="Newcastle upon Tyne"
                    value={inputs.city}
                    description="E.g. Newcastle Upon Tyne or New York"
                    forwardedRef={inputRef}
                />
                {/* <MainSearchSelect /> */}
            </div>
            {error && <ErrorAlertBox error={error} size="form" testId="search-error" />}
            <Button
                fullWidth
                colorTheme="primary"
                disabled={isFormLoading}
                data-testid="main-search-button"
            >
                <span className="material-icons">search</span>
                {isPending ? 'Searching...' : 'Search'}
            </Button>
        </SearchFormStyles>
    );
};

export default SearchForm;
