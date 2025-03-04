const fetch = require('node-fetch');

exports.handler = async (event) => {
  const apiKey = process.env.TMDB_API_KEY; //Environment variable, store API key here

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing API key' }),
    };
  }

  try {
    const searchTerm = event.queryStringParameters.search; //get search term from URL
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
