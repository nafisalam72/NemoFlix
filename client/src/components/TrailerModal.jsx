import { X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TrailerModal({ isOpen, onClose, videoId }) {
  if (!isOpen || !videoId) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <div className="w-full max-w-5xl flex justify-end mb-4" onClick={(e) => e.stopPropagation()}>
        <button 
          onClick={onClose}
          className="text-white hover:text-primary transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full"
        >
          <X size={32} />
        </button>
      </div>
      <div 
        className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden border border-gray-800 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="Trailer"
          className="w-full h-full"
          allowFullScreen
          allow="autoplay; encrypted-media"
        ></iframe>
      </div>
    </motion.div>
  );
}
