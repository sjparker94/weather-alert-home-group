import {
    mpsToMph,
    mpsToKmh,
    convertToFahrenheit,
    mToKm,
    mToMiles,
} from '../../utils/conversionUtils';

describe('conversion functions', () => {
    it('returns correct converted values for mpsToMph func', () => {
        expect(mpsToMph(0)).toBe(0);
        expect(mpsToMph(1)).toBe(2);
        expect(mpsToMph(24)).toBe(54);

        expect(mpsToMph(231)).toBe(517);
        expect(mpsToMph(999)).toBe(2235);
    });

    it('returns correct converted values for mpsToKmh func', () => {
        expect(mpsToKmh(0)).toBe(0);
        expect(mpsToKmh(1)).toBe(4);
        expect(mpsToKmh(28)).toBe(101);

        expect(mpsToKmh(104)).toBe(374);
        expect(mpsToKmh(523)).toBe(1883);
    });

    it('returns correct converted values for convertToFahrenheit func', () => {
        expect(convertToFahrenheit(0)).toBe(32);
        expect(convertToFahrenheit(-15)).toBe(5);
        expect(convertToFahrenheit(-34)).toBe(-29);
        expect(convertToFahrenheit(5)).toBe(41);
        expect(convertToFahrenheit(13)).toBe(55);
        expect(convertToFahrenheit(30)).toBe(86);
    });

    it('returns correct converted values for mToKm func', () => {
        expect(mToKm(0)).toBe(0);
        expect(mToKm(1)).toBe(0);
        expect(mToKm(100)).toBe(0);
        expect(mToKm(500)).toBe(1);

        expect(mToKm(455555)).toBe(456);
    });
    it('returns correct converted values for mToMiles func', () => {
        expect(mToMiles(0)).toBe(0);
        expect(mToMiles(1)).toBe(0);
        expect(mToMiles(889)).toBe(1);
        expect(mToMiles(8359015)).toBe(5195);
    });
});
