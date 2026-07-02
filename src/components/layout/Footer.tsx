import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, MapPin, Phone } from 'lucide-react';

const Logo = () => (
  <div className="flex items-center">
    <span className="text-2xl font-black tracking-tight text-white font-['Manrope']">Tale</span>
    <span className="text-2xl font-black tracking-tight text-[#DC2626] font-['Manrope']">Pulse</span>
    <div className="ml-1 flex items-end pb-1">
      <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
        <path d="M0 7 L3 7 L5 2 L7 12 L9 5 L11 9 L13 7 L20 7" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    </div>
  </div>
);

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#1F2937] text-white">
      {/* Newsletter Band */}
      <div className="bg-[#1E3A8A] py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold font-['Manrope']">Stay Ahead of Every Story</h3>
              <p className="text-blue-200 mt-1">Get breaking news and top stories delivered to your inbox.</p>
            </div>
            {subscribed ? (
              <div className="bg-blue-800 text-blue-100 px-6 py-3 rounded-lg font-medium">
                ✓ You're subscribed! Thank you.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 md:w-72 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 outline-none focus:bg-white/20 transition-colors"
                />
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-[#DC2626] hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap"
                >
                  Subscribe <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Logo />
            <p className="text-gray-400 mt-3 text-sm leading-relaxed max-w-xs">
              TalePulse is your trusted source for breaking news, in-depth stories, and insightful articles from around the world. The Pulse of Every Story.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {[
                { href: 'https://twitter.com/talepulse', label: '𝕏', hoverBg: 'hover:bg-[#1E3A8A]' },
                { href: 'https://facebook.com/talepulse', label: 'f', hoverBg: 'hover:bg-[#1E3A8A]' },
                { href: 'https://linkedin.com/company/talepulse', label: 'in', hoverBg: 'hover:bg-[#1E3A8A]' },
                { href: 'https://youtube.com/talepulse', label: '▶', hoverBg: 'hover:bg-[#DC2626]' },
                { href: 'https://instagram.com/talepulse', label: '◎', hoverBg: 'hover:bg-pink-600' },
              ].map(({ href, label, hoverBg }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  className={`w-9 h-9 bg-gray-700 ${hoverBg} rounded-full flex items-center justify-center transition-colors text-sm font-bold`}>
                  {label}
                </a>
              ))}
            </div>
            <div className="mt-5 space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[#DC2626] flex-shrink-0" />
                <span>100 Media Drive, New York, NY 10001</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#DC2626] flex-shrink-0" />
                <a href="mailto:news@talepulse.com" className="hover:text-white transition-colors">news@talepulse.com</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#DC2626] flex-shrink-0" />
                <span>+1 (800) TALE-PULSE</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Categories</h4>
            <ul className="space-y-2.5">
              {['Politics', 'Technology', 'Business', 'Sports', 'Entertainment', 'Health', 'Science', 'Opinion'].map(cat => (
                <li key={cat}>
                  <Link to={`/category/${cat.toLowerCase()}`}
                    className="text-sm text-gray-400 hover:text-[#DC2626] transition-colors flex items-center gap-2 group">
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#DC2626]" />
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sections */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Sections</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Breaking News', href: '/breaking' },
                { label: 'Trending', href: '/trending' },
                { label: 'Latest News', href: '/latest' },
                { label: 'Stories', href: '/stories' },
                { label: 'Articles', href: '/articles' },
                { label: 'World News', href: '/category/world' },
                { label: 'Editor\'s Pick', href: '/editors-pick' },
                { label: 'Newsletter', href: '/newsletter' },
              ].map(item => (
                <li key={item.label}>
                  <Link to={item.href}
                    className="text-sm text-gray-400 hover:text-[#DC2626] transition-colors flex items-center gap-2 group">
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#DC2626]" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'About TalePulse', href: '/about' },
                { label: 'Our Team', href: '/authors' },
                { label: 'Careers', href: '/careers' },
                { label: 'Advertise', href: '/advertise' },
                { label: 'Contact Us', href: '/contact' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
                { label: 'Disclaimer', href: '/disclaimer' },
              ].map(item => (
                <li key={item.label}>
                  <Link to={item.href}
                    className="text-sm text-gray-400 hover:text-[#DC2626] transition-colors flex items-center gap-2 group">
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#DC2626]" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} TalePulse. All rights reserved. The Pulse of Every Story.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-gray-300 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-gray-300 transition-colors">Terms</Link>
            <Link to="/disclaimer" className="hover:text-gray-300 transition-colors">Disclaimer</Link>
            <Link to="/sitemap" className="hover:text-gray-300 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
