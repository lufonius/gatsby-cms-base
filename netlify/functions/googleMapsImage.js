const fetch = require('node-fetch');
require('dotenv').config();

exports.handler = async (event, context) => {
  // Restrict access to specific origins
  const allowedOrigins = ['localhost:8888', 'anonymousforanimalrights.ch', 'gatsby-cms-base.netlify.app'];
  const origin = event.headers.host;

  if (!allowedOrigins.includes(origin)) {
    return {
      statusCode: 403,
      body: 'Forbidden: Access is denied.',
    };
  }

  // Extract the 'location' parameter from the query string
  // const { location } = event.queryStringParameters;

  /*if (!location) {
    return {
      statusCode: 400,
      body: 'Bad Request: Missing location parameter.',
    };
  }*/

  // Google Maps Static API endpoint
  const googleMapsApiUrl = 'https://maps.googleapis.com/maps/api/staticmap';

  // have a map here that keeps all the possible combinations (400x400 => bellevue, 120x120x => bellevue) etc.

  const apiUrl = `${googleMapsApiUrl}?center=47.366498,8.544507&markers=47.366498,%208.544507&zoom=18&size=400x400&key=null&signature=MFUUl_iLtR9HZFssTPyQehQBhyA=`;

  try {
    const response = await fetch(apiUrl);
    const imageBuffer = await response.buffer();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/png'
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
