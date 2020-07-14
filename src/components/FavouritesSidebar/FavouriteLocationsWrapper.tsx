import styled from 'styled-components';

const FavouriteLocationsWrapper = styled.div`
    display: grid;
    grid-gap: ${props => props.theme.gutter};
    grid-template-columns: 1fr 1fr;
`;

export default FavouriteLocationsWrapper;
