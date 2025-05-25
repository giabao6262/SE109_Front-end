export interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
  email: string;
  profilePicture?: string;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  summary: string;
  coverImage: string;
  author: User;
  category: Category;
  tags: string[];
  publishedDate: string;
  updatedDate?: string;
  comments: Comment[];
  views: number;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  date: string;
  likes: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Analytics {
  totalVisitors: number;
  totalArticles: number;
  articlesPerCategory: Record<string, number>;
  topArticles: {
    id: string;
    title: string;
    views: number;
  }[];
}

export interface Subscription {
  id: string;
  email: string;
  date: string;
}