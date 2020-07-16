import styled from 'styled-components';
import { lighten, darken } from 'polished';
import { motion } from 'framer-motion';

import CircleButton from '../CircleButton/CircleButton';
import { device } from '../../styles/breakpoint';

const FavouritesLocationBlockStyles = styled(motion.div)`
    position: relative;
    margin: 0;
    @media ${device.laptopMMax} {
        margin-bottom: ${props => props.theme.gutterTablet};
    }
    > a {
        transition: all 0.25s ${props => props.theme.smoothAnimation};
        background-color: ${props => lighten(0.05, props.theme.favouritesSidebarBg())};
        border-radius: ${props => props.theme.mainBorderRadius};
        ${props => props.theme.lastItemMargin}
        box-shadow: ${props => props.theme.bs};

        &:hover,
        &:focus {
            transform: translateY(-4px) translateZ(0);
            background-color: ${props => lighten(0.1, props.theme.favouritesSidebarBg())};
        }
        &:hover {
            box-shadow: ${props => props.theme.hoverBs};
        }
        &:focus {
            box-shadow: ${props => props.theme.hoverBs}, inset 4px 0 0 ${props =>
    props.theme.primaryColor};

        }
        &:active {
            background-color: ${props => lighten(0.05, props.theme.favouritesSidebarBg())};
            transform: translateY(0px) translateZ(0);
            box-shadow: ${props => props.theme.contentBs};
        }
        &.selected {
            box-shadow: ${props => props.theme.bs}, inset 4px 0 0 ${props =>
    props.theme.primaryColor};
        }
    }
    /** Floating button */
    &:hover {
        ${CircleButton} {
            transition: all 0.25s ${props => props.theme.smoothAnimation};
            transform: translate(50%, calc(-50% - 2px)) translateZ(0);
            @media ${device.laptopMMax} {
                transform: translate(30%, calc(-30% - 2px)) translateZ(0);
            }
        }
    }
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
        @media ${device.laptopMMax} {
            transform: translate(30%, -30%);
            &:hover {
                transform: translate(30%, -30%) scale(1.1) translateZ(0);
            }
            &:active {
                transform: translate(30%, -30%) scale(0.95) translateZ(0);
            }
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
        ${props => props.theme.fontSize(18, 2)}
    }
    .weather-summary-item {
        color: ${props => props.theme.onDarkTextColor};
        ${props => props.theme.fontSize(24)}
        margin-bottom: 0;
        ${props => props.theme.font('400')}
        img,svg {
            vertical-align: middle;
            margin: 0 2px;
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
