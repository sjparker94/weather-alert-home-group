import styled, { css } from 'styled-components';

interface Props {
    withIcon?: boolean;
}
const ContentBlockHeader = styled.div<Props>`
    /* background: red; */
    ${props =>
        props.withIcon &&
        css`
            display: flex;
            align-items: center;
            .icon-wrapper {
                flex: 0 0 auto;
            }
        `}
`;

export default ContentBlockHeader;
