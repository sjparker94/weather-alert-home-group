/** metres per second to miles per hour approx with rounding */
export const mpsToMph = (value: number) => Math.round(value * 2.237);

/** mph to km/h appox with rounding */
export const mpsToKmh = (value: number) => Math.round(value * 3.6);

/** celsius to fahrenheit rounded */
export const convertToFahrenheit = (celsius: number) => Math.round((celsius * 9) / 5 + 32);

export const mToKm = (value: number) => Math.round(value / 1000);

/** rough conversion of metres to miles */
export const mToMiles = (value: number) => Math.round(value / 1609);
