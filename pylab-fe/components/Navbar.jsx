"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/context/AuthContext"; 
import { logout } from "@/lib/services/authService";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const { isStudentAuthenticated, isAdminAuthenticated, checkAuthStatus } = useAuth();
  const router = useRouter();
  const [showAuthOptions, setShowAuthOptions] = useState(false);
  const dropdownRef = useRef(null);

  // Handle sign out for different user types
  const handleSignOut = (userType) => {
    logout(userType);
    checkAuthStatus(); // Update auth state
    router.push('/'); // Redirect to home page
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowAuthOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdown when navigating
  const handleNavigation = () => {
    setShowAuthOptions(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full border-b border-indigo-500/20 bg-slate-950/80 backdrop-blur-md supports-[backdrop-filter]:bg-slate-950/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <h1 className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Py</span>
                <span className="text-slate-200">Lab</span>
              </h1>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center space-x-8">
            <Link 
              href="/" 
              className="text-base font-medium text-indigo-200/90 hover:text-white transition-colors duration-200"
            >
              Home
            </Link>
            <Link 
              href="/lessons" 
              className="text-base font-medium text-indigo-200/90 hover:text-white transition-colors duration-200"
            >
              Lessons
            </Link>
            <Link 
              href="/#features" 
              className="text-base font-medium text-indigo-200/90 hover:text-white transition-colors duration-200"
            >
              Features
            </Link>
            <Link 
              href="/#how-it-works" 
              className="text-base font-medium text-indigo-200/90 hover:text-white transition-colors duration-200"
            >
              How It Works
            </Link>
            <Link 
              href="/editor" 
              className="text-base font-medium text-indigo-200 hover:text-white transition-colors duration-200 bg-indigo-500/10 hover:bg-indigo-500/20 px-4 py-1.5 rounded-full"
            >
              Code Editor
            </Link>
          </nav>
          
          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {isStudentAuthenticated ? (
              <>
                <Link href="/profile">
                  <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-base text-indigo-200 hover:text-white hover:bg-indigo-500/10">
                    Profile
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="hidden sm:inline-flex text-base text-indigo-200 hover:text-white hover:bg-indigo-500/10"
                  onClick={() => handleSignOut('student')}
                >
                  Sign Out
                </Button>
              </>
            ) : isAdminAuthenticated ? (
              <>
                <Link href="/admin/dashboard">
                  <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-base text-indigo-200 hover:text-white hover:bg-indigo-500/10">
                    Dashboard
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="hidden sm:inline-flex text-base text-indigo-200 hover:text-white hover:bg-indigo-500/10"
                  onClick={() => handleSignOut('admin')}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                {/* Sign In Options */}
                <div className="relative" ref={dropdownRef}>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="hidden sm:inline-flex text-base text-indigo-200 hover:text-white hover:bg-indigo-500/10"
                    onClick={() => setShowAuthOptions(!showAuthOptions)}
                  >
                    Sign In
                  </Button>
                  
                  {/* Dropdown Menu */}
                  {showAuthOptions && (
                    <div className="absolute right-0 mt-2 w-48 bg-slate-900 rounded-md shadow-lg border border-indigo-500/20 overflow-hidden z-50">
                      <Link href="/auth/student/signin" onClick={handleNavigation}>
                        <div className="block px-4 py-2 text-indigo-200 hover:bg-indigo-500/10 hover:text-white transition-colors duration-200">
                          Sign in as Student
                        </div>
                      </Link>
                      <Link href="/auth/admin/signin" onClick={handleNavigation}>
                        <div className="block px-4 py-2 text-indigo-200 hover:bg-indigo-500/10 hover:text-white transition-colors duration-200">
                          Sign in as Admin
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
                
                <Link href="/auth/student/signup">
                  <Button size="sm" className="text-base font-medium bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 border-0 text-white px-4 py-1.5">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="border-t border-indigo-500/20 md:hidden">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-center space-x-6">
            <Link 
              href="/" 
              className="text-base font-medium text-indigo-200/90 hover:text-white transition-colors duration-200"
            >
              Home
            </Link>
            <Link 
              href="/lessons" 
              className="text-base font-medium text-indigo-200/90 hover:text-white transition-colors duration-200"
            >
              Lessons
            </Link>
            <Link 
              href="/#features" 
              className="text-base font-medium text-indigo-200/90 hover:text-white transition-colors duration-200"
            >
              Features
            </Link>
            <Link 
              href="/#how-it-works" 
              className="text-base font-medium text-indigo-200/90 hover:text-white transition-colors duration-200"
            >
              How It Works
            </Link>
            <Link 
              href="/editor" 
              className="text-base font-medium text-indigo-200 hover:text-white transition-colors duration-200 bg-indigo-500/10 hover:bg-indigo-500/20 px-3 py-1 rounded-full"
            >
              Editor
            </Link>
            
            {/* Mobile authentication options */}
            {(isStudentAuthenticated || isAdminAuthenticated) ? (
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-base font-medium text-indigo-200/90 hover:text-white transition-colors duration-200"
                onClick={() => handleSignOut(isStudentAuthenticated ? 'student' : 'admin')}
              >
                Sign Out
              </Button>
            ) : (
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-base font-medium text-indigo-200/90 hover:text-white transition-colors duration-200"
                  onClick={() => setShowAuthOptions(!showAuthOptions)}
                >
                  Sign In
                </Button>
              </div>
            )}
          </div>
          
          {/* Mobile dropdown for sign in options */}
          {showAuthOptions && !isStudentAuthenticated && !isAdminAuthenticated && (
            <div className="mt-3 bg-slate-900/90 rounded-md border border-indigo-500/20 overflow-hidden">
              <Link href="/auth/student/signin" onClick={handleNavigation}>
                <div className="block px-4 py-2 text-indigo-200 hover:bg-indigo-500/10 hover:text-white transition-colors duration-200 text-center">
                  Sign in as Student
                </div>
              </Link>
              <div className="border-t border-indigo-500/20"></div>
              <Link href="/auth/admin/signin" onClick={handleNavigation}>
                <div className="block px-4 py-2 text-indigo-200 hover:bg-indigo-500/10 hover:text-white transition-colors duration-200 text-center">
                  Sign in as Admin
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}