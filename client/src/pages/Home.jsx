import { getTrendingMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies } from '../services/tmdb';
import { getTrendingAnime, getTopAnime } from '../services/jikan';
import CategorySlider from '../components/CategorySlider';
import AdBanner from '../components/AdBanner';
import HeroBanner from '../components/HeroBanner';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="pb-20"
    >
      <HeroBanner />
      
      <div className="container mx-auto px-4 mt-[-100px] relative z-20">
        <CategorySlider title="Trending Movies" fetchFn={getTrendingMovies} type="movie" />
        <AdBanner type="horizontal" />
        <CategorySlider title="Trending Anime" fetchFn={getTrendingAnime} type="anime" />
        <CategorySlider title="Popular Movies" fetchFn={getPopularMovies} type="movie" />
        <AdBanner type="horizontal" />
        <CategorySlider title="Top Rated Movies" fetchFn={getTopRatedMovies} type="movie" />
        <CategorySlider title="Top Anime" fetchFn={getTopAnime} type="anime" />
      </div>
    </motion.div>
  );
}
