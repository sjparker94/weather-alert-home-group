import { em } from 'polished';
import theme from './theme';

// Set the sizes with em value
// em allows for mobile on zoom
const size = {
    mobileS: em('320px', theme.bodyFontSize),
    mobileM: em('375px', theme.bodyFontSize),
    mobileL: em('425px', theme.bodyFontSize),
    tablet: em('768px', theme.bodyFontSize),
    laptop: em('1024px', theme.bodyFontSize),
    laptopM: em('1200px', theme.bodyFontSize),
    laptopL: em('1440px', theme.bodyFontSize),
    desktop: em('2560px', theme.bodyFontSize),
};

// Set up the device media queries to use
// e.g. @media ${device.mobileSMax} { ...styles }
const device = {
    mobileSMax: `(max-width: ${size.mobileS})`,
    mobileSMin: `(min-width: ${size.mobileS})`,
    mobileMMax: `(max-width: ${size.mobileM})`,
    mobileMMin: `(min-width: ${size.mobileM})`,
    mobileLMax: `(max-width: ${size.mobileL})`,
    mobileLMin: `(min-width: ${size.mobileL})`,
    tabletMax: `(max-width: ${size.tablet})`,
    tabletMin: `(min-width: ${size.tablet})`,
    laptopMax: `(max-width: ${size.laptop})`,
    laptopMin: `(min-width: ${size.laptop})`,
    laptopMMax: `(max-width: ${size.laptopM})`,
    laptopMMin: `(min-width: ${size.laptopM})`,
    laptopLMax: `(max-width: ${size.laptopL})`,
    laptopLMin: `(min-width: ${size.laptopL})`,
    desktopMax: `(max-width: ${size.desktop})`,
    desktopMin: `(min-width: ${size.desktop})`,
};

export { device, size };
