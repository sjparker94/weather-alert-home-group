import styled from 'styled-components';
import { lighten, darken } from 'polished';

import { ContentBlockStyles } from '../ContentBlock/ContentBlock';
import CircleButton from '../CircleButton/CircleButton';

const FavouritesLocationBlockStyles = styled(ContentBlockStyles)`
    background-color: ${props => lighten(0.05, props.theme.favouritesSidebarBg())};
    position: relative;
    transition: all 0.25s ${props => props.theme.smoothAnimation};
    &:hover {
        transform: translateY(-4px) translateZ(0);
        box-shadow: ${props => props.theme.hoverBs};
        background-color: ${props => lighten(0.1, props.theme.favouritesSidebarBg())};
    }
    &:active {
        background-color: ${props => darken(0.025, props.theme.favouritesSidebarBg())};
        transform: translateY(-4px) translateZ(0);
        box-shadow: ${props => props.theme.contentBs};
    }
    /** Floating button */
    ${CircleButton} {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 1;
        transform: translate(50%, -50%);
        color: ${props => props.theme.textColor} !important;
        &:hover {
            transform: translate(50%, -50%) scale(1.1) translateZ(0);
        }
        &:active {
            transform: translate(50%, -50%) scale(0.95) translateZ(0);
        }
    }

    > a {
        padding: ${props => props.theme.gutterPercentage(0.5)};
        display: flex;
    }
    .location-block-left {
        flex: 0 0 40px;
        margin-right: ${props => props.theme.gutterPercentage(0.25)};
    }
    .location-block-content {
        ${props => props.theme.lastItemMargin}
        flex: 1 1 100%;
    }
    .loading-message {
        color: ${props => props.theme.onDarkTextColorLight};
        /* ${props => props.theme.fontSize(12, 0)} */
    }
    .location-name {
        color: ${props => props.theme.onDarkTextColor};
        ${props => props.theme.headingFont('600')}
        ${props => props.theme.fontSize(18, 4)}
    }
    .weather-summary-item {
        color: ${props => props.theme.onDarkTextColor};
        ${props => props.theme.fontSize(24)}
        margin-bottom: 0;
        ${props => props.theme.font('400')}
        img {
            vertical-align: middle;
            margin-right: 2px;
            opacity: 0.5;
        }
        sup,
        small {
            color: ${props => props.theme.onDarkTextColorLight};
            font-size: 0.7em;
        }
        sup {
            vertical-align: super;
        }
        .temp-icon {
            margin: 0 0 0 8px;
        }
    }
`;

export default FavouritesLocationBlockStyles;
