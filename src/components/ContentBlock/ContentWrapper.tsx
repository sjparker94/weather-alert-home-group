import styled from 'styled-components';

const HomeContentWrapper = styled.div`
    max-width: ${props => props.theme.singleColWidth};
    padding: ${props => props.theme.gutterPercentage(2)} ${props => props.theme.gutter};
    margin: 0 auto;
    .welcome-heading {
        ${props => props.theme.fontSize(40, 8)}
    }
    .welcome-paragraph {
        ${props => props.theme.fontSize(18)}
    }
`;

export default HomeContentWrapper;
