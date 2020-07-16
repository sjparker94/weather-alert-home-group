import DefaultActionState from './DefaultActionState';

interface GetLocationForecastState extends DefaultActionState {
    error: string | null;
}

export default GetLocationForecastState;
