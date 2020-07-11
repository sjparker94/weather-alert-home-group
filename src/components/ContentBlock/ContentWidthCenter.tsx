import styled from 'styled-components';

interface Props {
    /** Pixel value of max width of the block defaults to 800 if not set */
    maxWidth?: number;
}

/** Gives a div with margin 0 auto with a desired max width */
const ContentWidthCenter = styled.div<Props>`
    ${props => props.theme.lastItemMargin}
    max-width: ${props => (props.maxWidth ? `${props.maxWidth}px` : `800px`)};
    margin: 0 auto;
`;

export default ContentWidthCenter;
