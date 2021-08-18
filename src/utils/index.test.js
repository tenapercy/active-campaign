import {getTags, getLocation, getTotalValue, transformContactData} from './index';

describe('utils', () => {
    const deals = [{
        id: '1',
        currency: 'usd',
        value: 100,
    }, {
        id: '2',
        currency: 'usd',
        value: 20,
    }, {
        id: '3',
        currency: 'usd',
        value: 55,
    }, {
        id: '4',
        currency: 'usd',
        value: 40,
    }];

    const geoIps = [{
        geoaddrid: '10',
        id: '5',
    }, {
        geoaddrid: '12',
        id: '6',
    }];

    const geoAddresses = [{
        id: '10',
        city: 'Nashville',
        state: 'TN',
        country: 'USA',
    }, {
        id: '12',
        city: 'New Yowk',
        state: 'NY',
        country: 'USA',
    }];

    const tags = [{
        id: '4',
        tag: 'Tag Four',
    }, {
        id: '5',
        tag: 'Tag Five'
    }, {
        id: '6',
        tag: 'Tag Six',
    }, {
        id: '7',
        tag: 'Tag Seven',
    }, {
        id: '8',
        tag: 'Tag Eight',
    }];

    const contactTags = [{
        contact: '1',
        tag: '5',
    }, {
        contact: '3',
        tag: '7',
    }, {
        contact: '1',
        tag: '8',
    }];

    describe('getTags', () => {
        it('should return an empty string if contact has no tags', () => {
            const result = getTags([], [], '1');

            expect(result).toBe('');
        });

        it('should return a comma seperated list of tags of matching tags', () => {
            const result = getTags(contactTags, tags, '1');

            expect(result).toBe('tag-five, tag-eight');
        });
    });

    describe('getLocation', () => {
        it('should return an empty string if contact has no geoIp data', () => {
            const result = getLocation([], [], []);

            expect(result).toBe('');
        });

        it('should return a correctly formatted location string', () => {
            const contactGeoIps = ['5'];

            const result = getLocation(contactGeoIps, geoIps, geoAddresses);

            expect(result).toBe('Nashville, TN, USA');
        });
    });

    describe('getTotalValue', () => {
        it('should return an empty string if contact has no deals', () => {
            const result = getTotalValue([], []);

            expect(result).toBe('');
        });

        it('should return a correctly formatted currency string that is the sum of all deal values', () => {
            const contactDeals = ['1', '2', '4'];

            const result = getTotalValue(contactDeals, deals);

            expect(result).toBe('$160.00');
        });
    });

    describe('transformContactData', () => {
        it('should correctly transform raw contact data', () => {
            const contacts = [{
                firstName: 'Tena',
                lastName: 'Percy',
                id: '1',
                deals: ['1', '2', '4'],
                geoIps: ['5'],
            }];

            const result = transformContactData({contacts, deals, geoIps, geoAddresses, contactTags, tags});

            expect(result[0].name).toBe('Tena Percy');
            expect(result[0].dealCount).toBe(3);
            expect(result[0].location).toBe('Nashville, TN, USA');
            expect(result[0].tags).toBe('tag-five, tag-eight');
            expect(result[0].totalValue).toBe('$160.00');
        });
    });
});
