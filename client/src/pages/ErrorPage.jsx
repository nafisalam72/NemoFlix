import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ErrorPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col items-center justify-center pt-32 pb-20 text-center">
      <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-white mb-6">Page Not Found</h2>
      <p className="text-gray-400 max-w-md mx-auto mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="bg-primary hover:bg-primary/80 text-white px-8 py-3 rounded-full font-bold transition-colors">
        Go Back Home
      </Link>
    </motion.div>
  );
}
