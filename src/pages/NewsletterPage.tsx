import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Bell, CheckCircle, Star } from 'lucide-react';

export const NewsletterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [preferences, setPreferences] = useState<string[]>([]);
  const [subscribed, setSubscribed] = useState(false);

  const topics = ['Breaking News', 'Politics', 'Technology', 'Business', 'Sports', 'Health', 'Science', 'Entertainment'];

  const togglePreference = (topic: string) => {
    setPreferences(prev => prev.includes(topic) ? prev.filter(p => p !== topic) : [...prev, topic]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E3A8A] via-blue-800 to-[#1F2937] flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full">
        <nav className="flex items-center gap-2 text-xs text-blue-300 mb-8">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-white">Newsletter</span>
        </nav>

        {subscribed ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center">
            <CheckCircle size={60} className="text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-gray-900 dark:text-white font-['Manrope'] mb-2">You're Subscribed! 🎉</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Welcome to the TalePulse community, {name || 'reader'}! You'll receive your first briefing tomorrow morning.</p>
            <Link to="/" className="bg-[#1E3A8A] hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block">
              Start Reading
            </Link>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8">
            <div className="text-center mb-8">
              <Bell size={32} className="text-[#DC2626] mx-auto mb-3" />
              <h1 className="text-3xl font-black text-gray-900 dark:text-white font-['Manrope']">
                The Pulse of Every Story
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Join 500,000+ readers. Get our daily briefing delivered to your inbox.
              </p>
            </div>

            <div className="flex justify-around mb-6 py-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              {[
                { value: '500K+', label: 'Subscribers' },
                { value: '4.9★', label: 'Rating' },
                { value: 'Daily', label: 'Delivery' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="font-black text-[#1E3A8A] dark:text-blue-400 font-['Manrope']">{value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-[#1E3A8A]/30 focus:border-[#1E3A8A]"
                  placeholder="Your first name (optional)" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address *</label>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-[#1E3A8A]/30 focus:border-[#1E3A8A]"
                  placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Topics of Interest</label>
                <div className="flex flex-wrap gap-2">
                  {topics.map(topic => (
                    <button type="button" key={topic} onClick={() => togglePreference(topic)}
                      className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                        preferences.includes(topic) ? 'bg-[#1E3A8A] text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}>
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
              <button type="submit" className="w-full bg-[#DC2626] hover:bg-red-700 text-white py-3 rounded-lg font-bold transition-colors">
                Subscribe Free — No Spam Ever
              </button>
              <p className="text-xs text-gray-400 text-center">By subscribing, you agree to our <Link to="/privacy" className="text-[#1E3A8A] dark:text-blue-400 hover:underline">Privacy Policy</Link>. Unsubscribe anytime.</p>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-1 justify-center mb-2">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-amber-400" fill="currentColor" />)}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center italic">
                "TalePulse's morning briefing is the first thing I read every day. Best news digest I've ever subscribed to."
              </p>
              <p className="text-xs text-gray-400 text-center mt-1">— Alex Thompson, Verified Reader</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
