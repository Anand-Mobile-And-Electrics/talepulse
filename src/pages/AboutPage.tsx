import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Globe, Shield, Zap, Award, Users, BarChart2 } from 'lucide-react';
import { authors } from '../data/mockData';

export const AboutPage: React.FC = () => (
  <div className="min-h-screen">
    {/* Hero */}
    <div className="bg-gradient-to-br from-[#1E3A8A] via-blue-800 to-[#1F2937] py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <nav className="flex items-center justify-center gap-2 text-xs text-blue-300 mb-6">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-white">About</span>
        </nav>
        <div className="flex items-center justify-center mb-6">
          <span className="text-white text-4xl font-black font-['Manrope']">Tale</span>
          <span className="text-[#DC2626] text-4xl font-black font-['Manrope']">Pulse</span>
        </div>
        <p className="text-2xl text-blue-200 font-medium">The Pulse of Every Story.</p>
        <p className="text-blue-300 mt-4 max-w-2xl mx-auto leading-relaxed">
          A modern, global news and storytelling platform committed to delivering accurate, timely, and impactful journalism to millions of readers worldwide.
        </p>
      </div>
    </div>

    {/* Stats */}
    <div className="bg-white dark:bg-gray-900 py-12 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '10M+', label: 'Monthly Readers', icon: Users },
            { value: '500K+', label: 'Newsletter Subscribers', icon: Zap },
            { value: '50+', label: 'Countries Covered', icon: Globe },
            { value: '12+', label: 'Years of Journalism', icon: Award },
          ].map(({ value, label, icon: Icon }) => (
            <div key={label}>
              <Icon size={28} className="mx-auto text-[#DC2626] mb-2" />
              <p className="text-3xl font-black text-gray-900 dark:text-white font-['Manrope']">{value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Mission */}
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-[#DC2626] rounded-full" />
            <h2 className="text-3xl font-black text-gray-900 dark:text-white font-['Manrope']">Our Mission</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            TalePulse was founded on a simple but powerful belief: every story deserves to be told with accuracy, depth, and humanity. In a world of information overload, we cut through the noise to deliver what truly matters.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            From breaking news to long-form investigative journalism, from human-interest stories to expert opinion, TalePulse is where informed citizens come to understand the world around them.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: Shield, label: 'Editorial Independence' },
              { icon: BarChart2, label: 'Data-Driven' },
              { icon: Globe, label: 'Global Perspective' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="text-center p-3 bg-blue-50 dark:bg-gray-800 rounded-xl">
                <Icon size={20} className="mx-auto text-[#1E3A8A] mb-2" />
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop" alt="Newsroom" className="rounded-2xl object-cover w-full h-40 md:h-56" />
          <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop" alt="Journalists" className="rounded-2xl object-cover w-full h-40 md:h-56 mt-6" />
        </div>
      </div>
    </div>

    {/* Values */}
    <div className="bg-gray-50 dark:bg-gray-950 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-gray-900 dark:text-white font-['Manrope']">Our Core Values</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Truth & Accuracy', desc: 'Every fact is verified. Every source is checked. We never publish until we are confident in the accuracy of our reporting.', emoji: '🎯' },
            { title: 'Fearless Journalism', desc: 'We speak truth to power. Our journalists operate with complete editorial independence, free from political or commercial pressure.', emoji: '⚡' },
            { title: 'Speed & Reliability', desc: 'When news breaks, we are first. But speed never compromises our commitment to accuracy and responsible reporting.', emoji: '🚀' },
            { title: 'Global Diversity', desc: 'Voices from every continent. Stories from every culture. TalePulse reflects the beautiful diversity of our world.', emoji: '🌍' },
            { title: 'Reader First', desc: 'Everything we do is for our readers. Clean design, fast loading, no clickbait, no sensationalism—just great journalism.', emoji: '💙' },
            { title: 'Innovation', desc: 'We embrace technology to tell better stories. From immersive multimedia to AI-assisted research, we are always evolving.', emoji: '🔬' },
          ].map(({ title, desc, emoji }) => (
            <div key={title} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
              <span className="text-3xl mb-3 block">{emoji}</span>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 font-['Manrope']">{title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Team */}
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black text-gray-900 dark:text-white font-['Manrope']">Meet Our Team</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">World-class journalists covering every corner of the globe.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {authors.map(author => (
          <Link key={author.id} to={`/author/${author.slug}`} className="group">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all hover:border-[#1E3A8A]/30">
              <div className="flex items-center gap-4 mb-4">
                <img src={author.avatar} alt={author.name} className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-[#1E3A8A] dark:group-hover:text-blue-400 transition-colors font-['Manrope']">{author.name}</h3>
                  <p className="text-xs text-[#DC2626] font-semibold">{author.role}</p>
                  <p className="text-xs text-gray-400">{author.articlesCount} articles</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{author.bio}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>

    {/* Contact CTA */}
    <div className="bg-[#1E3A8A] py-12 text-center">
      <div className="max-w-xl mx-auto px-4">
        <h2 className="text-2xl font-black text-white font-['Manrope'] mb-3">Get in Touch</h2>
        <p className="text-blue-200 mb-6">Have a story tip, feedback, or a question? We'd love to hear from you.</p>
        <Link to="/contact" className="bg-[#DC2626] hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
          Contact Us
        </Link>
      </div>
    </div>
  </div>
);
