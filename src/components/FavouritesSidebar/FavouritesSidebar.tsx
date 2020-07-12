import React from 'react';
import FavouritesSidebarStyles from './FavouritesSidebarStyles';
import FavouriteLocationsWrapper from '../FavouriteLocations/FavouriteLocationsWrapper';
import { useSelector } from 'react-redux';
import LocationsState from '../../interfaces/LocationsState';
import AppState from '../../interfaces/AppState';
import { locationsSelector } from '../../utils/selectors';

const FavouritesSidebar: React.FC = () => {
    const locations = useSelector<AppState, LocationsState>(locationsSelector);

    return (
        <FavouritesSidebarStyles>
            <h2 className="main-title">
                <span className="material-icons star-icon">star</span> Your Favourites
            </h2>
            {locations.data.length ? (
                <FavouriteLocationsWrapper>
                    {locations.data.map(location => (
                        <p key={location.id}>{location.name}</p>
                    ))}
                </FavouriteLocationsWrapper>
            ) : (
                <div className="no-locations-saved">
                    <p>No locations have been selected use the form on the home page to add one</p>
                </div>
            )}
        </FavouritesSidebarStyles>
    );
};

export default FavouritesSidebar;
