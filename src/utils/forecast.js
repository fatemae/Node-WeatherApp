const request = require("request");

const forecast = (lat, long, callback) => {
    const url =
      "http://api.weatherstack.com/current?access_key=0322f4bd4270dc96326191e915bdf2e6&query="+lat+","+long+"&units=f";
    request({ url, json: true }, (error, {body}) => {
      // const data = JSON.parse(response.body);
      if (error) {
        callback("Unable to connect to weather service.", undefined);
      } else if (body.error) {
        callback("Unable to find location.", undefined);
      } else {
        const {weather_descriptions, temperature, feelslike, humidity} = body.current;
        callback(undefined,
          weather_descriptions[0] +
            ". It is currently " +
            temperature +
            " degrees out. It feels like " +
            feelslike +
            " degrees out. The humidity is "+
            humidity + "%."
        );
      }
    });
  };

  module.exports = forecast
  