import styled from 'styled-components';

import WindSpeedTextValue from '../../interfaces/WindSpeedTextValue';
import WindColorsMap from '../../interfaces/WindColorsMap';
import { device } from '../../styles/breakpoint';

interface WindStyleProp {
    windSpeedText: WindSpeedTextValue;
    windDeg: number;
    windColorValues: WindColorsMap;
}

const WindDetailsStyles = styled.div<WindStyleProp>`
    display: flex;
    align-items: center;
    @media ${device.laptopMMax} {
        flex-wrap: wrap;
    }
    .wind-details-speeds {
        flex: 1;
        @media ${device.laptopMMax} {
             flex: 1 0 auto;
        }
        display: flex;
        align-items: center;
        margin-right: ${props => props.theme.gutter};
        h2 {
            ${props => props.theme.font('600')}
            ${props => props.theme.fontSize(64)}
            margin: 0;
            color: ${props => props.windColorValues[props.windSpeedText]};
        }
        .units {
            display: block;
            text-align: center;
            ${props => props.theme.fontSize(14)}
            ${props => props.theme.font('600')}
            color: ${props => props.theme.lightTextColor};
        }
        .value-wrapper {
            flex: 0 0 60px;
            text-align: center;
            margin-right: ${props => props.theme.gutterPercentage(0.5)};
        }
        .direction-wrapper {
            margin-right: ${props => props.theme.gutterPercentage(0.5)};
            flex: 0 0 40px;
        }
        .wind-direction-icon {
            transform: rotate(${props => props.windDeg - 180}deg);
            width: 40px;
            height: 40px;
            ${props => props.theme.lightTextColor}
            path {
                fill: ${props => props.windColorValues[props.windSpeedText]};
            }
        }
    }
    .wind-details-content {
        ${props => props.theme.lastItemMargin}
        margin-right: ${props => props.theme.gutter};
        flex: 1 1 100%;
        @media ${device.laptopMMax} {
            flex: 1 1 40%;
        }
        h3 {
            ${props => props.theme.fontSize(32, 0)}
        }
        p {
            ${props => props.theme.fontSize(18)}
        }
    }
    .upcoming-wind-details {
        flex: 1 0 auto;
        ${props => props.theme.lastItemMargin}
        @media ${device.laptopMMax} {
            max-width: 150px;
           margin: ${props => props.theme.gutterPercentage(0.5)} auto 0;
            flex: 0 0 100%;
        }
        @media ${device.laptopMax} {
        }
        h4 {
            text-align: right;
            ${props => props.theme.fontSize(16, 16)}
            @media ${device.laptopMax} {
                text-align: center;
            }
        }

        .wind-item-hourly {
            display: flex;
            align-items: center;
            justify-content: space-between;
            ${props => props.theme.font('600')}
            ${props => props.theme.fontSize(12)}
            &:not(:last-child) {
                margin-bottom: ${props => props.theme.gutterPercentage(0.125)};
            }
        }
        .time {
            color: ${props => props.theme.lightTextColor};
        }
        .direction {
            padding: 0 ${props => props.theme.gutterPercentage(0.125)};
        }
    }
`;

export default WindDetailsStyles;
