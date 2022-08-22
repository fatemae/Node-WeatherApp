const request = require("request");

const geocode = (address, callback) => {
    const mapURL =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      encodeURIComponent(address) +
      ".json?access_token=pk.eyJ1IjoiZmF0ZW1hZSIsImEiOiJjazd0Ymw2N3MwN3hxM21wMHR0MG95a3E3In0.CHm0tNrbl7UMNQidwHfA_Q&limit=1";
    request({ url: mapURL, json: true }, (error, {body}) => {
      if (error) {
        callback("Unable to connect to MapBox service.", undefined);
      } else if (body.features.length === 0) {
        callback("Unable to find the location.", undefined);
      } else {
        const latlong = body.features[0].center;
        callback(undefined, {
          latitude: latlong[1],
          longitude: latlong[0],
          location: body.features[0].place_name
        });
      }
    });
  };

  module.exports = geocode;


  // const mapURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiZmF0ZW1hZSIsImEiOiJjazd0Ymw2N3MwN3hxM21wMHR0MG95a3E3In0.CHm0tNrbl7UMNQidwHfA_Q&limit=1";
// request({url: mapURL, json: true}, (error, response) => {
//     if(error){
//         console.log("Unable to connect to MapBox service.")
//     }else if(response.body.features.length===0){
//         console.log("Unable to find the location.")
//     }else{
//         const latlong = response.body.features[0].center;
//         console.log("Latitude:"+latlong[1]+" , Longitude:"+latlong[0]);
//     }

// })

  