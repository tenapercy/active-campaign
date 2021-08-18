import axios from 'axios';

import { API_KEY, BASE_URL } from '../constants';

export const getTags = (contactTags, tags, id) => {
    const foundTags = [];

    // contactTags is the relationship between contact ID and tag ID.
    // If we have a match (if contact.id == contactTag.contact) then we need
    // to grab contactTag.tag and find that tag from the list of tags
    contactTags.forEach((contactTag) => {
        if (id === contactTag.contact) {
            const {tag} = tags.find(({id}) => id === contactTag.tag);

            if (tag) {
                foundTags.push(tag.toLowerCase().split(' ').join('-'));
            }
        }
    });

    return foundTags.length ? foundTags.join(', ') : '';
};

export const getLocation = (contactGeoIps, geoIps, geoAddresses) => {
    let location = '';

    // contact.geoIps (renamed to contactGeoIps) is a list of geoIp IDs associated with the given contact
    // If a contact has a geoIP (assuming they can only have one associated location) then we need to find
    // the geoIP data in the list of all geoIPs. Each geoIP is associated with a geoAddress, so we need to
    // find the related one and build out our location string
    contactGeoIps.forEach((contactGeoIp) => {
        const geoIp = geoIps.find(({id}) => id === contactGeoIp);

        if (geoIp) {
            const {city, state, country} = geoAddresses.find(({id}) => geoIp.geoaddrid);

            if (city && state && country) {
                location = `${city}, ${state}, ${country}`;
            }

            // assuming each contact can only have one associated geoIP we no longer need to keep searching
            return;
        }
    });

    return location;
};

export const getTotalValue = (contactDeals, deals) => {
    let currency = '';
    let totalValue = '';
    let value = 0;

    // contact.deals (renamed to contactDeals) is a list of deal IDs for the given contact
    // If we have any deal IDs we need to find the given deal in the list of all deals.
    // We are assuming total value is the total value of all deals for the given contact and
    // that all deals will be in the same currency. We are also assuming value is the major respresentation
    // and not the minor (ie 12345 = 12,345 not 123.45)
    contactDeals.forEach((contactDeal) => {
        const deal = deals.find(({id}) => id === contactDeal);

        if (deal) {
            currency = deal.currency;
            value += Number(deal.value);
        }
    });

    if (currency && value) {
        totalValue = new Intl.NumberFormat('en-US', {style: 'currency', currency}).format(value);
    }

    return totalValue;
};

export const transformContactData = ({contacts = [], deals = [], geoIps = [], geoAddresses = [], contactTags = [], tags = []}) => {
    const contactData = contacts.map((contact) => {
        const {firstName, lastName, id, deals: contactDeals, geoIps: contactGeoIps} = contact;

        return {
            id,
            name: `${firstName} ${lastName}`,
            dealCount: contactDeals.length,
            location: getLocation(contactGeoIps, geoIps, geoAddresses),
            tags: getTags(contactTags, tags, id),
            totalValue: getTotalValue(contactDeals, deals),
        };
    });

    return contactData;
}

export const fetchContactData = () => {
    return axios.get(`${BASE_URL}/contacts?include=deals,geoIps.geoAddress,tags,contactTags.tag`, {
        "headers": {
            'Api-Token': API_KEY,
        }
    }).then(
        ({data}) => transformContactData(data)
    ).catch((err) => {throw new Error(err)});
};
