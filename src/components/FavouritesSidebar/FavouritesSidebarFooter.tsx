import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { lighten } from 'polished';
import Location from '../../interfaces/Location';
import { device } from '../../styles/breakpoint';
import { BASE_IMAGE_URL } from '../../constants/siteInfo';
import useShallowEqualSelector from '../../hooks/useShallowEqualSelector';
import SettingsState from '../../interfaces/SettingsState';
import {
    toTextualWindDirection,
    getTempDisplayValue,
    getSpeedDisplayValue,
} from '../../utils/displayUtils';

const FavouritesSidebarFooterStyles = styled.footer`
    flex: 0 0 auto;
    ${props => props.theme.lastItemMargin}
    background-color: ${props => lighten(0.05, props.theme.favouritesSidebarBg())};
    padding: ${props => props.theme.gutterPercentage(0.25)} ${props => props.theme.gutter};
    p {
        color: ${props => props.theme.onDarkTextColorLight};
        ${props => props.theme.font('600')}
        ${props => props.theme.fontSize(12)}
    }
    @media ${device.laptopMMax} {
        padding: ${props => props.theme.gutterPercentage(0.25)}
            ${props => props.theme.gutterTablet};
    }
    h5 {
        color: ${props => props.theme.onDarkTextColorLight};
        ${props => props.theme.font('600')}
        ${props => props.theme.fontSize(14, 8)}
    }
    .footer-weather-wrapper {
        display: flex;
        margin-bottom: ${props => props.theme.gutterPercentage(0.25)};
        .footer-weather-icon {
            flex: 0 0 30px;
            margin-right: ${props => props.theme.gutterPercentage(0.25)}
        }
        .footer-weather-details {
            flex: 1 1 100%;
            ${props => props.theme.lastItemMargin}
        }
        h4 {
            ${props => props.theme.fontSize(16, 0)}
        }
        p {
            color: ${props => props.theme.onDarkTextColor};
            ${props => props.theme.fontSize(14, 0)}
            ${props => props.theme.font('400')}
        }
    }

`;

const FavouritesSidebarFooter: React.FC = () => {
    const [currentLocationData, setCurrentLocationData] = useState<Location | null>(null);
    const [currentLat, setCurrentLat] = useState<number | null>(null);
    const [currentLon, setCurrentLon] = useState<number | null>(null);
    const { isFahrenheit, isKm } = useShallowEqualSelector<SettingsState>(state => state.settings);
    const tempUnitDisplay = isFahrenheit ? '°F' : '°C';
    const speedUnitDisplay = isKm ? 'km/h' : 'mph';

    useEffect(() => {
        function getLocation() {
            navigator.geolocation.getCurrentPosition(position => {
                setCurrentLat(position.coords.latitude);
                setCurrentLon(position.coords.longitude);
            });
        }
        getLocation();
    }, []);
    useEffect(() => {
        async function getLocationData() {
            try {
                const response = await axios.get<Location>(
                    `${
                        process.env.REACT_APP_OPENWEATHER_API_URL
                    }weather?lat=${currentLat}&lon=${currentLon}&units=${
                        process.env.REACT_APP_OPENWEATHER_API_UNITS
                    }&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
                );
                if (response.data) {
                    setCurrentLocationData(response.data);
                }
            } catch (err) {}
        }
        if (currentLat && currentLon && !currentLocationData) {
            getLocationData();
        }
    }, [currentLat, currentLon, currentLocationData]);
    return (
        <FavouritesSidebarFooterStyles>
            {currentLocationData && (
                <>
                    <h5>Current Location</h5>
                    <div className="footer-weather-wrapper">
                        <div className="footer-weather-icon">
                            <img
                                src={`${BASE_IMAGE_URL}${currentLocationData.weather[0].icon}.png`}
                                alt={currentLocationData.weather[0].main}
                            />
                        </div>
                        <div className="footer-weather-details">
                            <h4>{currentLocationData.name}</h4>
                            <p>
                                {getSpeedDisplayValue(currentLocationData.wind.speed, isKm)}
                                <span>{speedUnitDisplay}</span>{' '}
                                {toTextualWindDirection(currentLocationData.wind.deg)} wind,{' '}
                                {getTempDisplayValue(currentLocationData.main.temp, isFahrenheit)}
                                <sup>{tempUnitDisplay}</sup>
                            </p>
                        </div>
                    </div>
                </>
            )}
            <p>Made with ♥ by Simon Parker</p>
        </FavouritesSidebarFooterStyles>
    );
};

export default FavouritesSidebarFooter;
