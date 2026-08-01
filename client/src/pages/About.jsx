import { motion } from 'framer-motion';

export default function About() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-32 pb-20 container mx-auto px-4 md:px-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">About NemoFlix</h1>
      <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 text-gray-300 space-y-6 text-lg leading-relaxed">
        <p>
          Welcome to <strong className="text-white">NemoFlix</strong>, your premium destination for discovering movies and anime from around the world.
        </p>
        <p>
          Our mission is to provide a seamless, modern, and high-quality user interface for browsing your favorite content. We leverage powerful public APIs to bring you the latest trending titles, top-rated classics, and in-depth details about the media you love.
        </p>
        <p>
          NemoFlix operates completely legally. We do not host any video files or stream copyrighted content. All media information, images, and official trailers are provided by trusted third-party services like TMDB (The Movie Database) and Jikan (MyAnimeList API).
        </p>
      </div>
    </motion.div>
  );
}
