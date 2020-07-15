import React, { useContext } from 'react';
import Location from '../../interfaces/Location';
import LocationDetailSummaryStyles from './LocationDetailSummaryStyles';
import ContentBlockHeader from '../ContentBlock/ContentBlockHeader';
import WindSpeedTextValue from '../../interfaces/WindSpeedTextValue';
import { mpsToMph } from '../../utils/conversionUtils';
import WindDetails from './WindDetails';
import { ThemeContext } from 'styled-components';

interface Props {
    locationData: Location;
}

/** Calculate the string value of the wind speed
 * @param speed - speed in mph
 */
const calculateWindSpeedTextValue = (speed: number): WindSpeedTextValue => {
    if (speed < 5) {
        return 'light';
    }
    if (speed < 12) {
        return 'gentle';
    }
    if (speed < 25) {
        return 'moderate';
    }
    if (speed < 50) {
        return 'strong';
    }
    return 'storm';
};

const LocationDetailSummary: React.FC<Props> = ({ locationData }) => {
    const { wind } = locationData;
    const windSpeedValueConverted = Math.round(mpsToMph(wind.speed));
    const windSpeedText = calculateWindSpeedTextValue(mpsToMph(wind.speed));
    const theme = useContext(ThemeContext);
    const isInKm = false;
    return (
        <LocationDetailSummaryStyles windSpeed={windSpeedText}>
            <ContentBlockHeader withIcon>
                <div className="icon-wrapper">
                    <svg
                        height="34px"
                        version="1.1"
                        viewBox="0 0 32 32"
                        width="34px"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                        <g fill="none" fill-rule="evenodd" stroke="none" stroke-width="1">
                            <g fill={theme.blueGrey} id="icon-43-wind">
                                <path
                                    d="M30,14 C30,11.790861 28.2046438,10 26,10 C23.790861,10 22,11.7894101 22,14 L23,14 C23,12.3431458 24.3465171,11 26,11 C27.6568542,11 29,12.3465171 29,14 C29,15.6568542 27.6568766,17 25.9920699,17 L3,17 L3,18 L26.0015293,18 C28.2098237,18 30,16.2046438 30,14 L30,14 Z M21,13 C21,11.3431458 19.6534829,10 18,10 C16.3431458,10 15,11.3420576 15,12.991394 L15,13 L16,13 C16,11.8954305 16.8877296,11 18,11 C19.1045695,11 20,11.8877296 20,13 C20,14.1045695 19.1029399,15 17.9941413,15 L6,15 L6,16 L18.0005775,16 C19.6571128,16 21,14.6534829 21,13 L21,13 Z M25,21 C25,22.1045695 24.1122704,23 23,23 L23,23 C21.8954305,23 21,22.1052949 21,21.0057373 L21,21 L22,21 C22,21.5522847 22.4438648,22 23,22 L23,22 C23.5522847,22 24,21.5561352 24,21 L24,21 C24,20.4477153 23.5510798,20 22.992516,20 L9,20 L9,19 L23.0059397,19 C24.1072288,19 25,19.8877296 25,21 L25,21 L25,21 Z"
                                    id="wind"
                                />
                            </g>
                        </g>
                    </svg>
                </div>
                <h4>Wind Conditions</h4>
            </ContentBlockHeader>
            <WindDetails
                windApiValues={wind}
                windSpeedValueConverted={windSpeedValueConverted}
                windSpeedText={windSpeedText}
                isInKm={isInKm}
            />
        </LocationDetailSummaryStyles>
    );
};

export default LocationDetailSummary;
