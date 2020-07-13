import React from 'react';
import Button from '../Button/Button';
import MainSearchInputStyles from './MainSearchInputStyles';

interface Props {
    /** defaults to text */
    type?: string;
    name: string;
    value: string;
    label: string;
    placeholder: string;
    description?: string;
    forwardedRef: React.RefObject<HTMLInputElement>;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const MainSearchInput: React.FC<Props> = ({
    type,
    handleChange,
    value,
    name,
    label,
    placeholder,
    description,
    forwardedRef,
}) => {
    return (
        <MainSearchInputStyles>
            <label htmlFor={name}>{label}</label>
            <input
                type={type || 'text'}
                id={name}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={handleChange}
                aria-label={label}
                data-testid="location-search-input"
                ref={forwardedRef}
            />
            {description && <p className="input-description">{description}</p>}
        </MainSearchInputStyles>
    );
};

export default MainSearchInput;
