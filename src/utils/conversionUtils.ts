/** metres per second to miles per hour */
export const mpsToMph = (value: number) => Math.round(((value * 3600) / 1610.3) * 1000) / 1000;

/** mph to km/h */
export const mpsToKmh = (value: number) => value * 3.6;

/** celsius to fahrenheit */
export const convertToFahrenheit = (celsius: number) => (celsius * 9) / 5 + 32;
