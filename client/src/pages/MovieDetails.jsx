import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Star, Clock, Calendar, Globe, Download } from 'lucide-react';
import { getMovieDetails, getBackdropUrl, getImageUrl } from '../services/tmdb';
import TrailerModal from '../components/TrailerModal';
import MovieCard from '../components/MovieCard';
import AdBanner from '../components/AdBanner';
import InterstitialAdModal from '../components/InterstitialAdModal';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    getMovieDetails(id)
      .then(res => {
        setMovie(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <div className="h-screen flex items-center justify-center animate-pulse"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  if (!movie) return <div className="pt-32 text-center text-white">Movie not found</div>;

  const trailer = movie.videos?.results?.find(vid => vid.type === 'Trailer' && vid.site === 'YouTube');
  const cast = movie.credits?.cast?.slice(0, 6) || [];
  const similar = movie.similar?.results?.slice(0, 6) || [];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pb-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[80vh] w-full">
        <div className="absolute inset-0 bg-black">
          <img src={getBackdropUrl(movie.backdrop_path)} alt={movie.title} className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-transparent"></div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full px-4 md:px-12 lg:px-24 pb-12 flex flex-col md:flex-row gap-8 items-end">
          <img src={getImageUrl(movie.poster_path)} alt={movie.title} className="hidden md:block w-64 rounded-xl shadow-2xl border border-gray-800" />
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-4">
              {movie.genres?.map(g => (
                <span key={g.id} className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold">{g.name}</span>
              ))}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">{movie.title}</h1>
            <p className="text-gray-400 italic mb-6">{movie.tagline}</p>
            
            <div className="flex flex-wrap gap-6 text-sm text-gray-300 mb-8">
              <span className="flex items-center gap-1"><Star size={16} className="text-yellow-500" /> {movie.vote_average?.toFixed(1)}</span>
              <span className="flex items-center gap-1"><Clock size={16} /> {movie.runtime} min</span>
              <span className="flex items-center gap-1"><Calendar size={16} /> {movie.release_date?.split('-')[0]}</span>
              <span className="flex items-center gap-1"><Globe size={16} /> {movie.original_language?.toUpperCase()}</span>
            </div>
            <div className="flex flex-wrap gap-4">
              {trailer && (
                <button onClick={() => setIsTrailerOpen(true)} className="bg-primary hover:bg-primary/80 text-white px-8 py-4 rounded-xl flex items-center gap-2 font-bold transition-all hover:scale-105 shadow-lg shadow-primary/30">
                  <Play fill="currentColor" size={20} /> Watch Trailer
                </button>
              )}
              {movie.download_url && (
                <button onClick={() => setIsAdModalOpen(true)} className="bg-gray-800 border border-gray-600 hover:bg-gray-700 text-white px-8 py-4 rounded-xl flex items-center gap-2 font-bold transition-all hover:scale-105 shadow-lg">
                  <Download size={20} /> Download Movie
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-12 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4 border-l-4 border-primary pl-4">Overview</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-12">{movie.overview}</p>
          
          <AdBanner type="horizontal" />
          
          <h2 className="text-2xl font-bold mb-6 mt-12 border-l-4 border-primary pl-4">Top Cast</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {cast.map(actor => (
              <div key={actor.id} className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
                <img src={getImageUrl(actor.profile_path)} alt={actor.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h4 className="font-bold text-white">{actor.name}</h4>
                  <p className="text-sm text-gray-500">{actor.character}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <AdBanner type="vertical" />
          
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 mt-8">
            <h3 className="font-bold text-lg mb-4 border-b border-gray-800 pb-2">Information</h3>
            <ul className="space-y-4 text-sm">
              <li><span className="text-gray-500 block">Status</span> <span className="text-white">{movie.status}</span></li>
              <li><span className="text-gray-500 block">Budget</span> <span className="text-white">${(movie.budget / 1000000).toFixed(1)}M</span></li>
              <li><span className="text-gray-500 block">Revenue</span> <span className="text-white">${(movie.revenue / 1000000).toFixed(1)}M</span></li>
            </ul>
          </div>
        </div>
      </div>
      
      {similar.length > 0 && (
        <div className="container mx-auto px-4 md:px-12 mt-20">
          <h2 className="text-2xl font-bold mb-6 border-l-4 border-primary pl-4">Similar Movies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {similar.map(item => (
              <MovieCard key={item.id} movie={item} type="movie" />
            ))}
          </div>
        </div>
      )}

      {trailer && <TrailerModal isOpen={isTrailerOpen} onClose={() => setIsTrailerOpen(false)} videoId={trailer.key} />}
      
      <InterstitialAdModal isOpen={isAdModalOpen} onClose={() => setIsAdModalOpen(false)} movieId={id} />
    </motion.div>
  );
}
