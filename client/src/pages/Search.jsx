import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search as SearchIcon } from 'lucide-react';
import { searchMovies } from '../services/tmdb';
import { searchAnime } from '../services/jikan';
import MovieCard from '../components/MovieCard';
import AdBanner from '../components/AdBanner';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const type = searchParams.get('type') || 'movie';
  
  const [inputValue, setInputValue] = useState(query);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    
    setLoading(true);
    if (type === 'movie') {
      searchMovies(query).then(res => {
        setResults(res.data.results);
        setLoading(false);
      }).catch(() => setLoading(false));
    } else {
      searchAnime(query).then(res => {
        setResults(res.data.data);
        setLoading(false);
      }).catch(() => setLoading(false));
    }
  }, [query, type]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setSearchParams({ q: inputValue, type });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24 pb-20 container mx-auto px-4 md:px-12">
      <div className="max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl font-bold mb-6 text-center">Discover Amazing {type === 'movie' ? 'Movies' : 'Anime'}</h1>
        
        <div className="flex justify-center gap-4 mb-6">
          <button 
            onClick={() => setSearchParams({ q: query, type: 'movie' })}
            className={`px-6 py-2 rounded-full font-semibold transition-colors ${type === 'movie' ? 'bg-primary text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
          >
            Movies
          </button>
          <button 
            onClick={() => setSearchParams({ q: query, type: 'anime' })}
            className={`px-6 py-2 rounded-full font-semibold transition-colors ${type === 'anime' ? 'bg-primary text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
          >
            Anime
          </button>
        </div>

        <form onSubmit={handleSearch} className="relative">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`Search for ${type === 'movie' ? 'movies' : 'anime'}...`}
            className="w-full bg-gray-900 border border-gray-700 text-white px-6 py-4 rounded-full pl-14 focus:outline-none focus:border-primary transition-colors text-lg"
          />
          <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
          <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white px-6 py-2 rounded-full font-semibold hover:bg-primary/80 transition-colors">
            Search
          </button>
        </form>
      </div>

      <AdBanner type="horizontal" />

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-12">
          {results.map(item => (
            <MovieCard key={item.id || item.mal_id} movie={item} type={type} />
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-20 text-gray-400">
          <h2 className="text-2xl mb-2">No results found for "{query}"</h2>
          <p>Try adjusting your search or switching categories.</p>
        </div>
      ) : null}
    </motion.div>
  );
}
