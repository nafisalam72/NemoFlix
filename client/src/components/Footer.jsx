import { Link } from 'react-router-dom';
import { Github, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black py-12 mt-auto border-t border-gray-900">
      <div className="container mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Link to="/" className="text-primary text-3xl font-bold tracking-tighter mb-4 inline-block">Nemo<span className="text-white">Flix</span></Link>
          <p className="text-gray-500 text-sm mb-4">Your premium destination for discovering movies and anime. Built with passion.</p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Github size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Twitter size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Instagram size={20} /></a>
          </div>
        </div>
        
        <div>
          <h3 className="text-white font-semibold mb-4">Navigation</h3>
          <ul className="flex flex-col gap-2 text-gray-500 text-sm">
            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link to="/search?type=movie" className="hover:text-primary transition-colors">Movies</Link></li>
            <li><Link to="/search?type=anime" className="hover:text-primary transition-colors">Anime</Link></li>
            <li><Link to="/search" className="hover:text-primary transition-colors">Search</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Legal</h3>
          <ul className="flex flex-col gap-2 text-gray-500 text-sm">
            <li><Link to="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            <li><Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link to="#" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Disclaimer</h3>
          <p className="text-gray-500 text-sm">
            NemoFlix does not host any files on its servers. All contents are provided by non-affiliated third parties (TMDB, Jikan).
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-12 mt-12 pt-8 border-t border-gray-900 text-center text-gray-600 text-sm">
        &copy; {new Date().getFullYear()} NemoFlix. All rights reserved.
      </div>
    </footer>
  );
}
