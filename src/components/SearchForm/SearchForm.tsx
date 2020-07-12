import React from 'react';
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
    const { isPending, error } = useSelector<AppState, SearchLocationState>(
        state => state.locations.searchLocation
    );
    const { inputs, handleChange } = useForm({
        city: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputs.city.length) {
            dispatch(searchLocation(inputs.city));
        }
    };
    const isFormLoading = !inputs.city.length || isPending;
    return (
        <SearchFormStyles onSubmit={handleSubmit}>
            <div className="inputs-wrapper">
                <MainSearchInput
                    type="text"
                    name="city"
                    label="Enter the name of a city"
                    handleChange={handleChange}
                    placeholder="Newcastle Upon Tyne"
                    value={inputs.city}
                    description="E.g. Newcastle Upon Tyne or New York"
                />
                {/* <MainSearchSelect /> */}
            </div>
            {error && <ErrorAlertBox error={error} size="form" />}
            <Button fullWidth colorTheme="primary" disabled={isFormLoading}>
                {isPending ? 'Searching...' : 'Search'}
            </Button>
        </SearchFormStyles>
    );
};

export default SearchForm;
