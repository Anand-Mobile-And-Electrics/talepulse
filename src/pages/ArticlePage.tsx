import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Clock, Eye, Heart, Bookmark, BookmarkCheck, ChevronRight,
  MessageSquare, ThumbsUp, Send, AlertCircle
} from 'lucide-react';

import { ArticleCard } from '../components/ui/ArticleCard';
import { AdBanner } from '../components/ui/AdBanner';
import { Sidebar } from '../components/ui/Sidebar';
import { formatDate, formatRelativeDate, formatViews, getShareUrl } from '../utils';
import { useBookmarks } from '../hooks/useBookmarks';
import { Post, Comment } from '../types';

const ShareButtons: React.FC<{ post: Post }> = ({ post }) => {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    await navigator.clipboard.writeText(`https://talepulse.com/article/${post.slug}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialPlatforms = [
    { name: 'Facebook', emoji: 'f', color: 'hover:bg-blue-600', href: getShareUrl('facebook', post) },
    { name: 'X', emoji: '𝕏', color: 'hover:bg-gray-800', href: getShareUrl('twitter', post) },
    { name: 'LinkedIn', emoji: 'in', color: 'hover:bg-blue-700', href: getShareUrl('linkedin', post) },
    { name: 'WhatsApp', emoji: '📱', color: 'hover:bg-green-500', href: getShareUrl('whatsapp', post) },
    { name: 'Telegram', emoji: '✈️', color: 'hover:bg-blue-500', href: getShareUrl('telegram', post) },
  ];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Share:</span>
      {socialPlatforms.map(({ name, emoji, color, href }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-1.5 px-3 py-2 bg-gray-100 dark:bg-gray-700 ${color} hover:text-white text-gray-600 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors`}
        >
          <span>{emoji}</span>
          <span className="hidden sm:inline">{name}</span>
        </a>
      ))}
      <button
        onClick={copyLink}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          copied ? 'bg-green-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
        }`}
      >
        {copied ? '✓ Copied!' : '🔗 Copy'}
      </button>
    </div>
  );
};

const CommentForm: React.FC<{ postId: string; parentId?: string; onClose?: () => void }> = ({ onClose }) => {
  const [form, setForm] = useState({ name: '', email: '', comment: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (onClose) setTimeout(onClose, 2000);
  };

  if (submitted) return (
    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-green-700 dark:text-green-400 text-sm">
      ✓ Your comment has been submitted and is awaiting moderation. Thank you!
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name *</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email *</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
            placeholder="your@email.com"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Comment *</label>
        <textarea
          required
          rows={4}
          value={form.comment}
          onChange={e => setForm(p => ({ ...p, comment: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent resize-none"
          placeholder="Share your thoughts..."
        />
      </div>
      <div className="flex gap-3">
        <button type="submit" className="flex items-center gap-2 bg-[#1E3A8A] hover:bg-blue-800 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors">
          <Send size={14} /> Post Comment
        </button>
        {onClose && (
          <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-lg text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

const CommentItem: React.FC<{ comment: Comment; depth?: number }> = ({ comment, depth = 0 }) => {
  const [showReply, setShowReply] = useState(false);
  const [likes, setLikes] = useState(comment.likes);

  return (
    <div className={`${depth > 0 ? 'ml-8 md:ml-12 border-l-2 border-gray-100 dark:border-gray-700 pl-4' : ''}`}>
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          {comment.avatar ? (
            <img src={comment.avatar} alt={comment.author} className="w-9 h-9 rounded-full object-cover" />
          ) : (
            <div className="w-9 h-9 rounded-full bg-[#1E3A8A] flex items-center justify-center text-white text-sm font-bold">
              {comment.author[0].toUpperCase()}
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-sm text-gray-900 dark:text-white">{comment.author}</span>
              <span className="text-xs text-gray-400">{formatRelativeDate(comment.createdAt)}</span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">{comment.content}</p>
          </div>
          <div className="flex items-center gap-4 mt-2 ml-2">
            <button onClick={() => setLikes(l => l + 1)} className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#1E3A8A] dark:hover:text-blue-400 transition-colors">
              <ThumbsUp size={12} /> {likes}
            </button>
            {depth === 0 && (
              <button onClick={() => setShowReply(!showReply)} className="text-xs text-gray-400 hover:text-[#1E3A8A] dark:hover:text-blue-400 transition-colors font-medium">
                Reply
              </button>
            )}
          </div>
          {showReply && (
            <div className="mt-3">
              <CommentForm postId={comment.postId} parentId={comment.id} onClose={() => setShowReply(false)} />
            </div>
          )}
          {comment.replies?.map(reply => (
            <div key={reply.id} className="mt-3">
              <CommentItem comment={reply} depth={depth + 1} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [readProgress, setReadProgress] = useState(0);

  const post = posts.find(p => p.slug === slug);

  useEffect(() => {
    if (!post) return;
    setLikeCount(post.likes);
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const el = document.getElementById('article-content');
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight;
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(100, (scrolled / total) * 100);
      setReadProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post]);

  if (!post) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Article Not Found</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">The article you're looking for doesn't exist or has been removed.</p>
      <button onClick={() => navigate('/')} className="bg-[#1E3A8A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
        Go Home
      </button>
    </div>
  );

  const related = getRelatedPosts(post, 4);
  const bookmarked = isBookmarked(post.id);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount(c => c - 1);
    } else {
      setLiked(true);
      setLikeCount(c => c + 1);
    }
  };

  return (
    <>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 z-50">
        <div
          className="h-full bg-[#DC2626] transition-all duration-100"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-6">
          <Link to="/" className="hover:text-[#1E3A8A] dark:hover:text-blue-400 transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to={`/category/${post.category.slug}`} className="hover:text-[#1E3A8A] dark:hover:text-blue-400 transition-colors">{post.category.name}</Link>
          <ChevronRight size={12} />
          <span className="text-gray-400 truncate max-w-xs">{post.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Article Content */}
          <article className="lg:col-span-2">
            {/* Category & Breaking Badge */}
            <div className="flex items-center gap-3 mb-4">
              {post.isBreaking && (
                <span className="bg-[#DC2626] text-white text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider animate-pulse">
                  Breaking News
                </span>
              )}
              <Link
                to={`/category/${post.category.slug}`}
                className="text-sm font-bold text-[#DC2626] uppercase tracking-wider hover:text-red-700 transition-colors"
              >
                {post.category.name}
              </Link>
              {post.type !== 'news' && (
                <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-bold px-2.5 py-1 rounded capitalize">
                  {post.type}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white leading-tight font-['Manrope'] mb-4">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed border-l-4 border-[#DC2626] pl-4 mb-6">
              {post.excerpt}
            </p>

            {/* Author & Meta */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-y border-gray-100 dark:border-gray-700 mb-6">
              <div className="flex items-center gap-3">
                <Link to={`/author/${post.author.slug}`}>
                  <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#1E3A8A]/20" />
                </Link>
                <div>
                  <Link to={`/author/${post.author.slug}`} className="font-semibold text-gray-900 dark:text-white hover:text-[#1E3A8A] dark:hover:text-blue-400 transition-colors">
                    {post.author.name}
                  </Link>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{post.author.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span>{formatDate(post.publishedAt)}</span>
                <span>·</span>
                <span className="flex items-center gap-1"><Clock size={13} />{post.readingTime} min read</span>
                <span>·</span>
                <span className="flex items-center gap-1"><Eye size={13} />{formatViews(post.views)}</span>
              </div>
            </div>

            {/* Featured Image */}
            <figure className="mb-6 rounded-2xl overflow-hidden">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover"
              />
              <figcaption className="text-xs text-gray-400 text-center mt-2">
                Image: {post.title} — TalePulse Media
              </figcaption>
            </figure>

            {/* Article Content */}
            <div
              id="article-content"
              className="prose prose-lg dark:prose-invert max-w-none
                prose-headings:font-['Manrope'] prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
                prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed
                prose-a:text-[#1E3A8A] dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                prose-blockquote:border-[#DC2626] prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-gray-800 prose-blockquote:rounded-r-xl prose-blockquote:py-1
                prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* In-Article Ad */}
            <div className="my-8">
              <AdBanner placement="in-article" />
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Tags:</span>
                {post.tags.map(tag => (
                  <Link
                    key={tag.id}
                    to={`/tag/${tag.slug}`}
                    className="text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-[#1E3A8A] hover:text-white dark:hover:bg-[#1E3A8A] transition-colors"
                  >
                    #{tag.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    liked
                      ? 'bg-[#DC2626] text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
                  }`}
                >
                  <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
                  {formatViews(likeCount)} Likes
                </button>
                <button
                  onClick={() => toggleBookmark(post.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border transition-all ${
                    bookmarked
                      ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]'
                      : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-[#1E3A8A]'
                  }`}
                >
                  {bookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                  {bookmarked ? 'Saved' : 'Save'}
                </button>
              </div>
              <ShareButtons post={post} />
            </div>

            {/* After-Article Ad */}
            <div className="my-8">
              <AdBanner placement="after-article" />
            </div>

            {/* Author Box */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-start gap-4">
                <Link to={`/author/${post.author.slug}`}>
                  <img src={post.author.avatar} alt={post.author.name} className="w-16 h-16 rounded-full object-cover border-2 border-[#1E3A8A]/20" />
                </Link>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-xs text-[#DC2626] font-semibold uppercase tracking-wider">Written by</p>
                  </div>
                  <Link to={`/author/${post.author.slug}`} className="text-lg font-bold text-gray-900 dark:text-white hover:text-[#1E3A8A] dark:hover:text-blue-400 transition-colors font-['Manrope']">
                    {post.author.name}
                  </Link>
                  <p className="text-sm text-[#1E3A8A] dark:text-blue-400 font-medium">{post.author.role}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">{post.author.bio}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <Link to={`/author/${post.author.slug}`} className="text-xs text-[#1E3A8A] dark:text-blue-400 font-semibold hover:underline">
                      {post.author.articlesCount} Articles
                    </Link>
                    {post.author.twitter && (
                      <a href={`https://twitter.com/${post.author.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-[#1E3A8A] dark:hover:text-blue-400 transition-colors">
                        {post.author.twitter}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-10">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare size={20} className="text-[#1E3A8A]" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white font-['Manrope']">
                  Comments ({post.comments?.length || 0})
                </h3>
              </div>

              {/* Comment List */}
              <div className="space-y-6 mb-8">
                {post.comments?.map(comment => (
                  <CommentItem key={comment.id} comment={comment} />
                ))}
                {(!post.comments || post.comments.length === 0) && (
                  <div className="text-center py-8 text-gray-400">
                    <MessageSquare size={40} className="mx-auto mb-3 opacity-30" />
                    <p>No comments yet. Be the first to share your thoughts!</p>
                  </div>
                )}
              </div>

              {/* Comment Form */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
                <h4 className="font-bold text-gray-900 dark:text-white mb-4 font-['Manrope']">Leave a Comment</h4>
                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-4">
                  <AlertCircle size={12} />
                  Your email will not be published. Comments are moderated.
                </div>
                <CommentForm postId={post.id} />
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <Sidebar />
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <section className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-end justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-[#1E3A8A] rounded-full" />
                <h2 className="text-2xl font-black text-gray-900 dark:text-white font-['Manrope']">Related Articles</h2>
              </div>
              <Link to={`/category/${post.category.slug}`} className="text-sm text-[#1E3A8A] dark:text-blue-400 font-semibold hover:underline flex items-center gap-1">
                More in {post.category.name} <ChevronRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map(relPost => (
                <ArticleCard key={relPost.id} post={relPost} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
};
