import styled from 'styled-components';

import ContentBlock from '../ContentBlock/ContentBlock';
import WindSpeedTextValues from '../../interfaces/WindSpeedTextValue';

interface Props {
    windSpeed: WindSpeedTextValues;
}

const LocationDetailSummaryStyles = styled(ContentBlock)<Props>`
    .wind-details-wrapper {
        display: flex;
        .wind-details-speeds {
            flex: 0 0 auto;
        }
        .wind-details-right {
            flex: 1 1 100%;
        }
    }
    .wind-direction-icon {
    }
`;

export default LocationDetailSummaryStyles;
