import { findByProp } from '../../utils/arrayUtils';
import { fakeLocation } from '../../utils/testUtils';
import Location from '../../interfaces/Location';

const mockLocation = fakeLocation({
    id: 123,
});

describe('findByProp function', () => {
    it('returns true when an object contains property with given value', () => {
        const findByPropFunc = findByProp<Location, 'id'>('id', 123);

        expect(findByPropFunc(mockLocation)).toEqual(true);
    });
    it('returns false when an object does not contain property with given value', () => {
        const findByPropFunc = findByProp<Location, 'id'>('id', 1492993857);

        expect(findByPropFunc(mockLocation)).toEqual(false);
    });
    it('returns an item when used within an array method', () => {
        const mockLocation2 = fakeLocation();
        const mockLocationsArray = [mockLocation2, mockLocation];

        const locationFound = mockLocationsArray.find(findByProp('id', 123));

        expect(locationFound).toEqual(mockLocation);
    });
    it('returns undefined when unsuccessful within an array find method', () => {
        const mockLocation2 = fakeLocation();
        const mockLocationsArray = [mockLocation2, mockLocation];

        const locationFound = mockLocationsArray.find(findByProp('id', 4924809129084902));

        expect(locationFound).toEqual(undefined);
    });
});
