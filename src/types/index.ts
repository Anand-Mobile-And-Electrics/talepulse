export interface Author {
  id: string;
  name: string;
  slug: string;
  avatar: string;
  bio: string;
  role: string;
  twitter?: string;
  linkedin?: string;
  email?: string;
  articlesCount: number;
  joinedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
  count: number;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export type PostStatus = 'published' | 'draft' | 'scheduled' | 'archived';
export type PostType = 'article' | 'story' | 'news' | 'opinion';

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: Category;
  tags: Tag[];
  author: Author;
  status: PostStatus;
  type: PostType;
  publishedAt: string;
  updatedAt: string;
  views: number;
  likes: number;
  bookmarks: number;
  readingTime: number;
  isBreaking?: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
  isEditorPick?: boolean;
  seo: {
    title: string;
    description: string;
    keywords: string[];
    canonicalUrl?: string;
    ogImage?: string;
  };
  comments?: Comment[];
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  email: string;
  avatar?: string;
  content: string;
  createdAt: string;
  parentId?: string;
  replies?: Comment[];
  likes: number;
}

export interface Advertisement {
  id: string;
  placement: 'top-banner' | 'sidebar' | 'in-article' | 'after-article' | 'footer' | 'feed';
  type: 'adsense' | 'custom' | 'placeholder';
  adSlot?: string;
  adClient?: string;
  imageUrl?: string;
  linkUrl?: string;
  isActive: boolean;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  name?: string;
  subscribedAt: string;
  isActive: boolean;
}

export interface SearchResult {
  posts: Post[];
  total: number;
  query: string;
  page: number;
  totalPages: number;
}

export interface AdminStats {
  totalPosts: number;
  totalViews: number;
  totalUsers: number;
  totalComments: number;
  monthlyViews: number;
  weeklyPosts: number;
  totalBookmarks: number;
  totalLikes: number;
}
