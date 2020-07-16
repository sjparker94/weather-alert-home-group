import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import WindColorsMap from '../interfaces/WindColorsMap';

/** returns a map of color values to use to style the wind variations */
function useWindColors(): WindColorsMap {
    const theme = useContext(ThemeContext);

    const windColorValues: WindColorsMap = {
        light: theme.darkGreen,
        gentle: theme.green,
        moderate: theme.orange,
        strong: theme.red,
        storm: theme.darkRed,
    };

    return windColorValues;
}

export default useWindColors;
