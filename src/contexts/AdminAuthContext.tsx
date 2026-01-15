/**
 * Admin Authentication Context
 * Provides session-based authentication for admin routes
 * @module contexts/AdminAuthContext
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { verifyPassword } from "../utils/passwordHash";

interface AdminAuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  sessionTimeRemaining: number | null;
}

export const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const SESSION_KEY = "admin-auth-session";
const SESSION_DURATION_MS = 60 * 60 * 1000; // 1 hour

interface SessionData {
  authenticated: boolean;
  expiresAt: number;
}

/**
 * Admin Authentication Provider
 * Manages admin session state using sessionStorage
 *
 * @param children - Child components to wrap
 */
export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [sessionTimeRemaining, setSessionTimeRemaining] = useState<number | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = () => {
      try {
        const sessionData = sessionStorage.getItem(SESSION_KEY);
        if (!sessionData) {
          setIsAuthenticated(false);
          setSessionTimeRemaining(null);
          return;
        }

        const session: SessionData = JSON.parse(sessionData);
        const now = Date.now();

        if (session.authenticated && session.expiresAt > now) {
          setIsAuthenticated(true);
          setSessionTimeRemaining(Math.floor((session.expiresAt - now) / 1000));
        } else {
          // Session expired
          sessionStorage.removeItem(SESSION_KEY);
          setIsAuthenticated(false);
          setSessionTimeRemaining(null);
        }
      } catch (error) {
        console.error("[AdminAuth] Failed to restore session:", error);
        setIsAuthenticated(false);
        setSessionTimeRemaining(null);
      }
    };

    checkSession();
  }, []);

  // Update session time remaining every second when authenticated
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      try {
        const sessionData = sessionStorage.getItem(SESSION_KEY);
        if (!sessionData) {
          setIsAuthenticated(false);
          setSessionTimeRemaining(null);
          return;
        }

        const session: SessionData = JSON.parse(sessionData);
        const now = Date.now();
        const remaining = Math.floor((session.expiresAt - now) / 1000);

        if (remaining <= 0) {
          // Session expired
          sessionStorage.removeItem(SESSION_KEY);
          setIsAuthenticated(false);
          setSessionTimeRemaining(null);
        } else {
          setSessionTimeRemaining(remaining);
        }
      } catch (error) {
        console.error("[AdminAuth] Session check failed:", error);
        setIsAuthenticated(false);
        setSessionTimeRemaining(null);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  /**
   * Attempt to log in with provided password
   *
   * @param password - Password to verify
   * @returns True if login successful, false otherwise
   */
  const login = useCallback(async (password: string): Promise<boolean> => {
    try {
      const storedHash = import.meta.env.VITE_ADMIN_PASSWORD_HASH;

      if (!storedHash) {
        console.error("[AdminAuth] VITE_ADMIN_PASSWORD_HASH not configured");
        return false;
      }

      const isValid = await verifyPassword(password, storedHash);

      if (isValid) {
        const expiresAt = Date.now() + SESSION_DURATION_MS;
        const session: SessionData = {
          authenticated: true,
          expiresAt,
        };

        sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
        setIsAuthenticated(true);
        setSessionTimeRemaining(Math.floor(SESSION_DURATION_MS / 1000));

        console.log("[AdminAuth] Login successful");
        return true;
      }

      console.warn("[AdminAuth] Invalid password attempt");
      return false;
    } catch (error) {
      console.error("[AdminAuth] Login failed:", error);
      return false;
    }
  }, []);

  /**
   * Log out and clear session
   */
  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
    setSessionTimeRemaining(null);
    console.log("[AdminAuth] Logged out");
  }, []);

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        sessionTimeRemaining,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

/**
 * Hook to access admin authentication context
 *
 * @returns Admin auth context
 * @throws Error if used outside AdminAuthProvider
 */
export const useAdminAuth = (): AdminAuthContextType => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return context;
};
