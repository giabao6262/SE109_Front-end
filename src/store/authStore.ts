import { create } from "zustand";
import { User, LoginRequest, RegisterRequest } from "../types";
import { authApi } from "../services/api";

interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

// Helper to save user to localStorage
const saveUserToLocalStorage = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// Helper to remove user from localStorage
const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};

// Helper to get user from localStorage
const getUserFromLocalStorage = (): User | null => {
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch (e) {
    console.error("Error parsing user from localStorage", e);
    return null;
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: getUserFromLocalStorage(),
  isAuthenticated: !!getUserFromLocalStorage(),
  isAdmin: getUserFromLocalStorage()?.role === "admin",
  isLoading: false,

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true });
      const credentials: LoginRequest = { email, password };
      const response = await authApi.login(credentials);

      if (response.success) {
        // Save user to localStorage and update state
        saveUserToLocalStorage(response.user);
        set({
          currentUser: response.user,
          isAuthenticated: true,
          isAdmin: response.user.role === "admin",
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (username: string, email: string, password: string) => {
    try {
      set({ isLoading: true });
      const userData: RegisterRequest = { username, email, password };
      const response = await authApi.register(userData);

      if (response.success) {
        // Save user to localStorage and update state
        saveUserToLocalStorage(response.user);
        set({
          currentUser: response.user,
          isAuthenticated: true,
          isAdmin: response.user.role === "admin",
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true });
      await authApi.logout();
      // Clear user from localStorage and update state
      removeUserFromLocalStorage();
      set({
        currentUser: null,
        isAuthenticated: false,
        isAdmin: false,
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  checkAuth: async () => {
    try {
      set({ isLoading: true });
      const response = await authApi.getProfile();

      if (response.success) {
        // Save user to localStorage and update state
        saveUserToLocalStorage(response.data);
        set({
          currentUser: response.data,
          isAuthenticated: true,
          isAdmin: response.data.role === "admin",
        });
      } else {
        // Clear user from localStorage and update state
        removeUserFromLocalStorage();
        set({
          currentUser: null,
          isAuthenticated: false,
          isAdmin: false,
        });
      }
    } catch (error) {
      // If error, user is not authenticated
      removeUserFromLocalStorage();
      set({
        currentUser: null,
        isAuthenticated: false,
        isAdmin: false,
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
