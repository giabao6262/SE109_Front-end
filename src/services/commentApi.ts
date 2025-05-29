import { Comment } from "../types";

// Define the API base URL
const API_URL = "http://localhost:3000/api";

// Comment API functions
export const commentApi = {
  // Get comments by article ID
  getCommentsByArticleId: async (articleId: string): Promise<Comment[]> => {
    try {
      const response = await fetch(`${API_URL}/comments/article/${articleId}`, {
        method: "GET",
        credentials: "include", // Important for cookies
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch comments");
      }

      const data = await response.json();
      return data.data.map((comment: any) => ({
        id: comment.id,
        content: comment.content,
        author: {
          id: comment.user_id || comment.author_id,
          username: comment.author_name || "Unknown",
          role: comment.author_role || "user",
          email: "", // Email is typically not exposed in comment data
          profile_picture_url: comment.author_profile_picture
            ? comment.author_profile_picture.startsWith("http")
              ? comment.author_profile_picture
              : `http://localhost:3000${comment.author_profile_picture}`
            : "/default-avatar.png",
        },
        date: comment.created_at,
        likes: comment.likes || 0,
      }));
    } catch (error) {
      console.error(`Error fetching comments for article ${articleId}:`, error);
      throw error;
    }
  },

  // Create a new comment
  createComment: async (
    articleId: string,
    content: string
  ): Promise<Comment> => {
    try {
      const response = await fetch(`${API_URL}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          article_id: articleId,
          content,
        }),
        credentials: "include", // Important for cookies
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create comment");
      }

      const data = await response.json();
      return {
        id: data.data.id,
        content: data.data.content,
        author: {
          id: data.data.user_id || data.data.author_id,
          username: data.data.author_name || "Unknown",
          role: data.data.author_role || "user",
          email: "",
          profile_picture_url:
            data.data.author_profile_picture || "/default-avatar.png",
        },
        date: data.data.created_at,
        likes: data.data.likes || 0,
      };
    } catch (error) {
      console.error("Error creating comment:", error);
      throw error;
    }
  },

  // Update a comment
  updateComment: async (
    commentId: string,
    content: string
  ): Promise<Comment> => {
    try {
      const response = await fetch(`${API_URL}/comments/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
        }),
        credentials: "include", // Important for cookies
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update comment");
      }

      const data = await response.json();
      return {
        id: data.data.id,
        content: data.data.content,
        author: {
          id: data.data.user_id || data.data.author_id,
          username: data.data.author_name || "Unknown",
          role: data.data.author_role || "user",
          email: "",
          profile_picture_url:
            data.data.author_profile_picture || "/default-avatar.png",
        },
        date: data.data.updated_at || data.data.created_at,
        likes: data.data.likes || 0,
      };
    } catch (error) {
      console.error(`Error updating comment ${commentId}:`, error);
      throw error;
    }
  },

  // Delete a comment
  deleteComment: async (commentId: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/comments/${commentId}`, {
        method: "DELETE",
        credentials: "include", // Important for cookies
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete comment");
      }

      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error(`Error deleting comment ${commentId}:`, error);
      throw error;
    }
  },

  // Like a comment
  likeComment: async (commentId: string): Promise<Comment> => {
    try {
      const response = await fetch(`${API_URL}/comments/${commentId}/like`, {
        method: "POST",
        credentials: "include", // Important for cookies
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to like comment");
      }

      const data = await response.json();
      return {
        id: data.data.id,
        content: data.data.content,
        author: {
          id: data.data.user_id || data.data.author_id,
          username: data.data.author_name || "Unknown",
          role: data.data.author_role || "user",
          email: "",
          profile_picture_url:
            data.data.author_profile_picture || "/default-avatar.png",
        },
        date: data.data.created_at,
        likes: data.data.likes || 0,
      };
    } catch (error) {
      console.error(`Error liking comment ${commentId}:`, error);
      throw error;
    }
  },
};
