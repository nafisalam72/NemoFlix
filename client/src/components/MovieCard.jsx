import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getImageUrl } from '../services/tmdb';
import { Star } from 'lucide-react';

export default function MovieCard({ movie, type = 'movie' }) {
  if (!movie) return null;
  
  const id = type === 'anime' ? movie.mal_id : movie.id;
  const title = type === 'anime' ? movie.title : movie.title || movie.name;
  const posterPath = type === 'anime' ? movie.images?.jpg?.image_url : getImageUrl(movie.poster_path);
  const rating = type === 'anime' ? movie.score : movie.vote_average;
  const link = type === 'anime' ? `/anime/${id}` : `/movie/${id}`;
  
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative group rounded-xl overflow-hidden cursor-pointer"
    >
      <Link to={link}>
        <img src={posterPath} alt={title} className="w-full h-[350px] object-cover transition-transform duration-300" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h3 className="text-white font-bold text-lg truncate">{title}</h3>
          <div className="flex items-center text-primary mt-1">
            <Star size={16} fill="currentColor" />
            <span className="text-white ml-1 text-sm font-medium">{rating ? rating.toFixed(1) : 'N/A'}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
