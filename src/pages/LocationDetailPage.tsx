import React, { useContext, useEffect } from 'react';
import { ThemeContext } from 'styled-components';
import { useDispatch } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';
import { getName } from 'country-list';

import useShallowEqualSelector from '../hooks/useShallowEqualSelector';
import Location from '../interfaces/Location';
import { findByProp } from '../utils/arrayUtils';
import LocationDetailSection from '../components/LocationDetail/LocationDetailSection';
import LocationDetailSummary from '../components/LocationDetail/LocationDetailSummary';
import PageTitleSection from '../components/PageTitleSection/PageTitleSection';
import { mToKm, mToMiles } from '../utils/conversionUtils';
import { BASE_IMAGE_URL } from '../constants/siteInfo';
import SettingsState from '../interfaces/SettingsState';
import { getTempDisplayValue } from '../utils/displayUtils';
import { getForecast } from '../actions/locationsActions';
import LocationDataItem from '../components/LocationDetail/LocationDataItem';
import GetLocationForecastState from '../interfaces/GetLocationForecastState';
import HourlyForecast from '../components/LocationDetail/HourlyForecast';
import Loader from '../components/Loader/Loader';
import { capitalizeFirstLetter } from '../utils/stringUtils';

interface Params {
    id: string;
}

const LocationDetailPage: React.FC = () => {
    const dispatch = useDispatch();
    const theme = useContext(ThemeContext);
    const { id } = useParams<Params>();

    const { isFahrenheit, isKm } = useShallowEqualSelector<SettingsState>(state => state.settings);
    const locationData = useShallowEqualSelector<Location | undefined>(state => {
        return state.locations.data.find(findByProp('id', parseInt(id, 10)));
    });
    const getForecastData = useShallowEqualSelector<GetLocationForecastState>(
        state => state.locations.getForecast
    );

    useEffect(() => {
        // If there is data and forecast has not been fetched
        if (id && locationData && !locationData.forecast) {
            dispatch(getForecast(locationData.id));
        }
    }, [dispatch, id, locationData]);

    if (!locationData) {
        return <Redirect to="/404" />;
    }

    const {
        weather,
        visibility,
        forecast,
        main: { temp, feels_like, temp_max, temp_min },
    } = locationData;
    const tempDisplay = getTempDisplayValue(temp, isFahrenheit);

    const feelsLikeDisplay = getTempDisplayValue(feels_like, isFahrenheit);

    const tempMaxDisplay = getTempDisplayValue(temp_max, isFahrenheit);
    const tempMinDisplay = getTempDisplayValue(temp_min, isFahrenheit);
    const tempUnitDisplay = isFahrenheit ? '°F' : '°C';

    const visibilityValue = isKm ? mToKm(visibility) : mToMiles(visibility);

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
                            {tempDisplay}
                            <sup data-testid="temp-units">{tempUnitDisplay}</sup>
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
                <h2>Current Details</h2>
                <div className="cols-wrapper">
                    <LocationDataItem
                        title="Summary"
                        value={locationData.weather[0].main}
                        description={capitalizeFirstLetter(locationData.weather[0].description)}
                    />
                    <LocationDataItem
                        title="Humidity"
                        value={`${locationData.main.humidity}`}
                        description="%"
                    />
                    <LocationDataItem
                        title="Visibility"
                        value={`${visibilityValue}`}
                        description={isKm ? 'km' : 'miles'}
                    />
                </div>
                {!getForecastData.isPending && getForecastData.success && forecast ? (
                    <HourlyForecast
                        forecast={forecast}
                        isFahrenheit={isFahrenheit}
                        tempUnitDisplay={tempUnitDisplay}
                    />
                ) : (
                    <div className="loader-wrapper">
                        <Loader />
                    </div>
                )}
            </div>
        </LocationDetailSection>
    );
};

export default LocationDetailPage;
