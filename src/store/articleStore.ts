import { create } from "zustand";
import { Article, Category, Comment } from "../types";
import { articlesApi } from "../services/articlesApi";

interface ArticleState {
  articles: Article[];
  categories: Category[];
  selectedCategory: string | null;
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };

  // CRUD operations
  fetchArticles: () => Promise<void>;
  fetchArticleById: (id: string) => Promise<Article | undefined>;
  getArticles: () => Article[];
  getArticleById: (id: string) => Article | undefined;
  createArticle: (
    article: Omit<Article, "id" | "comments" | "views">
  ) => Article;
  updateArticle: (id: string, updates: Partial<Article>) => Article | undefined;
  deleteArticle: (id: string) => boolean;

  // Filtering
  setSelectedCategory: (categoryId: string | null) => void;
  setSearchQuery: (query: string) => void;
  getFilteredArticles: () => Article[];

  // Comments
  addComment: (
    articleId: string,
    comment: Omit<Comment, "id" | "likes">
  ) => boolean;

  // Categories
  getCategoryById: (id: string) => Category | undefined;
}

export const useArticleStore = create<ArticleState>((set, get) => ({
  // Initial state
  articles: [],
  categories: [],
  selectedCategory: null,
  searchQuery: "",
  isLoading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  },

  // CRUD operations
  fetchArticles: async (page = 1, limit = 10) => {
    set({ isLoading: true, error: null });

    try {
      const result = await articlesApi.getAllArticles({
        page,
        limit,
        category: get().selectedCategory || undefined,
      });

      set({
        articles: result.articles,
        pagination: {
          currentPage: result.pagination.currentPage,
          totalPages: result.pagination.totalPages,
          totalItems: result.pagination.totalItems,
        },
      });

      // Also fetch categories if they don't exist
      if (get().categories.length === 0) {
        try {
          const categories = await articlesApi.getCategories();
          set({ categories });
        } catch (err) {
          console.error("Error fetching categories:", err);
          // Don't set error state for categories fetch failure
          // as it's not critical for article display
        }
      }
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("An unknown error occurred");
      set({ error: error.message });
      console.error("Error fetching articles:", error);
    } finally {
      set({ isLoading: false });
    }
  },
  fetchArticleById: async (id) => {
    if (!id) {
      set({ error: "Article ID is required" });
      return undefined;
    }

    set({ isLoading: true, error: null });

    try {
      const article = await articlesApi.getArticleById(id);
      if (!article) {
        set({ error: "Article not found" });
        return undefined;
      }

      // Update the article in the store's articles array if it exists
      set((state) => ({
        articles: state.articles.map((a) =>
          a.id === article.id ? article : a
        ),
      }));

      return article;
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("An unknown error occurred");
      set({ error: error.message });
      console.error(`Error fetching article ${id}:`, error);
      return undefined;
    } finally {
      set({ isLoading: false });
    }
  },

  getArticles: () => get().articles,

  getArticleById: (id) => {
    return get().articles.find((article) => article.id === id);
  },

  createArticle: (articleData) => {
    const newArticle: Article = {
      id: Math.random().toString(36).substring(2, 9),
      comments: [],
      views: 0,
      ...articleData,
    };

    set((state) => ({
      articles: [...state.articles, newArticle],
    }));

    return newArticle;
  },

  updateArticle: (id, updates) => {
    let updatedArticle: Article | undefined;

    set((state) => {
      const updatedArticles = state.articles.map((article) => {
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

    set((state) => {
      const filteredArticles = state.articles.filter((article) => {
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

    return articles.filter((article) => {
      // Filter by category if selected
      const categoryMatch =
        !selectedCategory || article.category.id === selectedCategory;

      // Filter by search query
      const searchMatch =
        !searchQuery ||
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

    set((state) => {
      const updatedArticles = state.articles.map((article) => {
        if (article.id === articleId) {
          success = true;
          return {
            ...article,
            comments: [...article.comments, newComment],
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
    return get().categories.find((category) => category.id === id);
  },
}));
