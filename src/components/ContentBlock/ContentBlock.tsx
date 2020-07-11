import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { math } from 'polished';
import ContentBlockHeader from './ContentBlockHeader';

interface Props {
    contentGutter?: string;
    headerGutter?: string;
    title?: string;
}

export const ContentBlockStyles = styled.div<Props>`
    padding: ${props => (props.contentGutter ? props.contentGutter : props.theme.gutter)};
    margin-bottom: ${props => props.theme.gutter};
    background-color: #fff;
    border-radius: ${props => props.theme.mainBorderRadius};
    ${props => props.theme.lastItemMargin}
    box-shadow: ${props => props.theme.contentBs};
    box-shadow: ${props => props.theme.bs};
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

const ContentBlock: React.FC<Props> = ({ children, title, contentGutter, headerGutter }) => {
    return (
        <ContentBlockStyles contentGutter={contentGutter} headerGutter={headerGutter} title={title}>
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
