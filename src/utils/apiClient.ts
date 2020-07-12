import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_OPENWEATHER_API_URL,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export default apiClient;
