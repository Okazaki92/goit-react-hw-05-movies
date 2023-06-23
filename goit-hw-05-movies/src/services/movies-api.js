import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
axios.defaults.params = {};
axios.defaults.params.api_key = API_KEY;
axios.defaults.params.language = "en-US";

export const getTrendingMovies = async () => {
  const response = await axios.get(`trending/movie/day?`);
  return response.data.results;
};

export const getQueryMovies = async (query) => {
  const response = await axios.get(
    `search/movie?page=1&include_adult=false&query=${query}`
  );
  return response.data.results;
};

export const getMovieDetails = async (movieId) => {
  const response = await axios.get(`movie/${movieId}?`);
  return response.data;
};

export const getMovieCredits = async (movieId) => {
  const response = await axios.get(`movie/${movieId}/credits?`);
  return response.data.cast;
};

export const getMovieReviews = async (movieId) => {
  const response = await axios.get(`movie/${movieId}/reviews?page=1`);
  return response.data.results;
};
