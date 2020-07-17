import styled from 'styled-components';

import { device } from '../../styles/breakpoint';

const FavouriteLocationsWrapper = styled.div`
    display: grid;
    grid-gap: ${props => props.theme.gutter};
    grid-template-columns: 1fr 1fr;
    padding-bottom: ${props => props.theme.gutter};
    @media ${device.laptopMMax} {
        display: block;
        @media ${device.laptopMMax} {
            padding-bottom: ${props => props.theme.gutterTablet};
        }
    }
`;

export default FavouriteLocationsWrapper;
