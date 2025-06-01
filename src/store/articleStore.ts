import { create } from "zustand";
import { Article, Category, Comment } from "../types";
import { articlesApi } from "../services/articlesApi";
import { commentApi } from "../services/commentApi";
import { id } from "date-fns/locale";

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
  fetchArticleById: (
    id: string,
    skipViewIncrement?: boolean
  ) => Promise<Article | undefined>;
  getArticles: () => Article[];
  getArticleById: (id: string) => Article | undefined;
  createArticle: (
    formData: {
      title: string;
      summary: string;
      content: string;
      category: Category;
      tags: string[];
      publishedDate: string;
    },
    imageFile: File
  ) => Promise<Article>;
  updateArticle: (
    id: string,
    formData: {
      title: string;
      summary: string;
      content: string;
      category: Category;
      tags: string[];
      publishedDate: string;
    },
    imageFile: File | null
  ) => Promise<Article>;
  deleteArticle: (id: string) => Promise<boolean>;

  // Filtering
  setSelectedCategory: (categoryId: string | null) => void;

  setSearchQuery: (query: string) => void;
  getFilteredArticles: () => Article[]; // Comments
  addComment: (articleId: string, content: string) => Promise<boolean>;
  updateComment: (
    articleId: string,
    commentId: string,
    content: string
  ) => Promise<boolean>;
  deleteComment: (articleId: string, commentId: string) => Promise<boolean>;
  likeComment: (articleId: string, commentId: string) => Promise<boolean>;

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
  fetchArticleById: async (id, skipViewIncrement = false) => {
    if (!id) {
      set({ error: "Article ID is required" });
      return undefined;
    }

    set({ isLoading: true, error: null });

    try {
      const article = await articlesApi.getArticleById(id, skipViewIncrement);
      if (!article) {
        set({ error: "Article not found" });
        return undefined;
      }

      // Fetch latest comments for the article
      try {
        const comments = await commentApi.getCommentsByArticleId(id);
        article.comments = comments;
      } catch (commentErr) {
        console.error(`Error fetching comments for article ${id}:`, commentErr);
        // Don't fail the whole operation if comments can't be fetched
      } // Update the article in the store's articles array if it exists
      // If it doesn't exist, add it to the array
      set((state) => {
        const articleExists = state.articles.some((a) => a.id === article.id);

        if (articleExists) {
          return {
            articles: state.articles.map((a) =>
              a.id === article.id ? article : a
            ),
          };
        } else {
          // Add the new article to the array
          return {
            articles: [...state.articles, article],
          };
        }
      });

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

  createArticle: async(
    formData: {
    title: string;
    summary: string;
    content: string;
    category: Category;
    tags: string[];
    publishedDate: string;
  },
  imageFile: File
): Promise<Article> => {
  const newArticle = await articlesApi.createArticleWithUpload(formData, imageFile);

  set((state) => ({
    articles: [newArticle, ...state.articles]
  }));

  return newArticle;
  },

  updateArticle: async (
    id: string,
    formData:{
      title: string;
    summary: string;
    content: string;
    category: Category;
    tags: string[];
    publishedDate: string;
    },
    imageFile: File | null
  ):Promise<Article> => {
    const updated = await articlesApi.updateArticleWithUpload(id, formData, imageFile);

  set((state) => ({
    articles: state.articles.map((a) => (a.id === id ? updated : a))
  }));

  return updated;

  },

  deleteArticle: async (id: string): Promise<boolean> => {
  try {
    const success = await articlesApi.deleteArticle(id);
    if (success) {
      set((state) => ({
        articles: state.articles.filter((a) => a.id !== id),
      }));
    }
    return success;
  } catch (err) {
    console.error('Failed to delete article:', err);
    return false;
  }
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
  }, // Comments
  addComment: async (articleId, content) => {
    try {
      const newComment = await commentApi.createComment(articleId, content);

      set((state) => {
        const updatedArticles = state.articles.map((article) => {
          if (article.id === articleId) {
            return {
              ...article,
              comments: [...article.comments, newComment],
            };
          }
          return article;
        });

        return { articles: updatedArticles };
      });

      return true;
    } catch (error) {
      console.error("Error creating comment:", error);
      return false;
    }
  },

  updateComment: async (articleId, commentId, content) => {
    try {
      const updatedComment = await commentApi.updateComment(commentId, content);

      set((state) => {
        const updatedArticles = state.articles.map((article) => {
          if (article.id === articleId) {
            return {
              ...article,
              comments: article.comments.map((comment) =>
                comment.id === commentId ? updatedComment : comment
              ),
            };
          }
          return article;
        });

        return { articles: updatedArticles };
      });

      return true;
    } catch (error) {
      console.error("Error updating comment:", error);
      return false;
    }
  },

  deleteComment: async (articleId, commentId) => {
    try {
      const success = await commentApi.deleteComment(commentId);

      if (success) {
        set((state) => {
          const updatedArticles = state.articles.map((article) => {
            if (article.id === articleId) {
              return {
                ...article,
                comments: article.comments.filter(
                  (comment) => comment.id !== commentId
                ),
              };
            }
            return article;
          });

          return { articles: updatedArticles };
        });
      }

      return success;
    } catch (error) {
      console.error("Error deleting comment:", error);
      return false;
    }
  },

  likeComment: async (articleId, commentId) => {
    try {
      const updatedComment = await commentApi.likeComment(commentId);

      set((state) => {
        const updatedArticles = state.articles.map((article) => {
          if (article.id === articleId) {
            return {
              ...article,
              comments: article.comments.map((comment) =>
                comment.id === commentId ? updatedComment : comment
              ),
            };
          }
          return article;
        });

        return { articles: updatedArticles };
      });

      return true;
    } catch (error) {
      console.error("Error liking comment:", error);
      return false;
    }
  },

  // Categories
  getCategoryById: (id) => {
    return get().categories.find((category) => category.id === id);
  },
}));
