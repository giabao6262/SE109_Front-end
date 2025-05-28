import React, { createContext, useContext, useEffect } from "react";
import { useAuthStore } from "../../store/authStore";

interface AuthContextType {
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { checkAuth, isAuthenticated, isAdmin, isLoading } = useAuthStore();

  // Check authentication status when the app loads
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const value = {
    isLoading,
    isAuthenticated,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
