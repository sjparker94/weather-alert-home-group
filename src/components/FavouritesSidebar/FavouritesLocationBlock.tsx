import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';

import FavouritesLocationBlockStyles from './FavouritesLocationBlockStyles';
import CircleButton from '../CircleButton/CircleButton';
import { removeLocation } from '../../actions/locationsActions';
import Location from '../../interfaces/Location';
import Loader from '../Loader/Loader';
import { mpsToMph } from '../../utils/conversionUtils';
import windIcon from '../../assets/icons/wind-icon.svg';
import tempIcon from '../../assets/icons/temp-icon.svg';

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
    const baseImageUrl = 'http://openweathermap.org/img/wn/';
    const deleteText = `Remove ${name} from Favourites`;
    const tempDisplay = Math.round(temp);
    const windSpeedDisplay = Math.round(mpsToMph(wind.speed));

    const handleDeleteClick = () => {
        // const confirmed = window.confirm(`Are you sure you want to remove ${name} from favourites`);
        // if (confirmed) {
        dispatch(removeLocation(id));
        // }
    };
    return (
        <FavouritesLocationBlockStyles contentGutter="0" data-testid="favourite-location">
            <CircleButton
                onClick={handleDeleteClick}
                title={deleteText}
                aria-label={deleteText}
                data-testid="favourite-delete-button"
                deleteButton
            >
                <span className="material-icons">delete</span>
            </CircleButton>
            <NavLink to={`/location/${id}`} data-testid="favourite-location-link">
                <div className="location-block-left">
                    {!isInitialLoad && (
                        <img src={`${baseImageUrl}${weather[0].icon}.png`} alt={weather[0].main} />
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
                                <sup>°c</sup>
                            </p>
                            {/* <p className="weather-summary-item"> */}
                            {/* </p> */}
                        </>
                    )}
                </div>
            </NavLink>
        </FavouritesLocationBlockStyles>
    );
};

export default FavouritesLocationBlock;
