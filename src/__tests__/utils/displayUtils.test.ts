import {
    calculateWindSpeedTextValue,
    getSpeedDisplayValue,
    getTempDisplayValue,
    toTextualWindDirection,
} from '../../utils/displayUtils';

describe('display functions', () => {
    it('returns correct converted values for getTempDisplayValue func', () => {
        expect(getTempDisplayValue(0, false)).toBe(0);
        expect(getTempDisplayValue(0, true)).toBe(32);

        expect(getTempDisplayValue(-15, false)).toBe(-15);
        expect(getTempDisplayValue(-15, true)).toBe(5);

        expect(getTempDisplayValue(25, false)).toBe(25);
        expect(getTempDisplayValue(25, true)).toBe(77);
    });
    it('returns correct converted values for getSpeedDisplayValue func', () => {
        expect(getSpeedDisplayValue(0, false)).toBe(0);
        expect(getSpeedDisplayValue(0, true)).toBe(0);

        expect(getSpeedDisplayValue(25, false)).toBe(56);
        expect(getSpeedDisplayValue(25, true)).toBe(90);
    });

    it('returns correct converted values for getSpeedDisplayValue func', () => {
        expect(calculateWindSpeedTextValue(3)).toBe('light');
        expect(calculateWindSpeedTextValue(5)).toBe('gentle');
        expect(calculateWindSpeedTextValue(12)).toBe('moderate');
        expect(calculateWindSpeedTextValue(25)).toBe('strong');
        expect(calculateWindSpeedTextValue(50)).toBe('storm');
    });
    it('returns correct converted values for toTextualWindDirection func', () => {
        expect(toTextualWindDirection(0)).toBe('Northerly');
        expect(toTextualWindDirection(360)).toBe('Northerly');
        expect(toTextualWindDirection(35)).toBe('North Easterly');
        expect(toTextualWindDirection(70)).toBe('Easterly');
        expect(toTextualWindDirection(115)).toBe('South Easterly');
        expect(toTextualWindDirection(160)).toBe('Southerly');
        expect(toTextualWindDirection(210)).toBe('South Westerly');
        expect(toTextualWindDirection(272)).toBe('Westerly');
        expect(toTextualWindDirection(325)).toBe('North Westerly');
    });
});
