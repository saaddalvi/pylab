"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { getAllLessons, deleteLesson } from "@/lib/services/lessonService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { PlusCircle, Trash2, FileEdit, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminLessonsPage() {
  const router = useRouter();
  const { isAdminAuthenticated, loading } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchLessons = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await getAllLessons();
      
      if (result.success) {
        // Check if data is in result.data or result.data.lessons based on API response structure
        const lessonsData = result.data.lessons || result.data;
        setLessons(Array.isArray(lessonsData) ? lessonsData : []);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Failed to fetch lessons. Please try again later.");
      console.error("Error fetching lessons:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAdminAuthenticated) {
      fetchLessons();
    }
  }, [isAdminAuthenticated]);

  const handleDeleteLesson = async (id) => {
    if (confirm("Are you sure you want to delete this lesson? This action cannot be undone.")) {
      setDeletingId(id);
      
      try {
        const token = localStorage.getItem("admin_token");
        const result = await deleteLesson(id, token);
        
        if (result.success) {
          // Remove the lesson from the state
          setLessons(prevLessons => prevLessons.filter(lesson => lesson.id !== id));
        } else {
          alert(`Failed to delete lesson: ${result.error}`);
        }
      } catch (error) {
        console.error("Error deleting lesson:", error);
        alert("An error occurred while trying to delete the lesson.");
      } finally {
        setDeletingId(null);
      }
    }
  };

  // Auth and loading states
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="animate-pulse text-indigo-400 text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAdminAuthenticated) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="text-red-400">Authentication required. Redirecting...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            Manage Lessons
          </h1>
          <p className="text-indigo-200/70 mt-1">
            Create, view, and manage Python lessons
          </p>
        </div>
        <Link href="/admin/lessons/create">
          <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
            <PlusCircle size={16} className="mr-2" />
            Create New Lesson
          </Button>
        </Link>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="h-64 rounded-lg bg-slate-800/50 animate-pulse"></div>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="bg-red-950/30 p-6 rounded-lg border border-red-800/30">
          <h2 className="text-lg font-medium text-red-400 mb-2">Error loading lessons</h2>
          <p className="text-slate-300">{error}</p>
          <Button 
            variant="outline"
            onClick={fetchLessons} 
            className="mt-4 border-red-500/30 text-red-400 hover:bg-red-950/30"
          >
            Try again
          </Button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && lessons.length === 0 && (
        <div className="text-center py-12 bg-slate-900/50 rounded-lg border border-indigo-500/20">
          <BookOpen size={48} className="mx-auto text-indigo-400/60 mb-4" />
          <h2 className="text-xl font-medium text-slate-200 mb-2">No lessons available</h2>
          <p className="text-slate-400 mb-6">Get started by creating your first Python lesson.</p>
          <Link href="/admin/lessons/create">
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
              <PlusCircle size={16} className="mr-2" />
              Create First Lesson
            </Button>
          </Link>
        </div>
      )}

      {/* Lessons List */}
      {!isLoading && !error && lessons.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <Card 
              key={lesson.id} 
              className="h-full flex flex-col bg-slate-900/80 border-indigo-500/20"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-indigo-400 truncate" title={lesson.title}>
                  {lesson.title}
                </CardTitle>
                <CardDescription className="flex items-center text-sm text-slate-400 gap-1">
                  {new Date(lesson.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-slate-300 line-clamp-3">
                  {lesson.description || "No description available."}
                </p>
              </CardContent>
              <CardFooter className="grid grid-cols-3 gap-2 pt-2 border-t border-indigo-500/20">
                <Link href={`/lessons/${lesson.id}`} className="col-span-1">
                  <Button 
                    variant="outline" 
                    className="w-full border-indigo-500/30 text-indigo-400 hover:bg-indigo-950/30"
                    title="View Lesson"
                  >
                    <BookOpen size={16} />
                  </Button>
                </Link>
                <Link href={`/admin/lessons/edit/${lesson.id}`} className="col-span-1">
                  <Button 
                    variant="outline" 
                    className="w-full border-indigo-500/30 text-indigo-400 hover:bg-indigo-950/30"
                    title="Edit Lesson"
                  >
                    <FileEdit size={16} />
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="col-span-1 w-full border-red-500/30 text-red-400 hover:bg-red-950/30"
                  onClick={() => handleDeleteLesson(lesson.id)}
                  disabled={deletingId === lesson.id}
                  title="Delete Lesson"
                >
                  {deletingId === lesson.id ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-400 border-t-transparent" />
                  ) : (
                    <Trash2 size={16} />
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}