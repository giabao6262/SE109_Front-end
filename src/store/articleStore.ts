import { create } from 'zustand';
import { Article, Category, Comment } from '../types';
import { mockArticles } from '../mockData/articles';
import { mockCategories } from '../mockData/categories';

interface ArticleState {
  articles: Article[];
  categories: Category[];
  selectedCategory: string | null;
  searchQuery: string;
  
  // CRUD operations
  getArticles: () => Article[];
  getArticleById: (id: string) => Article | undefined;
  createArticle: (article: Omit<Article, 'id' | 'comments' | 'views'>) => Article;
  updateArticle: (id: string, updates: Partial<Article>) => Article | undefined;
  deleteArticle: (id: string) => boolean;
  
  // Filtering
  setSelectedCategory: (categoryId: string | null) => void;
  setSearchQuery: (query: string) => void;
  getFilteredArticles: () => Article[];
  
  // Comments
  addComment: (articleId: string, comment: Omit<Comment, 'id' | 'likes'>) => boolean;
  
  // Categories
  getCategoryById: (id: string) => Category | undefined;
}

export const useArticleStore = create<ArticleState>((set, get) => ({
  articles: [...mockArticles],
  categories: [...mockCategories],
  selectedCategory: null,
  searchQuery: '',
  
  // CRUD operations
  getArticles: () => get().articles,
  
  getArticleById: (id) => {
    return get().articles.find(article => article.id === id);
  },
  
  createArticle: (articleData) => {
    const newArticle: Article = {
      id: Math.random().toString(36).substring(2, 9),
      comments: [],
      views: 0,
      ...articleData,
    };
    
    set(state => ({
      articles: [...state.articles, newArticle]
    }));
    
    return newArticle;
  },
  
  updateArticle: (id, updates) => {
    let updatedArticle: Article | undefined;
    
    set(state => {
      const updatedArticles = state.articles.map(article => {
        if (article.id === id) {
          updatedArticle = { ...article, ...updates };
          return updatedArticle;
        }
        return article;
      });
      
      return { articles: updatedArticles };
    });
    
    return updatedArticle;
  },
  
  deleteArticle: (id) => {
    let deleted = false;
    
    set(state => {
      const filteredArticles = state.articles.filter(article => {
        if (article.id === id) {
          deleted = true;
          return false;
        }
        return true;
      });
      
      return { articles: filteredArticles };
    });
    
    return deleted;
  },
  
  // Filtering
  setSelectedCategory: (categoryId) => {
    set({ selectedCategory: categoryId });
  },
  
  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },
  
  getFilteredArticles: () => {
    const { articles, selectedCategory, searchQuery } = get();
    
    return articles.filter(article => {
      // Filter by category if selected
      const categoryMatch = !selectedCategory || article.category.id === selectedCategory;
      
      // Filter by search query
      const searchMatch = !searchQuery || 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase());
      
      return categoryMatch && searchMatch;
    });
  },
  
  // Comments
  addComment: (articleId, commentData) => {
    const newComment: Comment = {
      id: Math.random().toString(36).substring(2, 9),
      likes: 0,
      ...commentData,
    };
    
    let success = false;
    
    set(state => {
      const updatedArticles = state.articles.map(article => {
        if (article.id === articleId) {
          success = true;
          return {
            ...article,
            comments: [...article.comments, newComment]
          };
        }
        return article;
      });
      
      return { articles: updatedArticles };
    });
    
    return success;
  },
  
  // Categories
  getCategoryById: (id) => {
    return get().categories.find(category => category.id === id);
  },
}));