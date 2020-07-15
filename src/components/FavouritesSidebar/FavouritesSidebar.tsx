import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import FavouritesSidebarStyles from './FavouritesSidebarStyles';
import FavouriteLocationsWrapper from './FavouriteLocationsWrapper';
import FavouritesLocationBlock from './FavouritesLocationBlock';
import useShallowEqualSelector from '../../hooks/useShallowEqualSelector';
import { getLocations } from '../../actions/locationsActions';
import Location from '../../interfaces/Location';
import AppState from '../../interfaces/AppState';

/** Persisted sidebar across all pages showing the users favourites */
const FavouritesSidebar: React.FC = () => {
    const locationsData = useShallowEqualSelector<Location[]>(state => state.locations.data);
    const isInitialLoad = useSelector<AppState, boolean>(state => state.locations.isInitialLoad);
    const dispatch = useDispatch();

    useEffect(() => {
        // On initial load we want the latest data so pass in items to go fetch it
        // Passing in it's own state data only to retrieve up to date items
        if (isInitialLoad) {
            dispatch(getLocations(locationsData));
        }
    }, [locationsData, isInitialLoad, dispatch]);

    return (
        <FavouritesSidebarStyles>
            <h2 className="main-title">
                <span className="material-icons star-icon">star</span> Your Favourites
            </h2>
            {locationsData.length ? (
                <FavouriteLocationsWrapper>
                    {locationsData.map(location => (
                        <FavouritesLocationBlock
                            key={location.id}
                            locationData={location}
                            isInitialLoad={isInitialLoad}
                        />
                    ))}
                </FavouriteLocationsWrapper>
            ) : (
                <div className="no-locations-saved" data-testid="favourites-no-locations">
                    <p>No locations have been selected use the form on the home page to add one</p>
                </div>
            )}
        </FavouritesSidebarStyles>
    );
};

export default FavouritesSidebar;
