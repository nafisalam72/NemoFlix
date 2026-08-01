import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Star, List, Tv, Users } from 'lucide-react';
import { getAnimeDetails, getAnimeCharacters } from '../services/jikan';
import TrailerModal from '../components/TrailerModal';
import AdBanner from '../components/AdBanner';

export default function AnimeDetails() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([getAnimeDetails(id), getAnimeCharacters(id)])
      .then(([animeRes, charRes]) => {
        setAnime(animeRes.data.data);
        setCharacters(charRes.data.data.slice(0, 6));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <div className="h-screen flex items-center justify-center animate-pulse"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  if (!anime) return <div className="pt-32 text-center text-white">Anime not found</div>;

  const trailerId = anime.trailer?.youtube_id;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pb-20">
      <div className="relative h-[60vh] md:h-[80vh] w-full">
        <div className="absolute inset-0 bg-black">
          <img src={anime.trailer?.images?.maximum_image_url || anime.images?.jpg?.large_image_url} alt={anime.title} className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-transparent"></div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full px-4 md:px-12 lg:px-24 pb-12 flex flex-col md:flex-row gap-8 items-end">
          <img src={anime.images?.jpg?.large_image_url} alt={anime.title} className="hidden md:block w-64 rounded-xl shadow-2xl border border-gray-800" />
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-4">
              {anime.genres?.map(g => (
                <span key={g.mal_id} className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold">{g.name}</span>
              ))}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">{anime.title}</h1>
            <p className="text-gray-400 italic mb-6">{anime.title_english}</p>
            
            <div className="flex flex-wrap gap-6 text-sm text-gray-300 mb-8">
              <span className="flex items-center gap-1"><Star size={16} className="text-yellow-500" /> {anime.score}</span>
              <span className="flex items-center gap-1"><List size={16} /> {anime.episodes} Episodes</span>
              <span className="flex items-center gap-1"><Tv size={16} /> {anime.type}</span>
              <span className="flex items-center gap-1"><Users size={16} /> {anime.rating}</span>
            </div>
            
            {trailerId && (
              <button onClick={() => setIsTrailerOpen(true)} className="bg-primary hover:bg-primary/80 text-white px-8 py-4 rounded-xl flex items-center gap-2 font-bold transition-all hover:scale-105">
                <Play fill="currentColor" size={20} /> Watch Trailer
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-12 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4 border-l-4 border-primary pl-4">Synopsis</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-12">{anime.synopsis}</p>
          
          <AdBanner type="horizontal" />
          
          <h2 className="text-2xl font-bold mb-6 mt-12 border-l-4 border-primary pl-4">Characters</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {characters.map(char => (
              <div key={char.character.mal_id} className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 flex items-center gap-4">
                <img src={char.character.images?.jpg?.image_url} alt={char.character.name} className="w-20 h-24 object-cover" />
                <div className="p-2">
                  <h4 className="font-bold text-white text-sm">{char.character.name}</h4>
                  <p className="text-xs text-gray-500">{char.role}</p>
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
              <li><span className="text-gray-500 block">Status</span> <span className="text-white">{anime.status}</span></li>
              <li><span className="text-gray-500 block">Aired</span> <span className="text-white">{anime.aired?.string}</span></li>
              <li><span className="text-gray-500 block">Studios</span> <span className="text-white">{anime.studios?.map(s => s.name).join(', ')}</span></li>
            </ul>
          </div>
        </div>
      </div>

      {trailerId && <TrailerModal isOpen={isTrailerOpen} onClose={() => setIsTrailerOpen(false)} videoId={trailerId} />}
    </motion.div>
  );
}
