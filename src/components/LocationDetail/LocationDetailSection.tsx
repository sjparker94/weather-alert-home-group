import styled from 'styled-components';
import { math } from 'polished';

const LocationDetailSection = styled.section`
    .content-wrapper {
        max-width: 860px;
        margin: -${props => props.theme.gutter} auto 0;
        ${props => props.theme.lastItemMargin}
        padding: 0 ${props => props.theme.gutter} ${props =>
    props.theme.gutterPercentage(2)} ${props => props.theme.gutter};
    > h2 {
        ${props => props.theme.font('600')}
        margin-top: ${props => props.theme.gutterPercentage(1.5)};
    }
    }
    .cols-wrapper {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: ${props => props.theme.gutterPercentage(1.5)};
        --gutter:  ${props => math(`${props.theme.gutter} / 2`)};
        --negativeGutter: -${props => math(`${props.theme.gutter} / 2`)};
        --width: 33.33333%;
        margin-left: var(--negativeGutter);
        margin-right: var(--negativeGutter);
        > * {
            /* flex: 1 1 var(--width); */
            flex: 0 1 calc(33.3333% - calc(var(--gutter) * 2));
            margin-left: var(--gutter);
            margin-right: var(--gutter);
        }
    }
`;

export default LocationDetailSection;
