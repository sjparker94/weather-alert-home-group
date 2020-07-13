import React, { useEffect, useRef } from 'react';
import SearchFormWrapper from './SearchFormWrapper';
import Button from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import MainSearchInput from './MainSearchInput';
import useForm from '../../hooks/useForm';
import styled from 'styled-components';
import { searchLocation } from '../../actions/locationsActions';
import ErrorAlertBox from '../ErrorAlertBox/ErrorAlertBox';
import AppState from '../../interfaces/AppState';
import SearchLocationState from '../../interfaces/SearchLocationState';

const SearchFormStyles = styled.form`
    ${props => props.theme.lastItemMargin}
    margin-bottom: ${props => props.theme.gutter};
`;

const SearchForm: React.FC = () => {
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement>(null);

    const { isPending, error, success, data } = useSelector<AppState, SearchLocationState>(
        state => state.locations.searchLocation
    );
    const { inputs, handleChange, resetForm } = useForm({
        city: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputs.city.length) {
            dispatch(searchLocation(inputs.city));
        }
    };

    useEffect(() => {
        // After a successful search clear the form
        if (success) {
            resetForm();
        }
    }, [success]);

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
