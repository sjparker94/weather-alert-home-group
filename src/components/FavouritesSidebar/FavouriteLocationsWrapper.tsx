import styled from 'styled-components';
import { device } from '../../styles/breakpoint';

const FavouriteLocationsWrapper = styled.div`
    display: grid;
    grid-gap: ${props => props.theme.gutter};
    grid-template-columns: 1fr 1fr;
    @media ${device.laptopMMax} {
        display: block;
    }
`;

export default FavouriteLocationsWrapper;
