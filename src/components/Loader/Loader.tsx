import React from 'react';
import styled, { css, keyframes } from 'styled-components';

interface Props {
    /** Pixel value - defaults to 40px */
    size?: number;
    /** css color value defaults to theme primary color*/
    color?: string;
}

const loaderRotate = keyframes`
    100% {
        transform: rotate(360deg);
    }
`;
const loaderBounce = keyframes`
    0%, 100% {
        transform: scale(0.0);
    }
    50% {
        transform: scale(1.0);
    }
`;
const LoaderStyles = styled.div<Props>`
    position: relative;
    text-align: center;
    animation: ${loaderRotate} 2s infinite linear;
    ${props => {
        const size = props.size ? `${props.size}px` : '40px';
        return css`
            width: ${size};
            height: ${size};
        `;
    }};
    .dot1,
    .dot2 {
        width: 60%;
        height: 60%;
        display: inline-block;
        position: absolute;
        top: 0;
        background-color: ${props => props.theme.primaryColor};
        background-color: ${props => (props.color ? props.color : props.theme.primaryColor)};
        border-radius: 100%;
        animation: ${loaderBounce} 2s infinite ease-in-out;
    }
    .dot2 {
        top: auto;
        bottom: 0;
        animation-delay: -1s;
    }
`;

const Loader: React.FC<Props> = ({ color, size }) => (
    <LoaderStyles aria-busy="true" color={color} size={size}>
        <div className="dot1" />
        <div className="dot2" />
    </LoaderStyles>
);

export default Loader;
