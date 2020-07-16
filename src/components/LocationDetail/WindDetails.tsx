import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import WindSpeedTextValue from '../../interfaces/WindSpeedTextValue';
import { capitalizeFirstLetter } from '../../utils/stringUtils';
import LocationWind from '../../interfaces/LocationWind';
import useWindColors from '../../hooks/useWindColors';
import WindDetailsStyles from './WindDetailsStyles';
import { toTextualWindDirection, getSpeedDisplayValue } from '../../utils/displayUtils';
import useShallowEqualSelector from '../../hooks/useShallowEqualSelector';
import SettingsState from '../../interfaces/SettingsState';

interface Props {
    /** String value to describe the wind */
    windSpeedText: WindSpeedTextValue;
    /** The raw values returned from openweathermap */
    windApiValues: LocationWind;
}

const WindDetails: React.FC<Props> = ({ windApiValues, windSpeedText }) => {
    const { blueGrey } = useContext(ThemeContext);
    const { isKm } = useShallowEqualSelector<SettingsState>(state => state.settings);

    const windSpeedDisplay = getSpeedDisplayValue(windApiValues.speed, isKm);
    const windColorValues = useWindColors();

    return (
        <WindDetailsStyles
            windSpeedText={windSpeedText}
            windColorValues={windColorValues}
            windDeg={windApiValues.deg}
        >
            <div className="wind-details-speeds">
                <div className="value-wrapper">
                    <h2 data-testid="main-wind-speed-title">{windSpeedDisplay}</h2>
                    <span className="units" data-testid="speed-units">
                        {isKm ? 'km/h' : 'mph'}
                    </span>
                </div>
                <div className="direction-wrapper">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="wind-direction-icon"
                        fill={blueGrey}
                        data-testid="wind-direction-icon"
                    >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
                    </svg>
                </div>
            </div>
            <div className="wind-details-content">
                <h3 data-testid="wind-speed-text-value">{capitalizeFirstLetter(windSpeedText)}</h3>
                <p data-testid="wind-direction-text-value">
                    {toTextualWindDirection(windApiValues.deg)}
                </p>
            </div>
            <div className="upcoming-wind-details">
                <h4>Next 24 Hours</h4>
                <ul>
                    <li className="wind-item-hourly">
                        <span className="time">20:00</span>
                        <span className="direction">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="wind-direction-icon"
                                width="20"
                                height="20"
                                fill={blueGrey}
                            >
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
                            </svg>
                        </span>
                        <span className="speed">15</span>
                    </li>
                </ul>
            </div>
        </WindDetailsStyles>
    );
};

export default WindDetails;
