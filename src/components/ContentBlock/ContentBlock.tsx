import React from 'react';
import styled, { css } from 'styled-components';
import { math, lighten } from 'polished';
import { motion } from 'framer-motion';

import ContentBlockHeader from './ContentBlockHeader';

interface Props {
    contentGutter?: string;
    headerGutter?: string;
    title?: string;
    alert?: boolean;
}

export const ContentBlockStyles = styled(motion.div)<Props>`
    padding: ${props => (props.contentGutter ? props.contentGutter : props.theme.gutter)};
    margin-bottom: ${props => props.theme.gutter};
    background-color: #fff;
    border-radius: ${props => props.theme.mainBorderRadius};
    ${props => props.theme.lastItemMargin}
    box-shadow: ${props => props.theme.contentBs};
    box-shadow: ${props => props.theme.bs};
    ${props =>
        props.alert &&
        css`
            box-shadow: ${props => props.theme.bs}, inset 4px 0 0 0 ${props.theme.red};
            background-color: ${lighten(0.46, props.theme.red)} !important;
        `}
    ${ContentBlockHeader} {
        ${props => props.theme.lastItemMargin}
        background-color: #fff;
        border-bottom: 1px solid ${props => props.theme.lightBorderColor()};
        border-radius: ${props => props.theme.mainBorderRadius}
            ${props => props.theme.mainBorderRadius} 0 0;
        h3 {
            ${props => props.theme.fontSize(20)}
            ${props => props.theme.font('600')}
        }
        h2 {
            ${props => props.theme.fontSize(28)}
            ${props => props.theme.font('600')}
        }
        h4 {

        }
        svg {
            vertical-align: bottom;
            margin-right: 1rem;
        }
        ${props => {
            const gutterVal = props.contentGutter ? props.contentGutter : props.theme.gutter;
            const smallGutterVal = math(`${gutterVal} / 1.75`);

            // This is the padding used on the header
            let headerGutterVal;
            if (props.headerGutter) {
                headerGutterVal = props.headerGutter;
            } else {
                headerGutterVal = `${smallGutterVal} ${gutterVal}`;
            }

            return css`
                margin: -${gutterVal} -${gutterVal} ${gutterVal} -${gutterVal};
                padding: ${headerGutterVal};
            `;
        }};
    }
`;

const ContentBlock: React.FC<Props> = ({ children, title, contentGutter, headerGutter, alert }) => {
    const animationValues = {
        x: [-10, 10, -20, 10, 0],
    };
    const transitionValues = {
        duration: 0.3,
        ease: 'easeInOut',
        loop: 1,
    };
    return (
        <ContentBlockStyles
            contentGutter={contentGutter}
            alert={alert}
            headerGutter={headerGutter}
            title={title}
            animate={alert ? animationValues : {}}
            transition={alert ? transitionValues : {}}
        >
            {title && (
                <ContentBlockHeader>
                    <h3>{title}</h3>
                </ContentBlockHeader>
            )}
            {children}
        </ContentBlockStyles>
    );
};

export default ContentBlock;
