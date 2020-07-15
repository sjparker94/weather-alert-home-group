/** metres per second to miles per hour */
export const mpsToMph = (value: number) => Math.round(((value * 3600) / 1610.3) * 1000) / 1000;

/** celsius to fahrenheit */
export const convertToFahrenheit = (celsius: number) => (celsius * 9) / 5 + 32;

export function toTextualWindDirection(degree: number) {
    const sectors = [
        'Northerly',
        'North Easterly',
        'Easterly',
        'South Easterly',
        'Southerly',
        'South Westerly',
        'Westerly',
        'North Westerly',
    ];

    degree += 22.5;

    if (degree < 0) {
        degree = 360 - (Math.abs(degree) % 360);
    } else {
        degree = degree % 360;
    }

    const which = Math.floor(degree / 45);
    return sectors[which];
}
