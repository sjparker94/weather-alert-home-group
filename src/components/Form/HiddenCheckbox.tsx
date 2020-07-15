import styled from 'styled-components';
import { hideVisually } from 'polished';

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
    ${hideVisually()};
`;

export default HiddenCheckbox;
