const fetch = require('node-fetch');
require('dotenv').config();

exports.handler = async (event, context) => {
  // Restrict access to specific origins
  const allowedOrigins = ['localhost:8000', 'anonymousforanimalrights.ch', 'gatsby-cms-base.netlify.app'];
  const host = event.headers.host;

  if (!allowedOrigins.includes(host)) {
    return {
      statusCode: 403,
      body: 'Forbidden: Access is denied.',
    };
  }

  const referer = event.headers.referer;
  const foundAllowedOrigin = allowedOrigins.find((allowedOrigin) => {
    return referer.includes(allowedOrigin);
  });

  if (!foundAllowedOrigin) {
    return {
      statusCode: 403,
      body: 'Forbidden: Access is denied.',
    };
  }

  // Google Maps Static API endpoint
  const googleMapsApiUrl = 'https://maps.googleapis.com/maps/api/staticmap';

  // have a map here that keeps all the possible combinations (400x400 => bellevue, 120x120x => bellevue) etc.
  const sizesByType = {
    "thumbnailMobile": "120x120",
    "thumbnailDesktop": "400x400",
    "full": "800x800"
  };

  const locationCoordinates = {
    "bellevue": "47.366498,8.544507",
    "zueghusplatz": "47.370140,8.539364",
    "hirschenplatz": "47.373345,8.543805",
    "igelweid": "47.391979,8.046259",
    "schifflaende": "47.5596752,7.5886046"
  };

  const zoomByType = {
    "thumbnailMobile": "17",
    "thumbnailDesktop": "19",
    "full": "18"
  };

  const { mapType, location } = event.queryStringParameters;

  if (!(sizesByType[mapType] && locationCoordinates[location] && zoomByType[mapType])) {
    return {
      statusCode: 400,
      body: 'Bad Request: Input params invalid',
    };
  }

  const apiUrl = `${googleMapsApiUrl}?center=${locationCoordinates[location]}&markers=${locationCoordinates[location]}&zoom=${zoomByType[mapType]}&size=${sizesByType[mapType]}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

  try {
    const response = await fetch(apiUrl);
    const imageBuffer = await response.buffer();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'max-age=2592000, immutable',
        'Access-Control-Allow-Origin': foundAllowedOrigin
      },
      body: imageBuffer.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: 'Internal Server Error: Unable to fetch the map image.',
    };
  }
};
