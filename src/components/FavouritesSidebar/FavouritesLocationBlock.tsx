import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import FavouritesLocationBlockStyles from './FavouritesLocationBlockStyles';
import CircleButton from '../CircleButton/CircleButton';
import { removeLocation } from '../../actions/locationsActions';
import Location from '../../interfaces/Location';
import { BASE_IMAGE_URL } from '../../constants/siteInfo';
import SettingsState from '../../interfaces/SettingsState';
import useShallowEqualSelector from '../../hooks/useShallowEqualSelector';
import { getTempDisplayValue, getSpeedDisplayValue } from '../../utils/displayUtils';

interface Props {
    locationData: Location;
    /** Passed in to show some details but wait until the latest information has been fetched to show weather info */
    isInitialLoad: boolean;
}

const FavouritesLocationBlock: React.FC<Props> = ({ locationData, isInitialLoad }) => {
    const dispatch = useDispatch();
    const { isFahrenheit, isKm } = useShallowEqualSelector<SettingsState>(state => state.settings);
    const {
        name,
        id,
        weather,
        wind,
        main: { temp },
    } = locationData;
    const deleteText = `Remove ${name} from favourites`;
    const tempDisplay = getTempDisplayValue(temp, isFahrenheit);
    const windSpeedDisplay = getSpeedDisplayValue(wind.speed, isKm);

    const handleDeleteClick = () => {
        dispatch(removeLocation(id));
    };
    return (
        <FavouritesLocationBlockStyles
            initial={
                isInitialLoad
                    ? false
                    : {
                          scale: 0.5,
                          opacity: 0,
                          rotate: 30,
                      }
            }
            animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
            }}
            data-testid="favourite-location"
        >
            <NavLink
                to={`/location/${id}`}
                activeClassName="selected"
                data-testid="favourite-location-link"
            >
                <div className="location-block-left">
                    {!isInitialLoad && (
                        <img
                            src={`${BASE_IMAGE_URL}${weather[0].icon}.png`}
                            alt={weather[0].main}
                        />
                    )}
                </div>
                <div className="location-block-content">
                    <h3 className="location-name">{name}</h3>
                    {isInitialLoad ? (
                        <p className="loading-message">Fetching latest weather...</p>
                    ) : (
                        <>
                            <p className="weather-summary-item">
                                <svg
                                    width="26"
                                    height="26"
                                    version="1.1"
                                    viewBox="0 0 32 32"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    aria-labelledby="windTitle"
                                >
                                    <title id="windTitle">Wind Speed</title>
                                    <g
                                        fill="#FFFFFF"
                                        fillRule="evenodd"
                                        stroke="none"
                                        strokeWidth="1"
                                    >
                                        <path d="M30,14 C30,11.790861 28.2046438,10 26,10 C23.790861,10 22,11.7894101 22,14 L23,14 C23,12.3431458 24.3465171,11 26,11 C27.6568542,11 29,12.3465171 29,14 C29,15.6568542 27.6568766,17 25.9920699,17 L3,17 L3,18 L26.0015293,18 C28.2098237,18 30,16.2046438 30,14 L30,14 Z M21,13 C21,11.3431458 19.6534829,10 18,10 C16.3431458,10 15,11.3420576 15,12.991394 L15,13 L16,13 C16,11.8954305 16.8877296,11 18,11 C19.1045695,11 20,11.8877296 20,13 C20,14.1045695 19.1029399,15 17.9941413,15 L6,15 L6,16 L18.0005775,16 C19.6571128,16 21,14.6534829 21,13 L21,13 Z M25,21 C25,22.1045695 24.1122704,23 23,23 L23,23 C21.8954305,23 21,22.1052949 21,21.0057373 L21,21 L22,21 C22,21.5522847 22.4438648,22 23,22 L23,22 C23.5522847,22 24,21.5561352 24,21 L24,21 C24,20.4477153 23.5510798,20 22.992516,20 L9,20 L9,19 L23.0059397,19 C24.1072288,19 25,19.8877296 25,21 L25,21 L25,21 Z" />
                                    </g>
                                </svg>
                                {windSpeedDisplay}
                                <small data-testid="speed-units">{isKm ? 'km/h' : 'mph'}</small>
                                <svg
                                    width="22"
                                    height="22"
                                    version="1.1"
                                    viewBox="0 0 141.732 141.732"
                                    xmlSpace="preserve"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    aria-labelledby="windTitle"
                                >
                                    <title id="windTitle">Temperature</title>
                                    <g fill="#ffffff">
                                        <path d="M79.427,13.552c0,0.022-0.003,0.043-0.004,0.064h0.004v2.643v70.022v1.117c9.879,3.381,16.985,12.738,16.985,23.762   c0,13.872-11.246,25.118-25.117,25.118c-13.877,0-25.123-11.246-25.123-25.118c0-11.123,7.24-20.552,17.259-23.854v-4.798   c-0.002,0-0.01,0.004-0.012,0.004V24.318c0.002,0.002,0.01,0.004,0.012,0.006V13.681c-0.002-0.044-0.012-0.085-0.012-0.129   c0-4.418,3.583-8,8.007-8C75.844,5.553,79.427,9.134,79.427,13.552 M84.847,70.48V59.635h10.657c1.501,0,2.711-1.209,2.711-2.71   c0-1.497-1.209-2.711-2.711-2.711H84.847V43.371h10.657c1.501,0,2.711-1.212,2.711-2.709c0-1.5-1.209-2.715-2.711-2.715H84.847   V13.618h-0.004c0.001-0.044,0.004-0.085,0.004-0.131C84.847,6.038,78.838,0,71.427,0c-7.418,0-13.424,6.038-13.424,13.487   c0,0.045,0.003,0.087,0.004,0.131h-0.004v70.965c-9.794,4.889-16.527,14.998-16.527,26.688c0,16.467,13.351,29.819,29.823,29.819   c16.466,0,29.817-13.349,29.817-29.819c0-11.585-6.611-21.622-16.265-26.553v-8.817h10.657c1.501,0,2.713-1.214,2.713-2.709   c0-1.499-1.211-2.712-2.713-2.712H84.847z" />
                                    </g>
                                </svg>
                                {tempDisplay}
                                <sup data-testid="temp-units">{isFahrenheit ? '°F' : '°C'}</sup>
                            </p>
                        </>
                    )}
                </div>
            </NavLink>
            <CircleButton
                onClick={handleDeleteClick}
                title={deleteText}
                aria-label={deleteText}
                data-testid="favourite-delete-button"
                deleteButton
            >
                <span className="material-icons">delete</span>
            </CircleButton>
        </FavouritesLocationBlockStyles>
    );
};

export default FavouritesLocationBlock;
