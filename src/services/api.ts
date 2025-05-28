import { User, LoginRequest, RegisterRequest, AuthResponse } from "../types";

// Define the API base URL
const API_URL = "http://localhost:3000/api";

// Authentication API functions
export const authApi = {
  // Login function
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
        credentials: "include", // Important for cookies
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Register function
  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include", // Important for cookies
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Logout function
  logout: async (): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include", // Important for cookies
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Logout failed");
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Get user profile (for checking authentication status)
  getProfile: async (): Promise<{ success: boolean; data: User }> => {
    try {
      const response = await fetch(`${API_URL}/auth/profile`, {
        method: "GET",
        credentials: "include", // Important for cookies
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Not authenticated");
        }
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to get profile");
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },
};
