import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import FavouritesLocationBlockStyles from './FavouritesLocationBlockStyles';
import CircleButton from '../CircleButton/CircleButton';
import { removeLocation } from '../../actions/locationsActions';
import Location from '../../interfaces/Location';
import { mpsToMph } from '../../utils/conversionUtils';
import windIcon from '../../assets/icons/wind-icon.svg';
import tempIcon from '../../assets/icons/temp-icon.svg';
import { BASE_IMAGE_URL } from '../../constants/siteInfo';

interface Props {
    locationData: Location;
    /** Passed in to show some details but wait until the latest information has been fetched to show weather info */
    isInitialLoad: boolean;
}

const FavouritesLocationBlock: React.FC<Props> = ({ locationData, isInitialLoad }) => {
    const dispatch = useDispatch();

    const {
        name,
        id,
        weather,
        wind,
        main: { temp },
    } = locationData;

    const deleteText = `Remove ${name} from Favourites`;
    const tempDisplay = Math.round(temp);
    const windSpeedDisplay = Math.round(mpsToMph(wind.speed));
    const isFahrenheit = false;

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
                                <img src={windIcon} width="30" height="30" alt="Wind speed" />
                                {windSpeedDisplay}
                                <small>mph</small>
                                <img
                                    src={tempIcon}
                                    width="26"
                                    height="26"
                                    alt="Temperature"
                                    className="temp-icon"
                                />
                                {tempDisplay}
                                <sup>{isFahrenheit ? '°F' : '°C'}</sup>
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
