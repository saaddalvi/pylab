"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isAuthenticated, getAuthToken } from "@/lib/services/authService";

// Create the authentication context
const AuthContext = createContext({
  isStudentAuthenticated: false,
  isAdminAuthenticated: false,
  loading: true,
  studentToken: null,
  adminToken: null,
  checkAuthStatus: () => {},
});

// Auth provider component
export function AuthProvider({ children }) {
  const [isStudentAuthenticated, setIsStudentAuthenticated] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [studentToken, setStudentToken] = useState(null);
  const [adminToken, setAdminToken] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  const checkAuthStatus = () => {
    const studentIsAuth = isAuthenticated("student");
    const adminIsAuth = isAuthenticated("admin");
    
    setIsStudentAuthenticated(studentIsAuth);
    setIsAdminAuthenticated(adminIsAuth);
    
    // Update tokens
    setStudentToken(studentIsAuth ? getAuthToken("student") : null);
    setAdminToken(adminIsAuth ? getAuthToken("admin") : null);
    
    setLoading(false);
  };

  useEffect(() => {
    checkAuthStatus();

    // Listen for storage events (like logout in other tabs)
    window.addEventListener("storage", checkAuthStatus);
    return () => {
      window.removeEventListener("storage", checkAuthStatus);
    };
  }, []);

  // Route protection logic
  useEffect(() => {
    if (loading) return;

    // Admin routes protection
    if (pathname?.startsWith("/admin") && !isAdminAuthenticated) {
      router.push("/auth/admin/signin");
      return;
    }

    // Student-specific routes that need authentication
    if (
      (pathname === "/profile" || pathname === "/progress") && 
      !isStudentAuthenticated
    ) {
      router.push("/auth/student/signin");
      return;
    }

  }, [pathname, isStudentAuthenticated, isAdminAuthenticated, loading, router]);

  const value = {
    isStudentAuthenticated,
    isAdminAuthenticated,
    loading,
    studentToken,
    adminToken,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}