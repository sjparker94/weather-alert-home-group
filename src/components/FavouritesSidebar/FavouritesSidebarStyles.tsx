import styled from 'styled-components';
import { device } from '../../styles/breakpoint';

const FavouritesSidebarStyles = styled.div`
    padding: calc(${props => props.theme.headerHeight} + ${props => props.theme.gutter})
        ${props => props.theme.gutter} ${props => props.theme.gutter} ${props => props.theme.gutter};
    background-color: ${props => props.theme.favouritesSidebarBg()};
    overflow-y: auto;
    position: relative;
    &:before {
        content: '';
        top: 0;
        left: 0;
        height: ${props => props.theme.headerHeight};
        width: 100%;
        background: ${props => props.theme.favouritesSidebarBg()};
        z-index: 1;
    }
    @media ${device.laptopMMax} {
        padding: calc(${props => props.theme.headerHeight} + ${props => props.theme.gutter})
            ${props => props.theme.gutterTablet} ${props => props.theme.gutterTablet}
            ${props => props.theme.gutterTablet};
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
