import { motion } from 'framer-motion';

export default function Terms() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-32 pb-20 container mx-auto px-4 md:px-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
      <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 text-gray-300 space-y-6">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Acceptance of Terms</h2>
        <p>By accessing NemoFlix, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.</p>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Use License</h2>
        <p>NemoFlix is intended for personal, non-commercial use. The platform provides metadata, imagery, and links to official trailers for educational and informational purposes.</p>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Copyright & Content</h2>
        <p>All movie and anime data, including posters, backdrops, and synopses, belong to their respective copyright holders. NemoFlix does not claim ownership over any of the media displayed.</p>
      </div>
    </motion.div>
  );
}
