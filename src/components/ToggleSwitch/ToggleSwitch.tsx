import React from 'react';
import ToggleSwitchStyles from './ToggleSwitchStyles';
import HiddenCheckbox from '../Form/HiddenCheckbox';

// type ToggleSizes = 'small' | 'large';
interface Props {
    name: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    checked: boolean;
    size?: number;
}

const ToggleSwitch: React.FC<Props> = ({ name, handleChange, size, checked }) => {
    return (
        <ToggleSwitchStyles checked={checked} size={size}>
            <label htmlFor={name}>
                <HiddenCheckbox name={name} id={name} checked={checked} onChange={handleChange} />
                <div className="toggle-wrapper">
                    <div className="toggle-description">
                        <p>Toggle display</p>
                    </div>
                    <div className="toggle-slide-element">
                        <div className="toggle-circle">
                            <span>{checked ? 'F' : 'C'}</span>
                        </div>
                    </div>
                </div>
            </label>
        </ToggleSwitchStyles>
    );
};

export default ToggleSwitch;
