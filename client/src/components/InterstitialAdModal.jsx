import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Play, SkipForward } from 'lucide-react';

export default function InterstitialAdModal({ isOpen, movieId, onClose }) {
  const [skipTimer, setSkipTimer] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (isOpen) {
      setSkipTimer(5);
      timer = setInterval(() => {
        setSkipTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen]);

  const handleSkip = () => {
    onClose();
    navigate(`/download/${movieId}`);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4"
      >
        <div className="relative w-full max-w-4xl bg-gray-900 rounded-2xl overflow-hidden border border-gray-700 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center bg-black p-4 border-b border-gray-800">
            <span className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Advertisement</span>
            
            {skipTimer > 0 ? (
              <span className="text-gray-400 font-medium">You can skip to download in {skipTimer}s...</span>
            ) : (
              <button 
                onClick={handleSkip}
                className="bg-primary hover:bg-primary/80 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-all hover:scale-105 animate-pulse"
              >
                Skip Ad <SkipForward size={18} />
              </button>
            )}
          </div>
          
          {/* Fake Video Ad Content */}
          <div className="relative w-full aspect-video bg-black flex flex-col items-center justify-center">
            {/* Using a placeholder tech/nature video or just text for simulation */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-gray-800">
              <Play size={64} className="text-gray-600 mb-4 opacity-50" />
              <h2 className="text-2xl font-bold text-gray-400 mb-2">Video Advertisement Playing...</h2>
              <p className="text-gray-500 max-w-md">
                (This is a placeholder for your video ad integration. A real video player would be embedded here.)
              </p>
            </div>
          </div>
          
          {/* Footer */}
          <div className="bg-black p-4 flex justify-between items-center border-t border-gray-800 text-sm text-gray-500">
            <span>Sponsored Content</span>
            <span>NemoFlix</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
