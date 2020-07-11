import styled from 'styled-components';
import { transparentize, rem } from 'polished';

const MainSearchInputStyles = styled.div`
    margin-bottom: ${props => props.theme.gutter};
    label {
        cursor: pointer;
        display: block;
        letter-spacing: -0.5px;
        ${props => props.theme.fontSize(18, 8)};
        ${props => props.theme.font('600')};
    }
    input[type='text'],
    input[type='password'],
    input[type='email'],
    input[type='search'],
    input[type='number'],
    input[type='file'],
    input[type='time'] {
        ${props => props.theme.font('400')};
        width: 100%;
        padding: ${props => rem(12, props.theme.bodyFontSize)}
            ${props => rem(16, props.theme.bodyFontSize)};
        ${props => props.theme.fontSize(16)};
        border: 1px solid ${props => props.theme.formBorderColor()};
        transition: border 0.25s ${props => props.theme.smoothAnimation},
            box-shadow 0.25s ${props => props.theme.smoothAnimation};
        border-radius: ${props => props.theme.smallBorderRadius};
        outline: none;
        line-height: 1.5;
        &:focus {
            border-color: ${props => props.theme.primaryColor};
            box-shadow: inset 1px 1px 5px 0 ${props => transparentize(0.8, props.theme.blueGrey)},
                ${props => props.theme.bs}, 0 0 0 1px ${props => props.theme.primaryColor};
        }
        &:disabled {
            background: ${props => props.theme.lightGrey};
            cursor: not-allowed;
        }
    }
    input::-ms-clear {
        display: none;
    }
    .input-description {
        margin: ${props => rem(8, props.theme.bodyFontSize)} 0 0 0;
        ${props => props.theme.fontSize(13)};
        ${props => props.theme.font('500')};
        color: ${props => props.theme.lightTextColor};
    }
`;

export default MainSearchInputStyles;
