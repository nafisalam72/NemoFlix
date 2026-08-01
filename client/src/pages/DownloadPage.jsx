import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download as DownloadIcon, ArrowLeft } from 'lucide-react';
import { getMovieDetails, getImageUrl } from '../services/tmdb';
import AdBanner from '../components/AdBanner';

export default function DownloadPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    // Fetch movie details to make the page look authentic
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

  useEffect(() => {
    // Start countdown
    if (countdown > 0 && !loading) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown, loading]);

  if (loading) return <div className="h-screen flex items-center justify-center animate-pulse"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  if (!movie || !movie.download_url) return <div className="pt-32 text-center text-white">Download link not available</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-32 pb-20 container mx-auto px-4 md:px-12 max-w-4xl">
      <Link to={`/movie/${id}`} className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors mb-8">
        <ArrowLeft size={20} /> Back to Movie
      </Link>
      
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8 text-center shadow-2xl">
        <h1 className="text-3xl font-bold text-white mb-4">Download {movie.title}</h1>
        
        <div className="flex justify-center mb-8">
          <img src={getImageUrl(movie.poster_path)} alt={movie.title} className="w-48 rounded-xl shadow-lg border border-gray-800" />
        </div>

        <AdBanner type="horizontal" />

        <div className="my-12">
          {countdown > 0 ? (
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full border-4 border-gray-800 flex items-center justify-center mb-4">
                <span className="text-4xl font-bold text-primary">{countdown}</span>
              </div>
              <p className="text-gray-400 text-lg">Please wait while your link is being generated...</p>
            </div>
          ) : (
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center">
              <p className="text-green-500 font-bold text-xl mb-4">Your link is ready!</p>
              <a 
                href={movie.download_url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-primary hover:bg-primary/80 text-white px-10 py-4 rounded-xl flex items-center gap-3 font-bold transition-all hover:scale-105 shadow-lg shadow-primary/30 text-lg"
              >
                <DownloadIcon size={24} /> Get File Now
              </a>
            </motion.div>
          )}
        </div>

        <AdBanner type="horizontal" />
        
        <p className="text-gray-500 text-sm mt-8 px-4">
          Note: This file is hosted on a third-party server. We do not host any copyrighted material.
        </p>
      </div>
    </motion.div>
  );
}
