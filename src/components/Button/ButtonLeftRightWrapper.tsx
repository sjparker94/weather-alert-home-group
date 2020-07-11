import styled from 'styled-components';

const ButtonLeftRightWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${props => props.theme.gutter};
    button {
        margin-bottom: 0;
        &:first-child {
            margin-right: ${props => props.theme.gutterHalf()};
        }
        &:last-child {
            margin-left: ${props => props.theme.gutterHalf()};
        }
    }
`;

export default ButtonLeftRightWrapper;
