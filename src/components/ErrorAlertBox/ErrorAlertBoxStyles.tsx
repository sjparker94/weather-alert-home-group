import styled, { css } from 'styled-components';
import { Sizes } from './ErrorAlertBox';
import { motion } from 'framer-motion';

interface Props {
    size?: Sizes;
    marginBottom?: string;
}

interface Gutter {
    vertical: string;
    horizontal: string;
}

const ErrorAlertBoxStyles = styled(motion.div)<Props>`
    background-color: #fff;
    max-width: 800px;
    border-left: 4px solid ${props => props.theme.red};
    margin: 0 auto ${props => props.marginBottom || props.theme.gutter};
    box-shadow: ${props => props.theme.contentBs};
    ${props => props.theme.lastItemMargin}
    ${props => {
        let gutter: Gutter = {
            vertical: props.theme.gutter,
            horizontal: props.theme.gutterPercentage(0.5),
        };
        switch (props.size) {
            case 'small':
                gutter.vertical = props.theme.gutterPercentage(0.5);
                gutter.horizontal = props.theme.gutterPercentage(0.5);
                break;
            case 'form':
                gutter.vertical = props.theme.gutterPercentage(0.5);
                gutter.horizontal = props.theme.gutterPercentage(0.5);
                break;
            default:
                break;
        }
        return css`
            padding: ${gutter.vertical} ${gutter.horizontal};
        `;
    }};
`;

export default ErrorAlertBoxStyles;
