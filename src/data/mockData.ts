import { Author, Category, Tag, Post, Comment } from '../types';

export const authors: Author[] = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    slug: 'sarah-mitchell',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face',
    bio: 'Senior political correspondent with 12 years of experience covering global affairs and international relations.',
    role: 'Senior Correspondent',
    twitter: '@sarahmitchell',
    linkedin: 'sarahmitchell',
    articlesCount: 342,
    joinedAt: '2020-01-15',
  },
  {
    id: '2',
    name: 'James Chen',
    slug: 'james-chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Technology editor and AI researcher. Former engineer at major tech companies, now writing about the future of tech.',
    role: 'Technology Editor',
    twitter: '@jameschen_tech',
    articlesCount: 218,
    joinedAt: '2021-03-10',
  },
  {
    id: '3',
    name: 'Amara Okafor',
    slug: 'amara-okafor',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face',
    bio: 'Business and economics journalist covering global markets, fintech, and emerging economies across Africa and Asia.',
    role: 'Business Reporter',
    twitter: '@amaraokafor',
    articlesCount: 189,
    joinedAt: '2021-07-22',
  },
  {
    id: '4',
    name: 'Marcus Rivera',
    slug: 'marcus-rivera',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Sports journalist and former professional athlete. Expert in football, basketball, and Olympic sports.',
    role: 'Sports Editor',
    twitter: '@marcusrivera',
    articlesCount: 276,
    joinedAt: '2020-09-05',
  },
  {
    id: '5',
    name: 'Elena Vasquez',
    slug: 'elena-vasquez',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: 'Health and science correspondent. PhD in biomedical sciences, translating complex research for global audiences.',
    role: 'Health & Science Editor',
    twitter: '@elenavasquez',
    articlesCount: 154,
    joinedAt: '2022-02-14',
  },
];

export const categories: Category[] = [
  { id: '1', name: 'Politics', slug: 'politics', description: 'Global political news and analysis', color: '#DC2626', icon: '🏛️', count: 145 },
  { id: '2', name: 'Technology', slug: 'technology', description: 'Latest in tech, AI, and digital innovation', color: '#1E3A8A', icon: '💻', count: 218 },
  { id: '3', name: 'Business', slug: 'business', description: 'Markets, finance, and global economy', color: '#059669', icon: '📈', count: 167 },
  { id: '4', name: 'Sports', slug: 'sports', description: 'Live sports news and match analysis', color: '#D97706', icon: '⚽', count: 289 },
  { id: '5', name: 'Entertainment', slug: 'entertainment', description: 'Movies, music, and pop culture', color: '#7C3AED', icon: '🎬', count: 198 },
  { id: '6', name: 'Health', slug: 'health', description: 'Medical breakthroughs and wellness', color: '#10B981', icon: '🏥', count: 134 },
  { id: '7', name: 'Science', slug: 'science', description: 'Scientific discoveries and research', color: '#0891B2', icon: '🔬', count: 112 },
  { id: '8', name: 'World', slug: 'world', description: 'International news from every corner', color: '#6366F1', icon: '🌍', count: 321 },
  { id: '9', name: 'Opinion', slug: 'opinion', description: 'Expert opinion and editorial', color: '#F59E0B', icon: '💭', count: 89 },
  { id: '10', name: 'Lifestyle', slug: 'lifestyle', description: 'Culture, travel, and everyday life', color: '#EC4899', icon: '✨', count: 156 },
  { id: '11', name: 'Travel', slug: 'travel', description: 'Destinations, guides, and adventures', color: '#14B8A6', icon: '✈️', count: 98 },
  { id: '12', name: 'Education', slug: 'education', description: 'Learning, academia, and innovation', color: '#8B5CF6', icon: '📚', count: 76 },
];

export const tags: Tag[] = [
  { id: '1', name: 'Breaking News', slug: 'breaking-news', count: 87 },
  { id: '2', name: 'Artificial Intelligence', slug: 'artificial-intelligence', count: 134 },
  { id: '3', name: 'Climate Change', slug: 'climate-change', count: 98 },
  { id: '4', name: 'Elections', slug: 'elections', count: 76 },
  { id: '5', name: 'Cryptocurrency', slug: 'cryptocurrency', count: 65 },
  { id: '6', name: 'Space Exploration', slug: 'space-exploration', count: 54 },
  { id: '7', name: 'COVID-19', slug: 'covid-19', count: 43 },
  { id: '8', name: 'World Cup', slug: 'world-cup', count: 89 },
  { id: '9', name: 'Stock Market', slug: 'stock-market', count: 112 },
  { id: '10', name: 'Mental Health', slug: 'mental-health', count: 67 },
];

const sampleContent = `
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

<h2>The Key Developments</h2>
<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>

<blockquote>
  <p>"The future belongs to those who believe in the beauty of their dreams." — This sentiment perfectly captures the essence of what we're witnessing in today's rapidly evolving landscape.</p>
</blockquote>

<h2>Global Implications</h2>
<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.</p>

<p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</p>

<h2>What Experts Say</h2>
<p>Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.</p>

<p>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.</p>

<h2>Looking Ahead</h2>
<p>Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. The implications of these developments will be felt for years to come.</p>
`;

const sampleComments: Comment[] = [
  {
    id: 'c1',
    postId: '1',
    author: 'Alex Thompson',
    email: 'alex@example.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face',
    content: 'Excellent analysis! This is exactly the kind of in-depth reporting we need more of. The global implications are massive.',
    createdAt: '2024-11-20T14:30:00Z',
    likes: 24,
    replies: [
      {
        id: 'c1-r1',
        postId: '1',
        author: 'Maria Santos',
        email: 'maria@example.com',
        content: 'Totally agree! The perspective on international relations here is spot-on.',
        createdAt: '2024-11-20T15:00:00Z',
        parentId: 'c1',
        likes: 8,
      }
    ]
  },
  {
    id: 'c2',
    postId: '1',
    author: 'David Park',
    email: 'david@example.com',
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=50&h=50&fit=crop&crop=face',
    content: 'Great piece but I think there are some important nuances being missed here regarding the economic angle.',
    createdAt: '2024-11-20T16:45:00Z',
    likes: 12,
  }
];

export const posts: Post[] = [
  {
    id: '1',
    title: 'Global Summit on AI Governance Reaches Historic Agreement',
    slug: 'global-summit-ai-governance-historic-agreement',
    excerpt: 'World leaders gathered in Geneva have reached a landmark agreement on artificial intelligence governance, setting new international standards for AI development and deployment.',
    content: sampleContent,
    featuredImage: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=450&fit=crop',
    category: categories[1],
    tags: [tags[0], tags[1]],
    author: authors[1],
    status: 'published',
    type: 'news',
    publishedAt: '2024-11-20T08:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    views: 45230,
    likes: 1240,
    bookmarks: 890,
    readingTime: 6,
    isBreaking: true,
    isFeatured: true,
    isTrending: true,
    isEditorPick: true,
    seo: {
      title: 'Global Summit on AI Governance Reaches Historic Agreement | TalePulse',
      description: 'World leaders in Geneva reach landmark AI governance agreement setting new international standards.',
      keywords: ['AI governance', 'artificial intelligence', 'global summit', 'technology policy'],
    },
    comments: sampleComments,
  },
  {
    id: '2',
    title: 'Markets Surge as Federal Reserve Signals Rate Cut Strategy for 2025',
    slug: 'markets-surge-federal-reserve-rate-cut-2025',
    excerpt: 'Global stock markets rallied sharply after Federal Reserve Chair indicated a measured approach to interest rate reductions, boosting investor confidence worldwide.',
    content: sampleContent,
    featuredImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=450&fit=crop',
    category: categories[2],
    tags: [tags[8]],
    author: authors[2],
    status: 'published',
    type: 'news',
    publishedAt: '2024-11-19T12:00:00Z',
    updatedAt: '2024-11-19T14:00:00Z',
    views: 32100,
    likes: 876,
    bookmarks: 432,
    readingTime: 5,
    isFeatured: true,
    isTrending: true,
    seo: {
      title: 'Markets Surge as Federal Reserve Signals Rate Cut Strategy | TalePulse',
      description: 'Global markets rally after Fed signals measured rate cuts for 2025.',
      keywords: ['Federal Reserve', 'interest rates', 'stock market', 'economy'],
    },
  },
  {
    id: '3',
    title: 'Climate Crisis: Arctic Ice Reaches Record Low as Scientists Issue Urgent Warning',
    slug: 'arctic-ice-record-low-scientists-urgent-warning',
    excerpt: 'New satellite data reveals Arctic sea ice has hit its lowest recorded extent, prompting top climate scientists to call for immediate global action.',
    content: sampleContent,
    featuredImage: 'https://images.unsplash.com/photo-1517825738774-7de9363ef735?w=800&h=450&fit=crop',
    category: categories[6],
    tags: [tags[2]],
    author: authors[4],
    status: 'published',
    type: 'article',
    publishedAt: '2024-11-18T09:30:00Z',
    updatedAt: '2024-11-18T11:00:00Z',
    views: 28900,
    likes: 945,
    bookmarks: 567,
    readingTime: 7,
    isTrending: true,
    isEditorPick: true,
    seo: {
      title: 'Arctic Ice Reaches Record Low - Scientists Issue Urgent Warning | TalePulse',
      description: 'Arctic sea ice hits record low. Scientists demand immediate global climate action.',
      keywords: ['Arctic ice', 'climate change', 'global warming', 'environment'],
    },
  },
  {
    id: '4',
    title: 'Champions League Final: Manchester City vs Real Madrid Preview',
    slug: 'champions-league-final-manchester-city-real-madrid-preview',
    excerpt: 'The biggest football match of the year is set. We break down the tactics, key players, and predictions for this epic European showdown.',
    content: sampleContent,
    featuredImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=450&fit=crop',
    category: categories[3],
    tags: [tags[7]],
    author: authors[3],
    status: 'published',
    type: 'article',
    publishedAt: '2024-11-17T15:00:00Z',
    updatedAt: '2024-11-17T16:30:00Z',
    views: 67800,
    likes: 2340,
    bookmarks: 1120,
    readingTime: 8,
    isFeatured: true,
    isTrending: true,
    seo: {
      title: 'Champions League Final: City vs Real Madrid Preview | TalePulse',
      description: 'Complete preview of the Champions League Final - tactics, key players and predictions.',
      keywords: ['Champions League', 'Manchester City', 'Real Madrid', 'football'],
    },
  },
  {
    id: '5',
    title: 'Election Watch: Key Battleground States Shift in Latest Polling Data',
    slug: 'election-battleground-states-latest-polling',
    excerpt: 'New polling reveals surprising shifts in traditionally safe states, reshaping the political landscape just weeks before the crucial election.',
    content: sampleContent,
    featuredImage: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&h=450&fit=crop',
    category: categories[0],
    tags: [tags[3]],
    author: authors[0],
    status: 'published',
    type: 'news',
    publishedAt: '2024-11-16T07:00:00Z',
    updatedAt: '2024-11-16T09:00:00Z',
    views: 52400,
    likes: 1876,
    bookmarks: 934,
    readingTime: 6,
    isBreaking: true,
    isEditorPick: true,
    seo: {
      title: 'Battleground States Shift in Latest Polling | TalePulse',
      description: 'Surprising shifts in battleground states reshape election landscape.',
      keywords: ['elections', 'polling', 'battleground states', 'politics'],
    },
  },
  {
    id: '6',
    title: 'Apple Unveils Revolutionary Neural Processing Chip That Transforms Mobile AI',
    slug: 'apple-neural-processing-chip-mobile-ai',
    excerpt: 'Apple\'s latest silicon breakthrough promises to run advanced AI models entirely on device, eliminating cloud dependency and raising the bar for privacy.',
    content: sampleContent,
    featuredImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=450&fit=crop',
    category: categories[1],
    tags: [tags[1]],
    author: authors[1],
    status: 'published',
    type: 'article',
    publishedAt: '2024-11-15T11:00:00Z',
    updatedAt: '2024-11-15T13:00:00Z',
    views: 41200,
    likes: 1543,
    bookmarks: 723,
    readingTime: 7,
    isFeatured: true,
    isTrending: true,
    seo: {
      title: 'Apple\'s Revolutionary Neural Chip Transforms Mobile AI | TalePulse',
      description: 'Apple unveils neural chip for on-device AI, eliminating cloud dependency.',
      keywords: ['Apple', 'neural processing', 'mobile AI', 'silicon chip'],
    },
  },
  {
    id: '7',
    title: 'New Study Links Ultra-Processed Food to Accelerated Brain Aging',
    slug: 'ultra-processed-food-brain-aging-study',
    excerpt: 'Groundbreaking research from Harvard Medical School reveals startling connections between ultra-processed food consumption and cognitive decline rates.',
    content: sampleContent,
    featuredImage: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&h=450&fit=crop',
    category: categories[5],
    tags: [tags[9]],
    author: authors[4],
    status: 'published',
    type: 'article',
    publishedAt: '2024-11-14T08:30:00Z',
    updatedAt: '2024-11-14T10:00:00Z',
    views: 38700,
    likes: 1234,
    bookmarks: 892,
    readingTime: 6,
    isEditorPick: true,
    seo: {
      title: 'Ultra-Processed Food Linked to Brain Aging - Harvard Study | TalePulse',
      description: 'Harvard research reveals link between ultra-processed food and accelerated brain aging.',
      keywords: ['ultra-processed food', 'brain aging', 'cognitive decline', 'health'],
    },
  },
  {
    id: '8',
    title: 'SpaceX Artemis Mission Successfully Establishes Lunar Base Camp',
    slug: 'spacex-artemis-lunar-base-camp-established',
    excerpt: 'In a historic milestone for humanity, NASA and SpaceX teams have successfully established the first permanent human outpost on the Moon\'s south pole.',
    content: sampleContent,
    featuredImage: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=450&fit=crop',
    category: categories[6],
    tags: [tags[5]],
    author: authors[1],
    status: 'published',
    type: 'news',
    publishedAt: '2024-11-13T16:00:00Z',
    updatedAt: '2024-11-13T18:00:00Z',
    views: 89200,
    likes: 4521,
    bookmarks: 2341,
    readingTime: 9,
    isBreaking: true,
    isFeatured: true,
    isTrending: true,
    seo: {
      title: 'SpaceX Artemis Establishes Historic Lunar Base Camp | TalePulse',
      description: 'NASA and SpaceX establish first permanent human outpost on the Moon.',
      keywords: ['SpaceX', 'NASA', 'Artemis', 'lunar base', 'moon'],
    },
  },
  {
    id: '9',
    title: 'Hollywood\'s AI Revolution: How Generative Tools Are Redefining Cinema',
    slug: 'hollywood-ai-revolution-generative-cinema',
    excerpt: 'From AI-generated visual effects to AI-assisted scripts, Hollywood studios are embracing generative AI at unprecedented scale—and the industry is changing forever.',
    content: sampleContent,
    featuredImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=450&fit=crop',
    category: categories[4],
    tags: [tags[1]],
    author: authors[0],
    status: 'published',
    type: 'story',
    publishedAt: '2024-11-12T10:00:00Z',
    updatedAt: '2024-11-12T12:00:00Z',
    views: 29400,
    likes: 876,
    bookmarks: 543,
    readingTime: 10,
    seo: {
      title: 'Hollywood\'s AI Revolution: Generative Tools Redefining Cinema | TalePulse',
      description: 'How generative AI is transforming Hollywood filmmaking forever.',
      keywords: ['Hollywood', 'AI', 'cinema', 'generative AI', 'entertainment'],
    },
  },
  {
    id: '10',
    title: 'The Hidden Cost of Remote Work: Mental Health Crisis Among Gen Z Workers',
    slug: 'remote-work-mental-health-crisis-gen-z',
    excerpt: 'New workplace research exposes the psychological toll of permanent remote work on Gen Z employees—and what companies must do urgently to address it.',
    content: sampleContent,
    featuredImage: 'https://images.unsplash.com/photo-1584931423298-c576fda54bd2?w=800&h=450&fit=crop',
    category: categories[8],
    tags: [tags[9]],
    author: authors[2],
    status: 'published',
    type: 'opinion',
    publishedAt: '2024-11-11T13:00:00Z',
    updatedAt: '2024-11-11T15:00:00Z',
    views: 34500,
    likes: 1456,
    bookmarks: 678,
    readingTime: 8,
    isEditorPick: true,
    seo: {
      title: 'Remote Work Mental Health Crisis Among Gen Z Workers | TalePulse',
      description: 'Research reveals psychological toll of remote work on Gen Z and what companies must do.',
      keywords: ['remote work', 'mental health', 'Gen Z', 'workplace', 'opinion'],
    },
  },
  {
    id: '11',
    title: 'Bitcoin Breaks $100K: What It Means for Global Finance',
    slug: 'bitcoin-breaks-100k-global-finance',
    excerpt: 'Cryptocurrency milestone reshapes financial landscape as institutional adoption accelerates and central banks reconsider digital currency strategies.',
    content: sampleContent,
    featuredImage: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&h=450&fit=crop',
    category: categories[2],
    tags: [tags[4]],
    author: authors[2],
    status: 'published',
    type: 'news',
    publishedAt: '2024-11-10T09:00:00Z',
    updatedAt: '2024-11-10T11:00:00Z',
    views: 76300,
    likes: 3210,
    bookmarks: 1890,
    readingTime: 7,
    isBreaking: true,
    isTrending: true,
    seo: {
      title: 'Bitcoin Breaks $100K: What It Means for Global Finance | TalePulse',
      description: 'Bitcoin milestone reshapes finance as institutional adoption accelerates.',
      keywords: ['Bitcoin', 'cryptocurrency', 'finance', '$100K'],
    },
  },
  {
    id: '12',
    title: 'The Ancient Silk Road: A Modern Traveler\'s Guide to Historic Trade Routes',
    slug: 'ancient-silk-road-modern-traveler-guide',
    excerpt: 'Retrace the footsteps of Marco Polo and ancient merchants across Central Asia\'s most breathtaking landscapes, from Istanbul to Xi\'an.',
    content: sampleContent,
    featuredImage: 'https://images.unsplash.com/photo-1539786774582-0707ef851ce4?w=800&h=450&fit=crop',
    category: categories[10],
    tags: [],
    author: authors[0],
    status: 'published',
    type: 'story',
    publishedAt: '2024-11-09T14:00:00Z',
    updatedAt: '2024-11-09T16:00:00Z',
    views: 21600,
    likes: 987,
    bookmarks: 456,
    readingTime: 12,
    seo: {
      title: 'Ancient Silk Road: A Modern Traveler\'s Guide | TalePulse',
      description: 'Retrace the ancient Silk Road from Istanbul to Xi\'an - a complete travel guide.',
      keywords: ['Silk Road', 'travel', 'Central Asia', 'history', 'adventure'],
    },
  },
];

export const breakingNews = [
  'BREAKING: G20 Leaders Agree on Landmark Climate Finance Package Worth $500 Billion',
  'URGENT: Major Earthquake Strikes Pacific Region, Tsunami Warning Issued',
  'JUST IN: Tech Giant Announces Largest Ever AI Investment at $200 Billion',
  'BREAKING: Peace Talks Resume as Ceasefire Holds for Third Consecutive Day',
  'ALERT: Central Bank Emergency Meeting Called Amid Market Volatility',
];

export const getPostsByCategory = (slug: string): Post[] =>
  posts.filter(p => p.category.slug === slug && p.status === 'published');

export const getFeaturedPosts = (): Post[] =>
  posts.filter(p => p.isFeatured && p.status === 'published');

export const getTrendingPosts = (): Post[] =>
  posts.filter(p => p.isTrending && p.status === 'published').sort((a, b) => b.views - a.views);

export const getBreakingPosts = (): Post[] =>
  posts.filter(p => p.isBreaking && p.status === 'published');

export const getEditorPicks = (): Post[] =>
  posts.filter(p => p.isEditorPick && p.status === 'published');

export const getPostsByType = (type: string): Post[] =>
  posts.filter(p => p.type === type && p.status === 'published');

export const getRelatedPosts = (post: Post, limit = 4): Post[] =>
  posts
    .filter(p => p.id !== post.id && p.category.id === post.category.id && p.status === 'published')
    .slice(0, limit);

export const searchPosts = (query: string): Post[] => {
  const q = query.toLowerCase();
  return posts.filter(p =>
    p.status === 'published' && (
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.content.toLowerCase().includes(q) ||
      p.category.name.toLowerCase().includes(q) ||
      p.author.name.toLowerCase().includes(q) ||
      p.tags.some(t => t.name.toLowerCase().includes(q))
    )
  );
};
