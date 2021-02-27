require('dotenv').config();
const request = require('superagent');
const mungeUtils = require('../lib/api-munge-utils.js');

test('returns location data in a presentable form', async() => {

  const expectation = {
    formatted_query: 'Portland, Multnomah, Oregon, USA',
    latitude: '45.5202471',
    longitude: '-122.6741949'
  };

  const locationData = await request.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATIONIQ_ACCESS_TOKEN}&q='portland'&format=json`);

  let formattedLocation = mungeUtils.mungeLocationData(locationData);

  expect(formattedLocation).toEqual(expectation);
});

test('returns weather data in a presentable form', async() => {

  const weatherData = await request.get(`https://api.weatherbit.io/v2.0/forecast/daily?&lat=45.5202471&lon=-122.6741949&key=${process.env.WEATHER_BIT_API_KEY}`);

  let formattedWeather = mungeUtils.mungeWeatherData(weatherData);
  let expectedShape = {
    'forecast': expect.any(String),
    'time': expect.any(String)
  };
  expect(formattedWeather).toEqual(expect.arrayContaining([expect.objectContaining(expectedShape)]));
});

test('returns review data in a presentable form', async() => {

  const reviewData = await request.get('https://api.yelp.com/v3/businesses/search?latitude=45.5202471&longitude=-122.6741949')
    .set({ 'Authorization': `Bearer ${process.env.YELP_API_KEY}` })
  ;

  let formattedReviews = mungeUtils.mungeReviewData(reviewData);
  let expectedShape =  {
    'name': expect.any(String),
    'image_url': expect.stringMatching(/\.(jpeg|jpg|gif|png)$/),
    'price': expect.stringMatching(/\$/),
    'rating': expect.stringContaining('.'),
    'url': expect.stringContaining('https://www.yelp.com')
  };
  expect(formattedReviews).toEqual(expect.arrayContaining([expect.objectContaining(expectedShape)]));
});

