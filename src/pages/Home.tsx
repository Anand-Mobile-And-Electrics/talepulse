import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Zap, Star, ArrowRight, Clock, Eye } from 'lucide-react';
import { BreakingNewsTicker } from '../components/ui/BreakingNewsTicker';
import { ArticleCard } from '../components/ui/ArticleCard';
import { Sidebar } from '../components/ui/Sidebar';
import { AdBanner } from '../components/ui/AdBanner';
import {
  getFeaturedPosts, getTrendingPosts, getEditorPicks,
  getPostsByCategory, posts, categories
} from '../data/mockData';
import { formatRelativeDate, formatViews } from '../utils';

const SectionHeader: React.FC<{ title: string; subtitle?: string; href?: string; icon?: React.ReactNode; accent?: string }> = ({
  title, subtitle, href, icon, accent = 'bg-[#DC2626]'
}) => (
  <div className="flex items-end justify-between mb-5">
    <div className="flex items-center gap-3">
      <div className={`w-1 h-8 ${accent} rounded-full`} />
      <div>
        <div className="flex items-center gap-2">
          {icon && <span className="text-[#DC2626]">{icon}</span>}
          <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white font-['Manrope']">{title}</h2>
        </div>
        {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
    </div>
    {href && (
      <Link to={href} className="flex items-center gap-1.5 text-sm text-[#1E3A8A] dark:text-blue-400 font-semibold hover:gap-2.5 transition-all">
        View All <ArrowRight size={15} />
      </Link>
    )}
  </div>
);

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  return (
    <section className="my-12 bg-gradient-to-r from-[#1E3A8A] via-blue-700 to-[#1E3A8A] rounded-2xl overflow-hidden">
      <div className="relative px-6 py-12 md:px-12 md:py-16">
        {/* Background decoration */}
        <div className="absolute right-0 top-0 w-64 h-full opacity-10">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle cx="150" cy="100" r="120" fill="white" />
          </svg>
        </div>

        <div className="relative max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-[#DC2626] text-white text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wider">Newsletter</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white font-['Manrope'] leading-tight">
            The Pulse of Every Story,<br />Straight to Your Inbox
          </h2>
          <p className="text-blue-200 mt-3 text-base">
            Join 500,000+ readers who trust TalePulse for their daily news briefing. Get breaking news, exclusive stories, and expert analysis delivered every morning.
          </p>

          {subscribed ? (
            <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white">
              <p className="font-semibold">✓ You're in! Welcome to the TalePulse community.</p>
              <p className="text-blue-200 text-sm mt-1">Check your inbox for a confirmation email.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 outline-none focus:bg-white/20 transition-colors text-sm"
              />
              <button type="submit" className="bg-[#DC2626] hover:bg-red-700 text-white font-bold px-8 py-3.5 rounded-xl transition-colors whitespace-nowrap">
                Subscribe Free
              </button>
            </form>
          )}

          <p className="text-blue-300 text-xs mt-3">No spam. Unsubscribe anytime. 500K+ subscribers.</p>
        </div>
      </div>
    </section>
  );
};

export const Home: React.FC = () => {
  const featured = getFeaturedPosts();
  const trending = getTrendingPosts();
  const editorPicks = getEditorPicks();
  const techPosts = getPostsByCategory('technology');
  const sportsPosts = getPostsByCategory('sports');
  const politicsPosts = getPostsByCategory('politics');
  const businessPosts = getPostsByCategory('business');
  const healthPosts = getPostsByCategory('health');

  const [heroPost] = featured;
  const secondaryFeatured = featured.slice(1, 4);

  return (
    <main>
      {/* Breaking News Ticker */}
      <BreakingNewsTicker />

      {/* Hero Section */}
      <section className="bg-gray-50 dark:bg-gray-950 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Hero */}
            <div className="lg:col-span-2">
              {heroPost && <ArticleCard post={heroPost} variant="hero" />}
            </div>

            {/* Secondary Featured */}
            <div className="flex flex-col gap-4">
              {secondaryFeatured.map(post => (
                <article key={post.id} className="flex gap-3 group bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all">
                  <Link to={`/article/${post.slug}`} className="flex-shrink-0">
                    <div className="w-24 h-20 rounded-lg overflow-hidden">
                      <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {post.isBreaking && <span className="bg-[#DC2626] text-white text-xs font-bold px-1.5 py-0.5 rounded text-[10px]">BREAKING</span>}
                      <span className="text-xs font-bold text-[#DC2626] uppercase">{post.category.name}</span>
                    </div>
                    <Link to={`/article/${post.slug}`}>
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-[#1E3A8A] dark:group-hover:text-blue-400 transition-colors font-['Manrope'] leading-snug">
                        {post.title}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-400">
                      <span>{formatRelativeDate(post.publishedAt)}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Eye size={10} />{formatViews(post.views)}</span>
                    </div>
                  </div>
                </article>
              ))}

              {/* Live Tag */}
              <div className="bg-[#DC2626] rounded-xl p-4 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-wider">Live Coverage</span>
                </div>
                <p className="text-sm font-semibold">Follow our real-time updates on the most important stories breaking right now.</p>
                <Link to="/breaking" className="flex items-center gap-1 text-xs mt-3 text-red-100 hover:text-white font-semibold transition-colors">
                  Follow Live <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Banner Ad */}
      <div className="max-w-7xl mx-auto px-4 my-6">
        <AdBanner placement="top-banner" />
      </div>

      {/* Main Content + Sidebar */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">

            {/* Latest News */}
            <section>
              <SectionHeader title="Latest News" href="/latest" icon={<Zap size={20} fill="currentColor" />} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {posts.slice(0, 6).map(post => (
                  <ArticleCard key={post.id} post={post} variant="default" showExcerpt />
                ))}
              </div>
            </section>

            {/* In-Article Ad */}
            <AdBanner placement="in-article" />

            {/* Trending Section */}
            <section>
              <SectionHeader title="Trending Now" subtitle="Most read in the last 24 hours" href="/trending" icon={<TrendingUp size={20} />} accent="bg-[#DC2626]" />
              <div className="space-y-0">
                {trending.slice(0, 5).map((post, i) => (
                  <div key={post.id}>
                    <div className="flex gap-4 py-4 group">
                      <span className="text-4xl font-black text-gray-100 dark:text-gray-800 font-['Manrope'] w-10 flex-shrink-0 leading-none mt-1">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-[#DC2626] uppercase">{post.category.name}</span>
                          {post.isBreaking && <span className="bg-[#DC2626] text-white text-xs font-bold px-1.5 py-0.5 rounded animate-pulse">BREAKING</span>}
                        </div>
                        <Link to={`/article/${post.slug}`}>
                          <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-[#1E3A8A] dark:group-hover:text-blue-400 transition-colors font-['Manrope'] text-base leading-snug">
                            {post.title}
                          </h3>
                        </Link>
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1 mt-1">{post.excerpt}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                          <img src={post.author.avatar} alt="" className="w-5 h-5 rounded-full" />
                          <span>{post.author.name}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1"><Clock size={10} />{post.readingTime}m read</span>
                          <span className="flex items-center gap-1"><Eye size={10} />{formatViews(post.views)}</span>
                        </div>
                      </div>
                      <Link to={`/article/${post.slug}`} className="flex-shrink-0 w-24 h-18 hidden sm:block">
                        <img src={post.featuredImage} alt="" className="w-24 h-16 object-cover rounded-lg" />
                      </Link>
                    </div>
                    {i < trending.length - 1 && <hr className="border-gray-100 dark:border-gray-800" />}
                  </div>
                ))}
              </div>
            </section>

            {/* Technology Section */}
            <section>
              <SectionHeader title="Technology" href="/category/technology" accent="bg-[#1E3A8A]" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {techPosts.slice(0, 4).map(post => (
                  <ArticleCard key={post.id} post={post} />
                ))}
              </div>
            </section>

            {/* Feed Ad */}
            <AdBanner placement="feed" />

            {/* Politics Section */}
            <section>
              <SectionHeader title="Politics" href="/category/politics" accent="bg-[#DC2626]" />
              <div className="grid grid-cols-1 gap-4">
                {politicsPosts.slice(0, 3).map(post => (
                  <ArticleCard key={post.id} post={post} variant="horizontal" />
                ))}
              </div>
            </section>

            {/* Sports Section */}
            <section>
              <SectionHeader title="Sports" href="/category/sports" accent="bg-amber-500" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {sportsPosts.slice(0, 4).map(post => (
                  <ArticleCard key={post.id} post={post} variant="featured" />
                ))}
              </div>
            </section>

            {/* After Article Ad */}
            <AdBanner placement="after-article" />

            {/* Business Section */}
            <section>
              <SectionHeader title="Business & Markets" href="/category/business" accent="bg-green-600" />
              <div className="grid grid-cols-1 gap-4">
                {businessPosts.slice(0, 3).map(post => (
                  <ArticleCard key={post.id} post={post} variant="horizontal" />
                ))}
              </div>
            </section>

            {/* Health Section */}
            <section>
              <SectionHeader title="Health & Science" href="/category/health" accent="bg-emerald-500" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {healthPosts.slice(0, 2).map(post => (
                  <ArticleCard key={post.id} post={post} />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4">
        <NewsletterSection />
      </div>

      {/* Editor's Picks */}
      <section className="bg-gray-50 dark:bg-gray-950 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader title="Editor's Picks" subtitle="Handpicked stories from our editorial team" href="/editors-pick" icon={<Star size={20} />} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {editorPicks.slice(0, 4).map(post => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <SectionHeader title="Explore All Categories" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map(cat => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-[#1E3A8A]/30 transition-all group text-center"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">{cat.icon}</span>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-[#1E3A8A] dark:group-hover:text-blue-400 transition-colors">{cat.name}</span>
              <span className="text-xs text-gray-400">{cat.count} articles</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer Ad */}
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <AdBanner placement="footer" />
      </div>
    </main>
  );
};
