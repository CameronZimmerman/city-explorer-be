require('dotenv').config();
const request = require('superagent');
let mungeUtils = require('../lib/api-munge-utils.js');

test('returns location data in a presentable form', async() => {

  const expectation = {
    formatted_query: 'Portland, Multnomah County, Oregon, USA',
    latitude: '45.5202471',
    longitude: '-122.6741949'
  };

  const locationData = await request.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATIONIQ_ACCESS_TOKEN}&q='portland'&format=json`);

  let formattedLocation = mungeUtils.mungeLocationData(locationData.body[0]);

  expect(formattedLocation).toEqual(expectation);
});
