import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';

export default function CategorySlider({ title, fetchFn, type = 'movie' }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);

  useEffect(() => {
    fetchFn().then(res => {
      setItems(type === 'anime' ? res.data.data : res.data.results);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [fetchFn, type]);

  const slide = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -sliderRef.current.offsetWidth : sliderRef.current.offsetWidth;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (loading) return <div className="animate-pulse h-[350px] bg-gray-800 rounded-xl my-8"></div>;

  return (
    <div className="my-8 relative group">
      <h2 className="text-2xl font-bold text-white mb-4 px-4 border-l-4 border-primary">{title}</h2>
      
      <div className="relative">
        <button onClick={() => slide('left')} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-r-xl opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
          <ChevronLeft size={32} className="text-white hover:text-primary transition-colors" />
        </button>
        
        <div ref={sliderRef} className="flex gap-4 overflow-x-auto scrollbar-hide px-4 snap-x pb-4">
          {items.map(item => (
            <div key={item.id || item.mal_id} className="min-w-[200px] sm:min-w-[250px] snap-start">
              <MovieCard movie={item} type={type} />
            </div>
          ))}
        </div>
        
        <button onClick={() => slide('right')} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
          <ChevronRight size={32} className="text-white hover:text-primary transition-colors" />
        </button>
      </div>
    </div>
  );
}
