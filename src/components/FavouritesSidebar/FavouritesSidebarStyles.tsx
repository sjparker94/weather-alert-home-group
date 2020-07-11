import styled from 'styled-components';

const FavouritesSidebarStyles = styled.div`
    padding: ${props => props.theme.gutter};
    background-color: ${props => props.theme.darkBlueGrey};
    * {
        color: #fff;
    }
    .star-icon {
        color: ${props => props.theme.yellow};
    }
    .main-title {
    }
`;

export default FavouritesSidebarStyles;
