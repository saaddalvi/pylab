"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminDashboard() {
  const { isAdminAuthenticated, loading } = useAuth();
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalLessons: 0,
    completions: 0,
  });

  // Fetch dashboard stats
  useEffect(() => {
    const fetchDashboardStats = async () => {
      // In a real application, fetch actual data from your backend here
      // This is placeholder data for UI demonstration
      setStats({
        totalStudents: 42,
        totalLessons: 18,
        completions: 156,
      });
    };

    if (isAdminAuthenticated) {
      fetchDashboardStats();
    }
  }, [isAdminAuthenticated]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="animate-pulse text-indigo-400 text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAdminAuthenticated) {
    // AuthContext will handle redirecting, but just in case:
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="text-red-400">Authentication required. Redirecting...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
          Admin Dashboard
        </h1>
        <p className="text-indigo-200/70 mt-2">
          Manage PyLab courses, students, and monitor progress
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-indigo-500/20 bg-slate-900/80 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-indigo-200">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              {stats.totalStudents}
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-indigo-500/20 bg-slate-900/80 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-indigo-200">Total Lessons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              {stats.totalLessons}
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-indigo-500/20 bg-slate-900/80 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-indigo-200">Lesson Completions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              {stats.completions}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Access */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-indigo-100">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/admin/lessons" className="w-full">
            <Card className="border-indigo-500/20 bg-slate-900/80 backdrop-blur-sm hover:bg-slate-800/80 transition-colors">
              <CardHeader>
                <CardTitle className="text-indigo-200">Manage Lessons</CardTitle>
                <CardDescription className="text-indigo-200/70">
                  Create, edit or delete lessons
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-indigo-500/80 to-purple-500/80 hover:from-indigo-600 hover:to-purple-600">
                  Go to Lessons
                </Button>
              </CardFooter>
            </Card>
          </Link>
          
          <Link href="/admin/students" className="w-full">
            <Card className="border-indigo-500/20 bg-slate-900/80 backdrop-blur-sm hover:bg-slate-800/80 transition-colors">
              <CardHeader>
                <CardTitle className="text-indigo-200">Manage Students</CardTitle>
                <CardDescription className="text-indigo-200/70">
                  View and manage student accounts
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-indigo-500/80 to-purple-500/80 hover:from-indigo-600 hover:to-purple-600">
                  Go to Students
                </Button>
              </CardFooter>
            </Card>
          </Link>
          
          <Link href="/editor" className="w-full">
            <Card className="border-indigo-500/20 bg-slate-900/80 backdrop-blur-sm hover:bg-slate-800/80 transition-colors">
              <CardHeader>
                <CardTitle className="text-indigo-200">Test Lab Environment</CardTitle>
                <CardDescription className="text-indigo-200/70">
                  Test the Python execution environment
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-indigo-500/80 to-purple-500/80 hover:from-indigo-600 hover:to-purple-600">
                  Open Editor
                </Button>
              </CardFooter>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}