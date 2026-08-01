import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-32 pb-20 container mx-auto px-4 md:px-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 text-gray-300 space-y-6">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Information Collection</h2>
        <p>NemoFlix respects your privacy. We do not require you to create an account, and we do not collect personal data beyond what is voluntarily provided via contact forms.</p>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Cookies</h2>
        <p>We may use cookies for basic functionality and to store user preferences such as theme settings. We also use third-party analytics which may set their own cookies.</p>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Third-Party Services</h2>
        <p>Our website utilizes APIs from TMDB and Jikan. These services may collect information as described in their respective privacy policies.</p>
      </div>
    </motion.div>
  );
}
