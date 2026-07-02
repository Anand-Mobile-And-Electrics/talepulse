import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Save, Eye, Send, Image, Tag, X, ChevronDown, Bold, Italic, List, Link2, Quote, Heading1, Heading2 } from 'lucide-react';
import { categories, tags } from '../../data/mockData';

type PostStatus = 'draft' | 'published' | 'scheduled';

export const CreatePost: React.FC = () => {
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    categoryId: '',
    type: 'article',
    status: 'draft' as PostStatus,
    featuredImage: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    isBreaking: false,
    isFeatured: false,
    isTrending: false,
    isEditorPick: false,
    scheduledAt: '',
  });

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'settings'>('content');
  const [saved, setSaved] = useState(false);

  const handleTitleChange = (title: string) => {
    const slug = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
    setForm(p => ({ ...p, title, slug, seoTitle: title }));
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId]
    );
  };

  const handleSave = (status: PostStatus) => {
    setForm(p => ({ ...p, status }));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const toolbarButtons = [
    { icon: <Bold size={15} />, action: 'bold', title: 'Bold' },
    { icon: <Italic size={15} />, action: 'italic', title: 'Italic' },
    { icon: <Heading1 size={15} />, action: 'h1', title: 'Heading 1' },
    { icon: <Heading2 size={15} />, action: 'h2', title: 'Heading 2' },
    { icon: <List size={15} />, action: 'list', title: 'List' },
    { icon: <Quote size={15} />, action: 'quote', title: 'Blockquote' },
    { icon: <Link2 size={15} />, action: 'link', title: 'Link' },
    { icon: <Image size={15} />, action: 'image', title: 'Image' },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Link to="/admin/posts" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <X size={20} />
          </Link>
          <div className="h-5 w-px bg-gray-200 dark:bg-gray-700" />
          <h1 className="font-bold text-gray-900 dark:text-white font-['Manrope']">
            {form.title || 'New Post'}
          </h1>
          {saved && (
            <span className="text-xs text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400 px-2 py-0.5 rounded font-medium">
              ✓ Saved
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className={`text-xs px-2.5 py-1 rounded-full font-medium ${
            form.status === 'published' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' :
            form.status === 'scheduled' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' :
            'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400'
          }`}>
            {form.status}
          </div>
          <button
            onClick={() => handleSave('draft')}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
          >
            <Save size={15} />
            Save Draft
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
            <Eye size={15} />
            Preview
          </button>
          <button
            onClick={() => handleSave('published')}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-[#1E3A8A] hover:bg-blue-800 text-white rounded-lg transition-colors"
          >
            <Send size={15} />
            Publish
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-6 flex-shrink-0">
        {([
          { id: 'content', label: '📝 Content' },
          { id: 'seo', label: '🔍 SEO' },
          { id: 'settings', label: '⚙️ Settings' },
        ] as const).map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors -mb-px ${
              activeTab === tab.id
                ? 'border-[#1E3A8A] text-[#1E3A8A] dark:text-blue-400 dark:border-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950">
        <div className="max-w-5xl mx-auto px-6 py-6">
          {activeTab === 'content' && (
            <div className="space-y-5">
              {/* Title */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5">
                <input
                  type="text"
                  placeholder="Article title..."
                  value={form.title}
                  onChange={e => handleTitleChange(e.target.value)}
                  className="w-full text-3xl font-black text-gray-900 dark:text-white placeholder-gray-300 dark:placeholder-gray-700 bg-transparent border-none outline-none font-['Manrope']"
                />
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-xs text-gray-400">Slug:</span>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={e => setForm(p => ({ ...p, slug: e.target.value }))}
                    className="flex-1 text-xs text-[#1E3A8A] dark:text-blue-400 bg-transparent border-none outline-none font-mono"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5">
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Excerpt</label>
                <textarea
                  rows={3}
                  placeholder="Brief description that appears in article previews..."
                  value={form.excerpt}
                  onChange={e => setForm(p => ({ ...p, excerpt: e.target.value }))}
                  className="w-full bg-transparent text-gray-700 dark:text-gray-300 placeholder-gray-400 outline-none resize-none text-sm leading-relaxed"
                />
              </div>

              {/* Rich Text Editor */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                {/* Toolbar */}
                <div className="flex items-center gap-1 p-3 border-b border-gray-100 dark:border-gray-700 flex-wrap">
                  {toolbarButtons.map(btn => (
                    <button
                      key={btn.action}
                      title={btn.title}
                      className="p-2 rounded text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      {btn.icon}
                    </button>
                  ))}
                  <div className="w-px h-5 bg-gray-200 dark:bg-gray-600 mx-1" />
                  <select className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 border-0 rounded px-2 py-1 outline-none">
                    <option>Paragraph</option>
                    <option>Heading 1</option>
                    <option>Heading 2</option>
                    <option>Heading 3</option>
                    <option>Blockquote</option>
                  </select>
                </div>

                {/* Content Area */}
                <textarea
                  rows={20}
                  placeholder="Write your article content here... You can use HTML tags for formatting.

<p>Start your article...</p>
<h2>Section Title</h2>
<p>Content paragraph...</p>
<blockquote><p>Quoted text...</p></blockquote>"
                  value={form.content}
                  onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
                  className="w-full bg-transparent text-gray-700 dark:text-gray-300 placeholder-gray-400 outline-none resize-none text-sm leading-loose p-5 font-mono"
                />

                {/* Footer */}
                <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-400">
                  <span>{form.content.split(/\s+/).filter(Boolean).length} words</span>
                  <span>~{Math.max(1, Math.ceil(form.content.split(/\s+/).filter(Boolean).length / 200))} min read</span>
                </div>
              </div>

              {/* Featured Image */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5">
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Featured Image</label>
                {form.featuredImage ? (
                  <div className="relative rounded-lg overflow-hidden">
                    <img src={form.featuredImage} alt="Featured" className="w-full h-48 object-cover" />
                    <button onClick={() => setForm(p => ({ ...p, featuredImage: '' }))}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-lg hover:bg-red-600">
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center">
                    <Image size={32} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Drag and drop an image, or</p>
                    <div className="flex gap-2 justify-center mt-3">
                      <button className="px-4 py-2 bg-[#1E3A8A] text-white text-xs font-semibold rounded-lg hover:bg-blue-800 transition-colors">
                        Upload Image
                      </button>
                      <span className="text-xs text-gray-400 self-center">or</span>
                      <input
                        type="url"
                        placeholder="Paste image URL..."
                        onChange={e => setForm(p => ({ ...p, featuredImage: e.target.value }))}
                        className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-xs bg-transparent text-gray-700 dark:text-gray-300 outline-none focus:border-[#1E3A8A]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Category & Tags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5">
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Category</label>
                  <div className="relative">
                    <select
                      value={form.categoryId}
                      onChange={e => setForm(p => ({ ...p, categoryId: e.target.value }))}
                      className="w-full appearance-none bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 outline-none focus:border-[#1E3A8A] transition-colors"
                    >
                      <option value="">Select category...</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5">
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                    <Tag size={12} className="inline mr-1" />
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <button
                        key={tag.id}
                        onClick={() => toggleTag(tag.id)}
                        className={`text-xs px-2.5 py-1 rounded-full transition-colors ${
                          selectedTags.includes(tag.id)
                            ? 'bg-[#1E3A8A] text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        #{tag.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-5">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 font-['Manrope']">SEO Settings</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">SEO Title</label>
                    <input
                      type="text"
                      value={form.seoTitle}
                      onChange={e => setForm(p => ({ ...p, seoTitle: e.target.value }))}
                      className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300 outline-none focus:border-[#1E3A8A]"
                      placeholder="SEO optimized title..."
                    />
                    <p className="text-xs text-gray-400 mt-1">{form.seoTitle.length}/60 characters</p>
                    <div className={`h-1 rounded-full mt-1 ${form.seoTitle.length > 60 ? 'bg-red-400' : form.seoTitle.length > 40 ? 'bg-green-400' : 'bg-gray-200'}`}
                      style={{ width: `${Math.min(100, (form.seoTitle.length / 60) * 100)}%` }} />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Meta Description</label>
                    <textarea
                      rows={3}
                      value={form.seoDescription}
                      onChange={e => setForm(p => ({ ...p, seoDescription: e.target.value }))}
                      className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300 outline-none focus:border-[#1E3A8A] resize-none"
                      placeholder="Compelling meta description for search engines..."
                    />
                    <p className="text-xs text-gray-400 mt-1">{form.seoDescription.length}/160 characters</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Keywords</label>
                    <input
                      type="text"
                      value={form.seoKeywords}
                      onChange={e => setForm(p => ({ ...p, seoKeywords: e.target.value }))}
                      className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300 outline-none focus:border-[#1E3A8A]"
                      placeholder="keyword1, keyword2, keyword3..."
                    />
                  </div>

                  {/* SERP Preview */}
                  <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Search Preview</p>
                    <div className="text-blue-700 dark:text-blue-400 text-base font-medium truncate">
                      {form.seoTitle || form.title || 'Article Title'}
                    </div>
                    <div className="text-green-700 dark:text-green-500 text-xs mt-0.5">
                      https://talepulse.com/article/{form.slug || 'article-slug'}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-xs mt-1 line-clamp-2">
                      {form.seoDescription || form.excerpt || 'Meta description will appear here...'}
                    </div>
                  </div>

                  {/* Open Graph */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Open Graph Image URL</label>
                    <input
                      type="url"
                      className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300 outline-none focus:border-[#1E3A8A]"
                      placeholder="https://..."
                    />
                  </div>

                  {/* Canonical URL */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Canonical URL</label>
                    <input
                      type="url"
                      className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300 outline-none focus:border-[#1E3A8A]"
                      placeholder={`https://talepulse.com/article/${form.slug}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-5">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 font-['Manrope']">Post Settings</h3>

                <div className="space-y-4">
                  {/* Post Type */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Post Type</label>
                    <div className="grid grid-cols-4 gap-2">
                      {['article', 'news', 'story', 'opinion'].map(type => (
                        <button
                          key={type}
                          onClick={() => setForm(p => ({ ...p, type }))}
                          className={`py-2 px-3 rounded-lg text-sm font-medium capitalize transition-colors ${
                            form.type === type ? 'bg-[#1E3A8A] text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Status</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['draft', 'published', 'scheduled'] as PostStatus[]).map(status => (
                        <button
                          key={status}
                          onClick={() => setForm(p => ({ ...p, status }))}
                          className={`py-2 px-3 rounded-lg text-sm font-medium capitalize transition-colors ${
                            form.status === status ? 'bg-[#1E3A8A] text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Scheduled Date */}
                  {form.status === 'scheduled' && (
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Schedule Date & Time</label>
                      <input
                        type="datetime-local"
                        value={form.scheduledAt}
                        onChange={e => setForm(p => ({ ...p, scheduledAt: e.target.value }))}
                        className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300 outline-none focus:border-[#1E3A8A]"
                      />
                    </div>
                  )}

                  {/* Flags */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Article Flags</label>
                    <div className="space-y-3">
                      {[
                        { key: 'isBreaking', label: 'Breaking News', desc: 'Show breaking news badge and add to ticker', color: 'bg-[#DC2626]' },
                        { key: 'isFeatured', label: 'Featured', desc: 'Display in hero and featured sections', color: 'bg-[#1E3A8A]' },
                        { key: 'isTrending', label: 'Trending', desc: 'Include in trending sections and sidebar', color: 'bg-amber-500' },
                        { key: 'isEditorPick', label: "Editor's Pick", desc: "Include in editor's picks section", color: 'bg-purple-600' },
                      ].map(flag => (
                        <label key={flag.key} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full ${flag.color}`} />
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{flag.label}</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-0.5">{flag.desc}</p>
                          </div>
                          <div
                            onClick={() => setForm(p => ({ ...p, [flag.key]: !p[flag.key as keyof typeof p] }))}
                            className={`w-10 h-5 rounded-full transition-colors cursor-pointer ${
                              form[flag.key as keyof typeof form] ? 'bg-[#1E3A8A]' : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                          >
                            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform mt-0.5 ${
                              form[flag.key as keyof typeof form] ? 'translate-x-5 ml-0.5' : 'translate-x-0.5'
                            }`} />
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
