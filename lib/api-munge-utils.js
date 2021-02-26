function mungeLocationData(locationData) {
  let highestLocation = locationData.body[0];
  return {
    formatted_query: highestLocation.display_name,
    latitude: highestLocation.lat, 
    longitude: highestLocation.lon
  };

}

function mungeWeatherData() {
    return null;
}

function mungeReviewData() {
    return null;
}

exports.mungeLocationData = mungeLocationData;
exports.mungeWeatherData = mungeWeatherData;
exports.mungeReviewData = mungeReviewData;