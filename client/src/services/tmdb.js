import axios from 'axios';
import { customMovies } from '../data/customMovies';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY || 'dummy_key';
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

// Helper to inject custom movies into list results
const injectCustomMovies = async (apiCall) => {
  try {
    const response = await apiCall;
    if (response.data && response.data.results) {
      response.data.results = [...customMovies, ...response.data.results];
    }
    return response;
  } catch (error) {
    console.error(error);
    return { data: { results: customMovies } };
  }
};

// Only inject into trending so it doesn't flood every slider on the homepage
export const getTrendingMovies = () => injectCustomMovies(tmdbApi.get('/trending/movie/day'));
export const getPopularMovies = () => tmdbApi.get('/movie/popular');
export const getTopRatedMovies = () => tmdbApi.get('/movie/top_rated');
export const getUpcomingMovies = () => tmdbApi.get('/movie/upcoming');

export const getMovieDetails = async (id) => {
  if (id.toString().startsWith('custom-')) {
    const movie = customMovies.find(m => m.id === id);
    if (movie) {
      return {
        data: {
          ...movie,
          videos: {
            results: movie.trailer_key ? [{ type: 'Trailer', site: 'YouTube', key: movie.trailer_key }] : []
          },
          credits: { cast: [] },
          similar: { results: [] }
        }
      };
    }
  }
  return tmdbApi.get(`/movie/${id}`, { params: { append_to_response: 'videos,credits,recommendations,similar' } });
};

export const searchMovies = async (query) => {
  try {
    const response = await tmdbApi.get('/search/movie', { params: { query } });
    const q = query.toLowerCase();
    const matchingCustom = customMovies.filter(m => 
      m.title.toLowerCase().includes(q) || m.overview.toLowerCase().includes(q)
    );
    if (response.data && response.data.results) {
      response.data.results = [...matchingCustom, ...response.data.results];
    }
    return response;
  } catch (error) {
    const q = query.toLowerCase();
    const matchingCustom = customMovies.filter(m => 
      m.title.toLowerCase().includes(q) || m.overview.toLowerCase().includes(q)
    );
    return { data: { results: matchingCustom } };
  }
};

export const getMovieGenres = () => tmdbApi.get('/genre/movie/list');
export const getMoviesByGenre = (genreId) => tmdbApi.get('/discover/movie', { params: { with_genres: genreId } });

export const getImageUrl = (path, size = 'w500') => {
  if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
  if (path.startsWith('http')) return path;
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export const getBackdropUrl = (path, size = 'original') => {
  if (!path) return 'https://via.placeholder.com/1920x1080?text=No+Backdrop';
  if (path.startsWith('http')) return path;
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export default tmdbApi;
