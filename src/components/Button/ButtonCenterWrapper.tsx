import styled from 'styled-components';
import Button from './Button';

const ButtonCenterWrapper = styled.div`
    ${props => props.theme.lastItemMargin}
    display: flex;
    justify-content: center;
    margin-bottom: ${props => props.theme.gutter};
    ${Button} {
        margin-bottom: 0;
    }
`;

export default ButtonCenterWrapper;
