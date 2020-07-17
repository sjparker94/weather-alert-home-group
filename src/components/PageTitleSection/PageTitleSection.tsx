import styled from 'styled-components';
import { transparentize } from 'polished';
import { device } from '../../styles/breakpoint';

const PageTitleSection = styled.section`
    padding: calc(
            ${props => props.theme.headerHeight} + ${props => props.theme.gutterPercentage(2)}
        )
        ${props => props.theme.gutterPercentage(2)} ${props => props.theme.gutterPercentage(2)};
    ${props => props.theme.primaryGradient};
    @media ${device.laptopMMax} {
        padding: calc(
            ${props => props.theme.headerHeight} + ${props => props.theme.gutter}
        )
        ${props => props.theme.gutter} ${props => props.theme.gutterPercentage(2)};
    }
    @media ${device.mobileLMax} {
        padding: calc(
            ${props => props.theme.headerHeight} + ${props => props.theme.gutterMobile}
        )
        ${props => props.theme.gutterMobile} ${props => props.theme.gutterPercentage(2)};
    }
    h1 {
        color: #fff;
        ${props => props.theme.fontSize(64, 8)}
        text-shadow: 2px 2px 20px ${transparentize(0.7, '#000')};
        @media ${device.laptopMMax} {
            ${props => props.theme.fontSize(56, 8)}

        }
        @media ${device.mobileLMax} {
            ${props => props.theme.fontSize(48, 8)}
        }
    }
    h3 {
        color: ${transparentize(0.2, '#000')};
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
