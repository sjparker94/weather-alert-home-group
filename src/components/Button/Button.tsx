import styled, { css } from 'styled-components';
import { readableColor, transparentize } from 'polished';

// export type ButtonSizeOptions = 'small' | 'default' | 'large' | 'xLarge';

interface Props {
    fullWidth?: boolean;
    colorTheme?: string;
    // size?: ButtonSizeOptions;
    // flat?: boolean;
}

const buttonHoverBs = `0 0.3px 1px rgba(0, 0, 0, 0.034), 0 1.1px 3.4px rgba(0, 0, 0, 0.049), 0 5px 15px rgba(0, 0, 0, 0.08)`;
const Button = styled.button<Props>`
    position: relative;
    text-align: center;
    display: inline-block;
    line-height: 1.1;
    cursor: pointer;
    outline: none;
    background: none;
    margin-bottom: ${props => props.theme.gutter};
    /* border: 1px solid ${props => props.theme.mainBorderColor()}; */
    border-radius: ${props => props.theme.smallBorderRadius};
    transition: all .15s ${props => props.theme.smoothAnimation};
    /* font-family: ${props => props.theme.headingFontFamilyString} !important; */
    /* font-weight: 700 !important; */
    letter-spacing: -0.5px;
    border: none;
    box-shadow: ${buttonHoverBs};
    ${props => props.theme.font('600')};
    ${props => props.theme.fontSize(18)};
    padding: ${props => props.theme.gutterHalf()};
    ${({ theme, colorTheme }) => {
        if (colorTheme) {
            if (theme[`${colorTheme}Color`] || theme[colorTheme]) {
                const colorToUse = theme[`${colorTheme}Color`] || theme[colorTheme];
                return css`
                    background-color: ${colorToUse};
                    color: ${readableColor(colorToUse, theme.black, '#fff')};
                `;
            }
            return css`
                background-color: #fff;
            `;
        }
    }}
    &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        border-radius: ${props => props.theme.smallBorderRadius};
        background-color: #FFF;
        opacity: 0;
        transition: all .15s ${props => props.theme.smoothAnimation};
    }
    &:hover {
        transform: translateY(-1px);
        &:before {
            opacity: 0.1;
        }
    }
    &:focus {
        transform: translateY(-1px);
        box-shadow: ${buttonHoverBs}, 0 0 0 2px ${props => props.theme.highlightColor};
    }
    &:active {
        transform: translateY(0px);
        box-shadow: inset 0 0 5px 0 ${props => transparentize(0.6, props.theme.blueGrey)};
        box-shadow: inset 1px 1px 2px 0 ${transparentize(0.9, '#000')};
    }
    i {
        vertical-align: middle;
        font-size: 1.25em;
    }
    ${props =>
        props.fullWidth &&
        css`
            display: block;
            width: 100%;
        `}
    &:disabled {
        background-color: ${props => props.theme.midBlueGrey};
        border-color: ${props => props.theme.mainBorderColor()};
        color: ${props => transparentize(0.4, props.theme.textColor)};
        cursor: not-allowed;
        box-shadow: none;
        &:hover {
            transform: none;
        }
    }
`;

export default Button;
