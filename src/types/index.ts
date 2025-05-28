export interface User {
  id: string;
  username: string;
  role: "admin" | "user";
  email: string;
  profile_picture_url?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user: User;
  message: string;
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
