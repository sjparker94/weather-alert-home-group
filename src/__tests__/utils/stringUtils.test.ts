import { capitalizeFirstLetter } from '../../utils/stringUtils';

describe('display functions', () => {
    it('returns a string with an uppercased first character using capitalizeFirstLetter func', () => {
        expect(capitalizeFirstLetter('hello World')).toBe('Hello World');
        expect(capitalizeFirstLetter('Another string')).toBe('Another string');
        expect(capitalizeFirstLetter('&ksdflak')).toBe('&ksdflak');
    });
});
