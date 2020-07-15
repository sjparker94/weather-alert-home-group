import styled from 'styled-components';
import { transparentize } from 'polished';

const PageTitleSection = styled.section`
    padding: calc(
            ${props => props.theme.headerHeight} + ${props => props.theme.gutterPercentage(2)}
        )
        ${props => props.theme.gutterPercentage(2)} ${props => props.theme.gutterPercentage(2)};
    background: ${props => props.theme.secondaryColor};
    background: linear-gradient(
        35deg,
        rgba(8, 69, 147, 1) 0%,
        rgba(8, 69, 147, 1) 21%,
        ${props => props.theme.secondaryColor} 74%,
        ${props => props.theme.secondaryColor} 74%,
        ${props => props.theme.secondaryColor} 100%
    );

    background: linear-gradient(-213deg, #5e31dc 0%, #3155dc 100%),
        linear-gradient(32deg, rgba(255, 255, 255, 0.25) 33%, rgba(0, 0, 0, 0.25) 100%);
    h1 {
        color: #fff;
        ${props => props.theme.fontSize(64, 8)}
    }
    h3 {
        color: ${transparentize(0.3, '#000')};
    }
    .page-title-left-right-wrapper {
        display: flex;
        align-items: center;
    }
    .page-title-content,
    .page-title-extra {
        ${props => props.theme.lastItemMargin}
    }

    .page-title-content {
        flex: 1 1 100%;
        margin-right: ${props => props.theme.gutter};
    }
    .page-title-extra {
        flex: 0 0 auto;
        text-align: right;
        h3 {
            color: #fff;
            ${props => props.theme.fontSize(48, 4)}
            ${props => props.theme.font('400')}
        }
        p {
            color: ${transparentize(0.3, '#000')};
            margin-bottom: 0;
            ${props => props.theme.font('600')}
        }
        sup {
            vertical-align: super;
            font-size: 0.7em;
            opacity: 0.75;
        }
        .min-max-temp {
            svg {
                margin-bottom: -6px;
            }
            span {
                &:first-of-type {
                    margin-right: 6px;
                }
            }
        }
    }
`;

export default PageTitleSection;
