import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { format } from 'date-fns';

import WindSpeedTextValue from '../../interfaces/WindSpeedTextValue';
import { capitalizeFirstLetter } from '../../utils/stringUtils';
import LocationWind from '../../interfaces/LocationWind';
import useWindColors from '../../hooks/useWindColors';
import WindDetailsStyles from './WindDetailsStyles';
import {
    toTextualWindDirection,
    getSpeedDisplayValue,
    calculateWindSpeedTextValue,
} from '../../utils/displayUtils';
import useShallowEqualSelector from '../../hooks/useShallowEqualSelector';
import SettingsState from '../../interfaces/SettingsState';
import GetLocationForecastState from '../../interfaces/GetLocationForecastState';
import Loader from '../Loader/Loader';
import Forecast from '../../interfaces/Forecast';
import { mpsToMph } from '../../utils/conversionUtils';

interface Props {
    /** String value to describe the wind */
    windSpeedText: WindSpeedTextValue;
    /** The raw values returned from openweathermap */
    windApiValues: LocationWind;
    forecast?: Forecast[];
}

const WindDetails: React.FC<Props> = ({ windApiValues, windSpeedText, forecast }) => {
    const { blueGrey } = useContext(ThemeContext);
    const { isKm } = useShallowEqualSelector<SettingsState>(state => state.settings);
    const { error, isPending } = useShallowEqualSelector<GetLocationForecastState>(
        state => state.locations.getForecast
    );

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
                {error && <p>{error}</p>}
                {forecast && forecast.length > 0 && (
                    <ul>
                        {forecast.map(item => (
                            <li className="wind-item-hourly">
                                <span className="time">
                                    {format(new Date(item.dt_txt), 'HH:mm')}
                                </span>
                                <span className="direction">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        className="wind-direction-icon"
                                        width="20"
                                        height="20"
                                        fill={blueGrey}
                                        style={{
                                            transform: `rotate(${item.wind.deg - 180}deg)`,
                                        }}
                                    >
                                        <path d="M0 0h24v24H0z" fill="none" />
                                        <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
                                    </svg>
                                </span>
                                <span
                                    className="speed"
                                    data-testid="speed-data-item"
                                    style={{
                                        color:
                                            windColorValues[
                                                calculateWindSpeedTextValue(
                                                    mpsToMph(item.wind.speed)
                                                )
                                            ],
                                    }}
                                >
                                    {getSpeedDisplayValue(item.wind.speed, isKm)}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </WindDetailsStyles>
    );
};

export default WindDetails;
