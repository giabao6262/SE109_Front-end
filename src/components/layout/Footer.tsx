import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, Mail, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';
import { useSubscriptionStore } from '../../store/subscriptionStore';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribeMessage, setSubscribeMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);
  const { subscribe } = useSubscriptionStore();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = subscribe(email);
    setSubscribeMessage(result.message);
    setMessageType(result.success ? 'success' : 'error');
    
    if (result.success) {
      setEmail('');
      // Clear message after 5 seconds
      setTimeout(() => {
        setSubscribeMessage('');
        setMessageType(null);
      }, 5000);
    }
  };

  return (
    <footer className="bg-[#0F172A] text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Newspaper className="h-8 w-8 text-[#F59E0B]" />
              <span className="text-xl font-bold text-white">FootballNews</span>
            </Link>
            <p className="text-sm mb-4">
              Your premier source for the latest football news, analysis, and updates from around the world.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#F59E0B] transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-[#F59E0B] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-[#F59E0B] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-[#F59E0B] transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-[#F59E0B] transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-[#F59E0B] transition-colors">Categories</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#F59E0B] transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#F59E0B] transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/categories/premier-league" className="hover:text-[#F59E0B] transition-colors">Premier League</Link>
              </li>
              <li>
                <Link to="/categories/la-liga" className="hover:text-[#F59E0B] transition-colors">La Liga</Link>
              </li>
              <li>
                <Link to="/categories/champions-league" className="hover:text-[#F59E0B] transition-colors">Champions League</Link>
              </li>
              <li>
                <Link to="/categories/world-cup" className="hover:text-[#F59E0B] transition-colors">World Cup</Link>
              </li>
              <li>
                <Link to="/categories/transfers" className="hover:text-[#F59E0B] transition-colors">Transfers</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4">Subscribe to Newsletter</h3>
            <p className="text-sm mb-4">
              Stay updated with the latest football news delivered directly to your inbox.
            </p>
            <form onSubmit={handleSubscribe}>
              <div className="flex flex-col space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-10 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#F59E0B] text-white py-2 px-4 rounded-md hover:bg-[#D97706] transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
            {subscribeMessage && (
              <p className={`mt-2 text-sm ${messageType === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                {subscribeMessage}
              </p>
            )}
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} FootballNews. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;