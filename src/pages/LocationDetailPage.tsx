import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { useParams, Redirect } from 'react-router-dom';
import { getName } from 'country-list';

import useShallowEqualSelector from '../hooks/useShallowEqualSelector';
import Location from '../interfaces/Location';
import { findByProp } from '../utils/arrayUtils';
import LocationDetailSection from '../components/LocationDetail/LocationDetailSection';
import LocationDetailSummary from '../components/LocationDetail/LocationDetailSummary';
import PageTitleSection from '../components/PageTitleSection/PageTitleSection';
import { convertToFahrenheit } from '../utils/conversionUtils';
import { BASE_IMAGE_URL } from '../constants/siteInfo';

interface Params {
    id: string;
}

const LocationDetailPage: React.FC = () => {
    const { id } = useParams<Params>();
    const theme = useContext(ThemeContext);
    const locationData = useShallowEqualSelector<Location | undefined>(state => {
        return state.locations.data.find(findByProp('id', parseInt(id, 10)));
    });

    if (!locationData) {
        return <Redirect to="404" />;
    }

    const {
        weather,
        main: { temp, feels_like, temp_max, temp_min },
    } = locationData;
    const isFahrenheit = false;
    const tempDisplay = Math.round(temp);
    const feelsLikeDisplay = isFahrenheit
        ? convertToFahrenheit(Math.round(feels_like))
        : Math.round(feels_like);
    const tempMaxDisplay = isFahrenheit
        ? convertToFahrenheit(Math.round(temp_max))
        : Math.round(temp_max);
    const tempMinDisplay = isFahrenheit
        ? convertToFahrenheit(Math.round(temp_min))
        : Math.round(temp_min);
    const tempUnitDisplay = isFahrenheit ? '°F' : '°C';
    return (
        <LocationDetailSection>
            <PageTitleSection>
                <div className="page-title-left-right-wrapper">
                    <div className="page-title-content">
                        <h1>{locationData.name}</h1>
                        <h3>{getName(locationData.sys.country)}</h3>
                    </div>
                    <div className="page-title-extra">
                        <p className="min-max-temp">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24"
                                viewBox="0 0 24 24"
                                width="24"
                                className="up-icon"
                                fill={theme.green}
                            >
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path d="M7 14l5-5 5 5z" />
                            </svg>
                            <span>
                                {tempMaxDisplay}
                                <sup>°</sup>
                            </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24"
                                viewBox="0 0 24 24"
                                width="24"
                                fill={theme.red}
                            >
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path d="M7 10l5 5 5-5z" />
                            </svg>
                            <span>
                                {tempMinDisplay}
                                <sup>°</sup>
                            </span>
                        </p>

                        <h3>
                            <img
                                src={`${BASE_IMAGE_URL}${weather[0].icon}.png`}
                                alt={weather[0].main}
                            />
                            {tempDisplay} <sup>{tempUnitDisplay}</sup>
                        </h3>
                        <p className="feels-like">
                            Feels like {feelsLikeDisplay}
                            <sup>°</sup>
                        </p>
                    </div>
                </div>
            </PageTitleSection>
            <div className="content-wrapper">
                <LocationDetailSummary locationData={locationData} />
            </div>
        </LocationDetailSection>
    );

    // return null;
};

export default LocationDetailPage;
