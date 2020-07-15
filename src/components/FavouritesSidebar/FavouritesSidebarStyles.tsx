import styled from 'styled-components';
import { math } from 'polished';

const FavouritesSidebarStyles = styled.div`
    padding: calc(${props => props.theme.headerHeight} + ${props => props.theme.gutter})
        ${props => props.theme.gutter} ${props => props.theme.gutter} ${props => props.theme.gutter};
    background-color: ${props => props.theme.favouritesSidebarBg()};
    overflow-y: auto;
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
    .no-locations-saved {
        p {
            color: ${props => props.theme.onDarkTextColor};
        }
    }
`;

export default FavouritesSidebarStyles;
