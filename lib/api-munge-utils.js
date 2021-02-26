function mungeLocationData(locationData) {
  let highestLocation = locationData.body[0];
  return {
    formatted_query: highestLocation.display_name,
    latitude: highestLocation.lat, 
    longitude: highestLocation.lon
  };

}

function mungeWeatherData(weatherData) {
  return weatherData.body.data.map(weatherObj => {
    return {
      forecast: weatherObj.weather.description,
      time: new Date(weatherObj.ts * 1000).toDateString()
    };
  });
}

function mungeReviewData() {
    return null;
}

exports.mungeLocationData = mungeLocationData;
exports.mungeWeatherData = mungeWeatherData;
exports.mungeReviewData = mungeReviewData;