import { convertToFahrenheit, mpsToKmh, mpsToMph } from './conversionUtils';
import WindSpeedTextValue from '../interfaces/WindSpeedTextValue';

/** calculate which temp value to show based on the settings state
 * @param temp temperature value in celsius
 */
export const getTempDisplayValue = (temp: number, isFahrenheit: boolean) =>
    Math.round(isFahrenheit ? convertToFahrenheit(temp) : temp);

/** calculate which temp value to show based on the settings state
 * @param speed speed value in mps
 */
export const getSpeedDisplayValue = (speed: number, isKm: boolean) =>
    Math.round(isKm ? mpsToKmh(speed) : mpsToMph(speed));

/** Calculate the string value of the wind speed
 * @param speed - speed in mph
 */
export const calculateWindSpeedTextValue = (speed: number): WindSpeedTextValue => {
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

export function toTextualWindDirection(degree: number) {
    const sectors = [
        'Northerly',
        'North Easterly',
        'Easterly',
        'South Easterly',
        'Southerly',
        'South Westerly',
        'Westerly',
        'North Westerly',
    ];

    degree += 22.5;

    if (degree < 0) {
        degree = 360 - (Math.abs(degree) % 360);
    } else {
        degree = degree % 360;
    }

    const which = Math.floor(degree / 45);
    return sectors[which];
}
