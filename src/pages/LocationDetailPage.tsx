import React from 'react';
import { useParams } from 'react-router-dom';

interface Params {
    id?: string;
}
const LocationDetailPage: React.FC = () => {
    const { id } = useParams<Params>();
    return (
        <div>
            <p>Location id: {id}</p>
        </div>
    );

    // return null;
};

export default LocationDetailPage;
