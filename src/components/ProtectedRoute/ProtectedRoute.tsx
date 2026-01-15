/**
 * Protected Route Component
 * Wrapper component that requires authentication before rendering children
 * @module components/ProtectedRoute
 */

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "../../contexts/AdminAuthContext";
import { Box, CircularProgress } from "@mui/material";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Protected Route wrapper component
 * Redirects to login page if user is not authenticated
 *
 * @param children - Components to render if authenticated
 * @returns Protected content or redirect to login
 *
 * @example
 * <Route path="/admin" element={
 *   <ProtectedRoute>
 *     <AdminDashboard />
 *   </ProtectedRoute>
 * } />
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAdminAuth();
  const location = useLocation();

  // Show loading state briefly while checking auth
  const [isChecking, setIsChecking] = React.useState(true);

  React.useEffect(() => {
    // Brief delay to allow session check to complete
    const timer = setTimeout(() => setIsChecking(false), 100);
    return () => clearTimeout(timer);
  }, []);

  if (isChecking) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login, preserving intended destination
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
