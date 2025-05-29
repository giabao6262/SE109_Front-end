import { Article, Category } from "../types";

// Define the API base URL
const API_URL = "http://localhost:3000/api";

// Helper function to transform backend article to frontend article format
const transformArticle = (backendArticle: any): Article => {
  // Ensure image URL is prefixed with the backend base URL if it's a relative path
  const coverImageUrl = backendArticle.cover_image_url?.startsWith("http")
    ? backendArticle.cover_image_url
    : `http://localhost:3000${backendArticle.cover_image_url}`;

  return {
    id: backendArticle.id,
    title: backendArticle.title,
    content: backendArticle.content,
    summary: backendArticle.summary,
    coverImage: coverImageUrl,
    author: {
      id: backendArticle.author_id,
      username: backendArticle.author_name || "Unknown",
      role: "user", // Default, can be updated if backend provides role
      email: "", // Email is typically not exposed in article data
    },
    category: {
      id: backendArticle.category_id,
      name: backendArticle.category_name || "Uncategorized",
      slug:
        backendArticle.category_name?.toLowerCase().replace(/\s+/g, "-") ||
        "uncategorized",
    },
    tags: backendArticle.tags || [],
    publishedDate: backendArticle.published_date,
    updatedDate: backendArticle.updated_date,
    comments: [], // Comments are typically fetched separately
    views: backendArticle.views || 0,
  };
};

// Article API functions
export const articlesApi = {
  // Get all articles with pagination and filters
  getAllArticles: async (
    params: {
      page?: number;
      limit?: number;
      search?: string;
      category?: string;
      sortBy?: string;
      sortOrder?: "ASC" | "DESC";
    } = {}
  ): Promise<{
    articles: Article[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
    };
  }> => {
    try {
      // Build query string from params
      const queryParams = new URLSearchParams();

      if (params.page) queryParams.append("page", params.page.toString());
      if (params.limit) queryParams.append("limit", params.limit.toString());
      if (params.search) queryParams.append("search", params.search);
      if (params.category) queryParams.append("category", params.category);
      if (params.sortBy) queryParams.append("sortBy", params.sortBy);
      if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder);

      const queryString = queryParams.toString();
      const url = `${API_URL}/articles${queryString ? `?${queryString}` : ""}`;

      const response = await fetch(url, {
        method: "GET",
        credentials: "include", // Important for cookies if authentication is required
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch articles");
      }

      const data = await response.json();

      return {
        articles: data.data.map(transformArticle),
        pagination: data.pagination,
      };
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw error;
    }
  },
  // Get article by ID
  getArticleById: async (
    id: string,
    skipViewIncrement: boolean = false
  ): Promise<Article> => {
    try {
      // Thêm param để không tăng view nếu cần
      const queryParam = skipViewIncrement ? "?skipViewIncrement=true" : "";
      const response = await fetch(`${API_URL}/articles/${id}${queryParam}`, {
        method: "GET",
        credentials: "include", // Important for cookies if authentication is required
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch article");
      }

      const data = await response.json();
      return transformArticle(data.data);
    } catch (error) {
      console.error(`Error fetching article with id ${id}:`, error);
      throw error;
    }
  },
  // Get all categories by extracting unique categories from articles
  getCategories: async (): Promise<Category[]> => {
    try {
      // Get articles with a larger limit to ensure we get most categories
      const result = await articlesApi.getAllArticles({ limit: 100 });

      // Extract unique categories from articles
      const categoriesMap = new Map<string, Category>();

      result.articles.forEach((article) => {
        if (!categoriesMap.has(article.category.id)) {
          categoriesMap.set(article.category.id, article.category);
        }
      });

      return Array.from(categoriesMap.values());
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },
};
