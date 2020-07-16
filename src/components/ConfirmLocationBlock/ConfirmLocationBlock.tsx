import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getName } from 'country-list';

import SearchLocationState from '../../interfaces/SearchLocationState';
import ButtonLeftRightWrapper from '../Button/ButtonLeftRightWrapper';
import Button from '../Button/Button';
import { addLocation, searchLocationCancel } from '../../actions/locationsActions';
import useShallowEqualSelector from '../../hooks/useShallowEqualSelector';

const ConfirmLocationBlockStyles = styled.div`
    ${props => props.theme.lastItemMargin}
    padding: ${props => props.theme.gutterHalf()};
    background-color: ${props => props.theme.lightestGrey};
    box-shadow: ${props => props.theme.smallBs};
    h3 {
        ${props => props.theme.font('600')}
        ${props => props.theme.fontSize(18)}
    }
    .location-details {
        ${props => props.theme.lastItemMargin}
        margin-bottom: ${props => props.theme.gutterHalf()};
        h2 {
            ${props => props.theme.font('600')}
            ${props => props.theme.fontSize(24, 7)}
        }
        .country {
            color: ${props => props.theme.lightTextColor};
            ${props => props.theme.fontSize(20, 8)}
        }
    }
`;
interface Props {
    resetForm: () => void;
}
/** When a user searches for a result and it returns a location check if it is the result they wanted */
const ConfirmLocationBlock: React.FC<Props> = ({ resetForm }) => {
    const dispatch = useDispatch();

    const { data } = useShallowEqualSelector<SearchLocationState>(
        state => state.locations.searchLocation
    );

    const handleConfirm = () => {
        if (data) {
            dispatch(addLocation(data));
        }
        resetForm();
    };
    const handleCancel = () => {
        dispatch(searchLocationCancel());
        resetForm();
    };

    if (!data) {
        return null;
    }

    return (
        <ConfirmLocationBlockStyles>
            <h3>Would you like to add this city to favourites?</h3>
            <div className="location-details">
                <h2>{data.name}</h2>
                <p className="country">{getName(data.sys.country)}</p>
            </div>
            <ButtonLeftRightWrapper>
                <Button
                    fullWidth
                    colorTheme="white"
                    onClick={handleCancel}
                    data-testid="cancel-search-button"
                >
                    No (cancel)
                </Button>
                <Button
                    fullWidth
                    colorTheme="secondary"
                    onClick={handleConfirm}
                    data-testid="confirm-search-button"
                >
                    Yes, add to favourites
                </Button>
            </ButtonLeftRightWrapper>
        </ConfirmLocationBlockStyles>
    );
};

export default ConfirmLocationBlock;
