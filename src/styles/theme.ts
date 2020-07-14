import { math, stripUnit, rem, transparentize } from 'polished';
import { css, DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
    yellow: '#ffcc00',
    green: '#2ECC40',
    red: '#E31B3A',
    orange: '#ffc04e',
    blue: '#1087EA',
    teal: '#44B2A0',
    purple: '#5851BF',
    black: '#111111',
    grey: '#3A3A3A',
    primaryColor: '#ffcc00',
    secondaryColor: '#0D5CC3',
    highlightColor: '#7D5BA6',
    lightMidGrey: '#d2d2d2',
    lightGrey: '#E1E1E1',
    lightestGrey: '#f3f3f3',
    lightestGreyLight: '#f7f7f7',
    lightDarkBlueGrey: '#295166',
    darkBlueGrey: '#0c344b',
    darkestBlueGrey: '#082333',
    lightBlueGrey: '#f0f4f6',
    lightestBlueGrey: '#F7F9FA',
    lightMidBlueGrey: '#dee3e8',
    midBlueGrey: '#cfd7df',
    blueGrey: '#99abc2',
    offWhite: '#fdfdfd',
    maxWidth: '1200px',
    singleColWidth: '800px',
    favouritesSidebarMaxWidth: '600px',
    bs: '0 4px 24px 0 rgba(0, 0, 0, 0.09)',
    smallBs: '1px 3px 12px 0 rgba(0,0,0,0.05)',
    ts: `3px 1px 0 ${transparentize(0.9, '#000')}`,
    // contentBs: `0 3.9px 2.4px -6px rgba(0, 0, 0, 0.032), 0 10.2px 8px -6px rgba(0, 0, 0, 0.047), 0 28px 36px -6px rgba(0, 0, 0, 0.08)`,
    contentBs: `rgba(8, 35, 51, 0.03) 0px 0px 2px, rgba(8, 35, 51, 0.05) 0px 3px 6px`,
    hoverBs: `0 3.2px 2.4px rgba(0, 0, 0, 0.014), 0 7.6px 5.7px rgba(0, 0, 0, 0.02),
    0 14.4px 10.8px rgba(0, 0, 0, 0.025), 0 25.7px 19.2px rgba(0, 0, 0, 0.03),
    0 48px 35.9px rgba(0, 0, 0, 0.036), 0 115px 86px rgba(0, 0, 0, 0.05)`,
    textColor: '#0c344b',
    lightTextColor: '#717171',
    onDarkTextColor: '#eff3f5',
    onDarkTextColorLight: '#8fa6b2',
    pageBg(this: DefaultTheme) {
        // return '#fff';
        return this.lightBlueGrey;
    },
    favouritesSidebarBg(this: DefaultTheme) {
        return this.darkestBlueGrey;
    },
    bodyFontSize: 16,
    gutter: '2rem',
    gutterHalf(this: DefaultTheme) {
        return math(`${this.gutter} / 2`);
    },
    /** Percentage of the gutter rem value to keep base gutter consistent*/
    gutterPercentage(this: DefaultTheme, timesValue: number = 2) {
        return math(`${this.gutter} * ${timesValue}`);
    },
    gutterTablet: '1rem',
    gutterMobile: '1rem',
    /** Pass em or rem value in returns equivalant pixel value based on the base size */
    gutterValue(this: DefaultTheme, unitValue) {
        let value = stripUnit(this.gutter);
        // Check for string and that it doesnt return itself which would mean no value could extracted
        if (typeof unitValue === 'string' && unitValue !== stripUnit(unitValue)) {
            value = stripUnit(unitValue);
        }
        return parseInt(value, 10) * this.bodyFontSize;
    },
    googleFont: 'Montserrat',
    mainBorderRadius: '5px',
    smallBorderRadius: '3px',
    mainBorderColor() {
        // return this.lightGrey;
        return this.lightMidBlueGrey;
    },
    lightBorderColor(this: DefaultTheme) {
        // return this.lightestGrey;
        return this.lightBlueGrey;
    },
    formBorderColor() {
        return this.midBlueGrey;
    },
    formBorderFocusColor() {
        return this.primaryColor;
    },
    fontFamilyString: "'Open Sans', sans-serif",
    headingFontFamilyString: "'Montserrat', sans-serif",
    fontWeights: ['400', '400i', '600', '700', '700i'],
    headingFontWeights: ['400', '600', '700', '900'],
    headerHeight: '76px',
    smoothAnimation: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
    bounceAnimation: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    slowToQuickAnimation: 'cubic-bezier(1, 0.16, 0.52, 0.94)',
    lastItemMargin: css`
        > * {
            &:last-child {
                margin-bottom: 0;
            }
        }
    `,
    fontSize(size: number, margin?: number | string) {
        let marginStyles;
        const useMargin = typeof margin !== 'undefined';

        if (margin && typeof margin === 'number') {
            const marginValue = rem(margin, this.bodyFontSize);
            marginStyles = css`
                margin-bottom: ${marginValue};
            `;
        }
        if (margin && typeof margin === 'string') {
            marginStyles = css`
                margin-bottom: ${margin};
            `;
        }
        return css`
            font-size: ${rem(size, this.bodyFontSize)};
            ${useMargin && marginStyles};
        `;
    },
    font(style: string = '400') {
        // Check if the font weight exists in our imports
        const hasFontWeight = this.fontWeights.includes(style);
        return css`
            font-family: ${this.fontFamilyString};
            font-weight: ${hasFontWeight ? style : `400`};
        `;
    },
    headingFont(style: string = '700') {
        const hasFontWeight = this.headingFontWeights.includes(style);
        return css`
            font-family: ${this.headingFontFamilyString};
            font-weight: ${hasFontWeight ? style : `700`};
        `;
    },
};

export default theme;
