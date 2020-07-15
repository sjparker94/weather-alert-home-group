import styled from 'styled-components';

const LocationDetailSection = styled.section`
    .content-wrapper {
        max-width: 800px;
        margin: -${props => props.theme.gutter} auto 0;
        ${props => props.theme.lastItemMargin}
    }
`;

export default LocationDetailSection;
