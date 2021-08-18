# Description

This is a sample project using ActiveCampaign's API, styleguide, and documentation to build out a Contact display table. To run this project run `yarn start`. You must also run `yarn proxy` to run local-cors-proxy to avoid CORS issues.

## Assumptions/Notes

- The default limit of 20 from the api is ok and we do not need to build out pagination
- Total value is the sum of all deals.value for a given contact and that each contact can only have deals in one currency. We are also assuming value is the major respresentation and not the minor (ie 12345 = 12,345 not 123.45)
- Each contact can only have one associated geoIP
- Tags should be displayed in kebab case
- Contact name is supposed to be a link not just blue in color
- Selected rows have a darker background and not alternating rows
- Empty values will be replaced with '-' based on the AC website other than deals which will display 0
- Styling: I created an AC account and created contacts to view the table and grab the font colors. I tried to match the things that were not given but admittedly I am not great at differentiating colors and sizes by eye.
- Testing: I would add component tests but testing async hooks has sent me down a time-consuming rabbit hole

## Future Improvements

- Use typescript
- Add component tests
- Add caching
- Add pagination, filtering, sorting, other table controls
- Better error handling and loading state
- Hide api key as an environment variable somehow
- Use SASS
- Better handling of empty values in table
