import styled from 'styled-components';

import { device } from '../../styles/breakpoint';

const FavouritesSidebarStyles = styled.div`
    background-color: ${props => props.theme.favouritesSidebarBg()};
    overflow-y: auto;
    position: relative;
    padding-top: ${props => props.theme.headerHeight};
    display: flex;
    flex-direction: column;
    .favourites-wrapper {
        flex: 1;
        padding: ${props => props.theme.gutter};
        @media ${device.laptopMMax} {
            padding: ${props => props.theme.gutterTablet};
        }
    }

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
