import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

import Forecast from '../../interfaces/Forecast';
import { ContentBlockStyles } from '../ContentBlock/ContentBlock';
import { BASE_IMAGE_URL } from '../../constants/siteInfo';
import { getTempDisplayValue } from '../../utils/displayUtils';
import ContentBlockHeader from '../ContentBlock/ContentBlockHeader';

type TempUnit = '°F' | '°C';
interface Props {
    forecast: Forecast[];
    isFahrenheit: boolean;
    tempUnitDisplay: TempUnit;
}

const HourlyForecastStyles = styled(ContentBlockStyles)`
    .items-wrapper {
        display: flex;
        align-items: center;
    }
    .forecast-item {
        flex: 1 1 auto;
        text-align: center;
        ${props => props.theme.lastItemMargin}
    }
    p {
        margin-bottom: ${props => props.theme.gutterPercentage(0.25)}
    }
    .temp {
        ${props => props.theme.font('600')}
        ${props => props.theme.fontSize(18)}
        sup {
            color: ${props => props.theme.lightTextColor};
        }
    }
    .time {
        ${props => props.theme.font('600')}
        ${props => props.theme.fontSize(14)}
        color: ${props => props.theme.lightTextColor};
    }
`;

const HourlyForecast: React.FC<Props> = ({ forecast, isFahrenheit, tempUnitDisplay }) => {
    return (
        <HourlyForecastStyles>
            <ContentBlockHeader>
                <h2>24 hour Forecast</h2>
            </ContentBlockHeader>
            <div className="items-wrapper">
                {forecast.map(({ main, weather, dt_txt }) => (
                    <div className="forecast-item">
                        <p className="temp">
                            {getTempDisplayValue(main.temp, isFahrenheit)}
                            <sup data-testid="temp-units">{tempUnitDisplay}</sup>
                        </p>
                        <p className="summary">{weather[0].main}</p>
                        <img
                            src={`${BASE_IMAGE_URL}${weather[0].icon}.png`}
                            alt={weather[0].main}
                        />
                        <p className="time">{format(new Date(dt_txt), 'HH:mm')}</p>
                    </div>
                ))}
            </div>
        </HourlyForecastStyles>
    );
};

export default HourlyForecast;
