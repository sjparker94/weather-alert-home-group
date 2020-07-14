import styled from 'styled-components';

const FavouritesSidebarStyles = styled.div`
    padding: ${props => props.theme.gutter};
    background-color: ${props => props.theme.favouritesSidebarBg()};
    .star-icon {
        color: ${props => props.theme.yellow};
        transform: rotate(-12deg);
    }
    h1,
    h2,
    h3,
    h4 {
        color: #fff;
    }
    .main-title {
    }
`;

export default FavouritesSidebarStyles;
