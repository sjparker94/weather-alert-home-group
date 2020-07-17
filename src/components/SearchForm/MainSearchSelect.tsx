import React from 'react';

import MainSearchInputStyles from './MainSearchInputStyles';
import { countries } from '../../utils/data';
import SearchFormValues from '../../interfaces/SearchFormValues';

interface Props {
    name: keyof SearchFormValues;
    label: string;
    handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string;
    description?: string;
    clearItem: (field: keyof SearchFormValues) => void;
}

const MainSearchSelect: React.FC<Props> = ({
    label,
    handleChange,
    name,
    value,
    description,
    clearItem,
}) => {
    return (
        <MainSearchInputStyles>
            <div className="label-with-button-wrapper">
                <label htmlFor={name}>{label} </label>
                <button onClick={() => clearItem(name)}>
                    <span className="material-icons">close</span>Clear
                </button>
            </div>
            <div className="input-with-clear-wrapper">
                <select name={name} id={name} onChange={handleChange} value={value}>
                    <option value="">Any</option>
                    {countries.map(country => (
                        <option value={country.code}>{country.name}</option>
                    ))}
                </select>
            </div>
            {description && <p className="input-description">{description} </p>}
        </MainSearchInputStyles>
    );
};

export default MainSearchSelect;
