export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  image?: string;
  category?: string;
  category_id?: string;
  author?: string;
  created_at: string;
  type?: string;
  views?: number;
  likes?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  created_at?: string;
}

export interface Author {
  id: string;
  name: string;
  slug: string;
  bio?: string;
  avatar?: string;
  created_at?: string;
}

export interface Comment {
  id: string;
  post_id: string;
  name: string;
  email?: string;
  content: string;
  approved?: boolean;
  created_at: string;
}

export interface Advertisement {
  id: string;
  title: string;
  image_url?: string;
  link?: string;
  placement?: string;
  active?: boolean;
  created_at?: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribed?: boolean;
  created_at: string;
}