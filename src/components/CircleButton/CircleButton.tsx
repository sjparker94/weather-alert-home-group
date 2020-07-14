import styled, { css } from 'styled-components';
import { transparentize, lighten } from 'polished';
import { motion } from 'framer-motion';

interface Props {
    deleteButton?: boolean;
    size?: string;
}

const CircleButton = styled(motion.button)<Props>`
    cursor: pointer;
    width: ${props => props.size || '40px'};
    height: ${props => props.size || '40px'};
    border-radius: 50%;
    box-shadow: ${props => props.theme.contentBs};
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.textColor};
    transition: 0.2s transform ${props => props.theme.bounceAnimation};
    backface-visibility: hidden;
    .material-icons {
        backface-visibility: hidden;
        ${props => props.theme.fontSize(18)}
    }
    &:hover {
        transform: scale(1.1) translateZ(0);
        background-color: ${props =>
            props.deleteButton ? lighten(0.5, props.theme.red) : props.theme.lightestGrey};
        ${props =>
            props.deleteButton &&
            css`
                color: ${props.theme.red};
                border-color: ${props.theme.red};
            `}
    }
    &:active {
        transform: scale(0.97) translateZ(0);
    }
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

export default CircleButton;
