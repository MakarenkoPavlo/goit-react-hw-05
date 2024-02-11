import axios from 'axios';

const API_KEY = '5ff1b381c3480fe3e3c0d58c583fdcc9';

export const fetchTrending = async () => {
  const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';

  const options = {
    params: {
      api_key: API_KEY,
    },
  };``
  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.error("Oops, try again.");
    throw error;
  }
};

export const fetchMovieDetails = async movieId => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;

  const options = {
    params: {
      api_key: API_KEY,
    },
  };``
  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.error("Oops, try again.");
    throw error;
  }
};