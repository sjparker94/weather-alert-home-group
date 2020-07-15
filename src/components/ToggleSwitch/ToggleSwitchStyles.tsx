import styled, { css } from 'styled-components';

interface Props {
    checked: boolean;
    /** Height */
    size?: number;
}
const ToggleSwitchStyles = styled.div<Props>`
    display: block;
    input[type='checkbox'],
    [role='checkbox'] {
        &:focus + .toggle-wrapper {
            box-shadow: 0 0 0 2px ${props => props.theme.secondaryColor};
        }
        &:checked + .toggle-wrapper {
            box-shadow: 0 0 0 5px ${props => props.theme.secondaryColor};
        }
    }
    .toggle-wrapper {
        display: flex;
        align-items: center;
        .toggle-description {
            flex: 1 1 100%;
            ${props => props.theme.lastItemMargin};
            p {
                ${props => props.theme.fontSize(13)}
                ${props => props.theme.font('600')}
            }
        }
        .toggle-slide-element {
            flex: 0 0 auto;
            border-radius: 500px;
            position: relative;
        }
        ${props => {
            const totalHeight = props.size || 40;
            const totalWidth = totalHeight * 1.5;
            const outerBorderWidth = 2;
            const outerPaddingWidth = 3;

            const circleSize = totalHeight - outerBorderWidth * 2 - outerPaddingWidth * 2;
            const translateXValue =
                totalWidth - circleSize - outerBorderWidth * 2 - outerPaddingWidth * 2;

            return css`
                .toggle-slide-element {
                    height: ${totalHeight}px;
                    width: ${totalWidth}px;
                    border: ${outerBorderWidth}px solid ${props.theme.formBorderColor()};
                    padding: ${outerPaddingWidth}px;
                }
                .toggle-circle {
                    /**This is height minus the border and then the same width taken off again to give space between border circle */
                    width: ${circleSize}px;
                    height: ${circleSize}px;
                    ${props.checked &&
                        css`
                            transform: translateX(${translateXValue}px) translateZ(0);
                        `};
                }
            `;
        }}
        .toggle-circle {
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.25s ${props => props.theme.smoothAnimation};
            background-color: ${props => props.theme.formBorderColor()};
        }
    }
`;

export default ToggleSwitchStyles;
