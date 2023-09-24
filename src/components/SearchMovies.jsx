import axios from 'axios';
import noPhoto from '../components/Images/noImages.png';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.params = {
  api_key: 'd3144e85ee72b64927195b1f7c37d3bd',
  include_adult: false,
};

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

export const searchTranding = async () => {
  return axios
    .get(`/trending/all/day?`)
    .then(({ data: { results } }) =>
      results.map(({ id, title, poster_path: poster }) => ({
        id,
        title,
        poster: IMG_URL + poster,
      }))
    )
    .catch(error => {
      console.log(error.message);
    });
};

export const searchByName = async name => {
  return axios
    .get(`/search/movie?query=${name}`)
    .then(({ data: { results } }) =>
      results.map(({ id, title, poster_path: poster }) => ({
        id,
        title,
        poster: IMG_URL + poster,
      }))
    )
    .catch(error => {
      console.log(error.message);
    });
};

export const searchMovieDetails = movieId => {
  return axios
    .get(`/movie/${movieId}?`)
    .then(
      ({
        data: {
          id,
          poster_path: poster,
          title,
          release_date: releaseYear,
          vote_average: userScore,
          overview,
          genres,
        },
      }) => ({
        id,
        poster: IMG_URL + poster,
        title,
        releaseYear: new Date(releaseYear).getFullYear(),
        userScore: Math.round(userScore * 10),
        overview,
        genres,
      })
    )
    .catch(error => {
      console.log(error.message);
    });
};

export const searchMovieCredits = movieId => {
  return axios
    .get(`/movie/${movieId}/credits?`)
    .then(({ data: { cast } }) =>
      cast.map(({ id, name, character, profile_path: photo }) => ({
        id,
        name,
        character,
        photo: photo ? IMG_URL + photo : noPhoto,
      }))
    )
    .catch(error => {
      console.log(error.message);
    });
};

export const searchMovieReviews = movieId => {
  return axios
    .get(`/movie/${movieId}/reviews?`)
    .then(({ data: { results } }) =>
      results.map(({ id, author, content }) => ({
        id,
        author,
        content,
      }))
    )
    .catch(error => {
      console.log(error.message);
    });
};
