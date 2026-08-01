import axios from 'axios';

const BASE_URL = 'https://api.jikan.moe/v4';

const jikanApi = axios.create({
  baseURL: BASE_URL,
});

export const getTrendingAnime = () => jikanApi.get('/seasons/now');
export const getTopAnime = () => jikanApi.get('/top/anime');
export const getAnimeDetails = (id) => jikanApi.get(`/anime/${id}/full`);
export const getAnimeCharacters = (id) => jikanApi.get(`/anime/${id}/characters`);
export const searchAnime = (query) => jikanApi.get('/anime', { params: { q: query } });

export default jikanApi;
