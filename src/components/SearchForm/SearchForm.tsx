import React from 'react';
import SearchFormWrapper from './SearchFormWrapper';
import Button from '../Button/Button';
import { useDispatch } from 'react-redux';
import MainSearchInput from './MainSearchInput';
import useForm from '../../hooks/useForm';
import styled from 'styled-components';

const SearchFormStyles = styled.form`
    ${props => props.theme.lastItemMargin}
`;

const SearchForm: React.FC = () => {
    const dispatch = useDispatch();
    const { inputs, handleChange } = useForm({
        city: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <SearchFormStyles onSubmit={handleSubmit}>
            <MainSearchInput
                type="text"
                name="city"
                label="Enter the name of a city"
                handleChange={handleChange}
                placeholder="Newcastle Upon Tyne"
                value={inputs.city}
                description="E.g. Newcastle Upon Tyne or New York"
            />
            <Button fullWidth colorTheme="primary" disabled={inputs.city.length < 0}>
                Search
            </Button>
        </SearchFormStyles>
    );
};

export default SearchForm;
