"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/form/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";

const AuthForm = ({ 
  type,                  // "signin" or "signup"
  userType,              // "student" or "admin"
  onSubmit,              // function to handle form submission
  redirectPath,          // where to redirect after successful auth
  alternateAuthPath      // path to the alternate auth action (signin/signup)
}) => {
  const router = useRouter();
  const { checkAuthStatus } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    rollno: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Handle numeric conversion for rollno if needed
      const submissionData = { ...formData };
      if (userType === "student" && type === "signup" && submissionData.rollno) {
        submissionData.rollno = parseInt(submissionData.rollno);
      }

      const result = await onSubmit(submissionData);
      
      if (result.success) {
        // Store token if provided
        if (result.token) {
          localStorage.setItem(`${userType}_token`, result.token);
          
          // Update authentication state immediately
          checkAuthStatus();
          
          // Create a storage event to notify other tabs
          window.dispatchEvent(new Event('storage'));
        }
        router.push(redirectPath || "/");
      } else {
        setError(result.error || "Authentication failed. Please try again.");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred. Please try again.");
      console.error("Auth error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const isSignIn = type === "signin";
  const isSignUp = type === "signup";
  const isStudent = userType === "student";
  
  // Title and description based on form type and user type
  const title = isSignIn 
    ? `Sign In as ${isStudent ? "Student" : "Admin"}` 
    : `Create ${isStudent ? "Student" : "Admin"} Account`;
  
  const description = isSignIn
    ? "Enter your credentials to access your account"
    : "Fill out the form below to create your account";

  const alternateText = isSignIn
    ? "Don't have an account?"
    : "Already have an account?";
  
  const alternateActionText = isSignIn ? "Sign up" : "Sign in";

  return (
    <Card className="w-full max-w-md border-indigo-500/20 bg-slate-900/80 backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
          {title}
        </CardTitle>
        <CardDescription className="text-indigo-200/70">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && isStudent && (
            <>
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  placeholder="Enter your full name" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="rollno">Roll Number</Label>
                <Input 
                  id="rollno" 
                  name="rollno" 
                  type="number" 
                  placeholder="Enter your roll number"
                  value={formData.rollno}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              name="password" 
              type="password" 
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>

          {error && (
            <div className="bg-red-950/30 p-3 rounded-md border border-red-800/30">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 border-0 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : isSignIn ? "Sign In" : "Sign Up"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center border-t border-indigo-500/20 pt-4">
        <p className="text-sm text-indigo-200/70">
          {alternateText}{" "}
          <Link 
            href={alternateAuthPath}
            className="text-indigo-400 hover:text-indigo-300 font-medium"
          >
            {alternateActionText}
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;