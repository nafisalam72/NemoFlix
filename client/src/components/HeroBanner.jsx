import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTrendingMovies, getBackdropUrl } from '../services/tmdb';

export default function HeroBanner() {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    getTrendingMovies().then(res => {
      // Allow custom movies to appear in the Hero Banner
      const fetchedMovies = res.data.results;
      // Optionally shuffle them or just use the list
      setMovies(fetchedMovies);
      setCurrentIndex(Math.floor(Math.random() * fetchedMovies.length));
    });
  }, []);

  useEffect(() => {
    if (movies.length === 0) return;
    
    // Automatically change the banner every 10 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 10000);
    
    return () => clearInterval(interval);
  }, [movies]);

  const movie = movies[currentIndex];

  if (!movie) return <div className="h-[70vh] bg-gray-900 animate-pulse"></div>;

  return (
    <div className="relative h-[65vh] sm:h-[75vh] lg:h-[85vh] w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={movie.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="absolute inset-0 bg-black">
            <img 
              src={getBackdropUrl(movie.backdrop_path)} 
              alt={movie.title} 
              className="w-full h-full object-cover object-top sm:object-center opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 sm:via-black/50 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 sm:via-transparent to-transparent"></div>
          </div>
          
          <div className="absolute bottom-[10%] sm:bottom-[15%] lg:bottom-[20%] left-0 w-full px-4 sm:px-8 md:px-12 lg:px-24">
            <div className="max-w-xs sm:max-w-md lg:max-w-2xl">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-2 sm:mb-4 drop-shadow-lg leading-tight">{movie.title || movie.name}</h1>
              <p className="text-gray-300 text-xs sm:text-sm lg:text-lg mb-6 sm:mb-8 line-clamp-3 sm:line-clamp-4 drop-shadow-md">
                {movie.overview}
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <Link to={`/movie/${movie.id}`} className="bg-primary hover:bg-primary/80 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg flex items-center justify-center gap-2 font-bold text-sm sm:text-base transition-colors shadow-lg shadow-primary/30 w-full sm:w-auto">
                  <Play fill="currentColor" size={18} className="sm:w-5 sm:h-5" /> Watch Trailer
                </Link>
                <Link to={`/movie/${movie.id}`} className="bg-gray-600/60 hover:bg-gray-600/80 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg flex items-center justify-center gap-2 font-bold text-sm sm:text-base transition-colors backdrop-blur-md shadow-lg w-full sm:w-auto">
                  <Info size={18} className="sm:w-5 sm:h-5" /> More Info
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
