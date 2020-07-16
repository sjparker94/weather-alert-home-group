import React from 'react';
import ToggleSwitchStyles from './ToggleSwitchStyles';
import HiddenCheckbox from '../Form/HiddenCheckbox';

// type ToggleSizes = 'small' | 'large';
interface Props {
    name: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    checked: boolean;
    size?: number;
    label?: string;
    unCheckedString?: string;
    checkedString?: string;
}

const ToggleSwitch: React.FC<Props> = ({
    name,
    handleChange,
    size,
    checked,
    label,
    checkedString,
    unCheckedString,
}) => {
    return (
        <ToggleSwitchStyles checked={checked} size={size}>
            <label htmlFor={name}>
                <HiddenCheckbox
                    name={name}
                    id={name}
                    checked={checked}
                    onChange={handleChange}
                    aria-label={label || name}
                />
                <div className="toggle-wrapper">
                    {label && (
                        <div className="toggle-description">
                            <p>{label}</p>
                        </div>
                    )}
                    <div className="toggle-slide-element">
                        <div className="toggle-circle">
                            {(checkedString || unCheckedString) && (
                                <span>{checked ? checkedString : unCheckedString}</span>
                            )}
                        </div>
                    </div>
                </div>
            </label>
        </ToggleSwitchStyles>
    );
};

export default ToggleSwitch;
