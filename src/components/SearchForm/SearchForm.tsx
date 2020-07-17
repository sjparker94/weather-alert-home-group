import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import Button from '../Button/Button';
import MainSearchInput from './MainSearchInput';
import { searchLocation } from '../../actions/locationsActions';
import ErrorAlertBox from '../ErrorAlertBox/ErrorAlertBox';
import SearchLocationState from '../../interfaces/SearchLocationState';
import useShallowEqualSelector from '../../hooks/useShallowEqualSelector';
import MainSearchSelect from './MainSearchSelect';
import { device } from '../../styles/breakpoint';
import SearchFormValues from '../../interfaces/SearchFormValues';

const SearchFormStyles = styled.form`
    ${props => props.theme.lastItemMargin}
    margin-bottom: ${props => props.theme.gutter};
    .inputs-wrapper {
        @media ${device.laptopMMin} {
            display: flex;
            > * {
                &:first-child {
                    flex: 1 1 70%;
                    margin-right: ${props => props.theme.gutter};
                }
            }
        }
    }

`;

interface Props {
    inputs: {
        city: string;
        countryCode: string;
    };
    clearItem: (field: keyof SearchFormValues) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}
const SearchForm: React.FC<Props> = ({ inputs, handleChange, clearItem }) => {
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement>(null);

    const { isPending, error, data } = useShallowEqualSelector<SearchLocationState>(
        state => state.locations.searchLocation
    );

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputs.city.length) {
            dispatch(searchLocation(inputs.city, inputs.countryCode));
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
                <MainSearchSelect
                    name="countryCode"
                    label="Country"
                    handleChange={handleChange}
                    value={inputs.countryCode}
                    clearItem={clearItem}
                    description="Filter the results to a specific country"
                />
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
