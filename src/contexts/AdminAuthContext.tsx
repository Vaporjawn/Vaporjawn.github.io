/**
 * Admin Authentication Context — context object + hook only.
 * The provider component lives in AdminAuthProvider.tsx so this file
 * satisfies the react-refresh/only-export-components rule.
 * @module contexts/AdminAuthContext
 */

import { createContext, useContext } from "react";

export interface AdminAuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  sessionTimeRemaining: number | null;
}

export const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
  undefined
);

/**
 * Hook to access admin authentication context.
 *
 * @returns Admin auth context value
 * @throws Error if used outside AdminAuthProvider
 */
export const useAdminAuth = (): AdminAuthContextType => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return context;
};
