import React from 'react';
import styled from 'styled-components';

import { ContentBlockStyles } from '../ContentBlock/ContentBlock';
import { capitalizeFirstLetter } from '../../utils/stringUtils';

const LocationDataItemStyles = styled(ContentBlockStyles)`
transition: all .25s ${props => props.theme.smoothAnimation};
    &:hover {
        transform: translate3d(0, -2px, 0);
        box-shadow: ${props => props.theme.hoverBs}
    }
    h4 {
        color: ${props => props.theme.lightTextColor};
        ${props => props.theme.fontSize(16, 16)};
    }
    .value {
        ${props => props.theme.fontSize(40, 0)};
        line-height: 1.4;
    }
    .description {
        ${props => props.theme.font('600')}
        color: ${props => props.theme.blueGrey};

    }
`;

interface Props {
    title: string;
    value: string;
    description?: string;
}
const LocationDataItem: React.FC<Props> = ({ title, value, description }) => {
    return (
        <LocationDataItemStyles>
            <h4>{title}</h4>
            <p className="value">{value}</p>
            {description && <p className="description">{description}</p>}
        </LocationDataItemStyles>
    );
};

export default LocationDataItem;
