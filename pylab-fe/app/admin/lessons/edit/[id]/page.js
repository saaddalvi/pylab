"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { getLessonById, updateLesson } from "@/lib/services/lessonService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/form/label";
import { ChevronLeft, Save } from "lucide-react";
import Link from "next/link";

export default function EditLessonPage() {
  const router = useRouter();
  const { id } = useParams();
  const { isAdminAuthenticated, loading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: ""
  });

  // Fetch existing lesson data
  useEffect(() => {
    const fetchLessonData = async () => {
      if (!id) return;
      
      try {
        const result = await getLessonById(id);
        
        if (result.success) {
          // Extract lesson data - handle different API response structures
          const lesson = result.data.lesson || result.data;
          
          setFormData({
            title: lesson.title || "",
            description: lesson.description || "",
            content: lesson.content || ""
          });
        } else {
          setError(result.error || "Failed to fetch lesson data");
        }
      } catch (err) {
        setError("Error loading lesson. Please try again.");
        console.error("Error fetching lesson:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAdminAuthenticated && id) {
      fetchLessonData();
    } else if (!loading) {
      setIsLoading(false);
    }
  }, [id, isAdminAuthenticated, loading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Get admin token from local storage
      const token = localStorage.getItem("admin_token");
      
      if (!token) {
        setError("Authentication token not found. Please log in again.");
        setIsSubmitting(false);
        return;
      }

      const result = await updateLesson(id, formData, token);
      
      if (result.success) {
        router.push("/admin/lessons");
      } else {
        setError(result.error || "Failed to update lesson. Please try again.");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred. Please try again.");
      console.error("Error updating lesson:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auth and loading states
  if (loading || (isLoading && isAdminAuthenticated)) {
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
      <div className="mb-6">
        <Link href="/admin/lessons">
          <Button variant="ghost" className="mb-4 text-indigo-400 -ml-2">
            <ChevronLeft size={18} className="mr-1" />
            Back to Lessons
          </Button>
        </Link>
        
        <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
          Edit Lesson
        </h1>
        <p className="text-indigo-200/70 mt-1">
          Update the content and information for this lesson
        </p>
      </div>

      <Card className="max-w-4xl border-indigo-500/20 bg-slate-900/80 backdrop-blur-sm">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-xl text-indigo-300">Lesson Details</CardTitle>
            <CardDescription className="text-indigo-200/70">
              Make changes to the lesson information below
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Error alert */}
            {error && (
              <div className="bg-red-950/30 p-4 rounded-md border border-red-800/30">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {/* Title field */}
            <div className="space-y-2">
              <Label htmlFor="title">Lesson Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Introduction to Python Variables"
                required
                className="bg-slate-950/50"
              />
            </div>

            {/* Description field */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="A brief introduction to Python variables and data types..."
                required
                rows={3}
                className="w-full rounded-md border border-indigo-500/30 bg-slate-900/60 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 resize-y"
              />
            </div>

            {/* Content field - using Markdown */}
            <div className="space-y-2">
              <Label htmlFor="content">Lesson Content (Markdown)</Label>
              <div className="border border-indigo-500/20 rounded-md bg-slate-950/50">
                <div className="border-b border-indigo-500/20 bg-slate-900/40 px-3 py-1">
                  <p className="text-xs text-slate-400">Markdown supported</p>
                </div>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="# Introduction to Python Variables

In this lesson, we'll learn about Python variables:

## What are Variables?

Variables are containers for storing data values in Python..."
                  required
                  rows={15}
                  className="w-full border-0 bg-transparent px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none resize-y"
                />
              </div>
              <p className="text-xs text-slate-400">
                Use Markdown for formatting. Headers (#, ##), lists (-, *), code blocks (```python), etc.
              </p>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between border-t border-indigo-500/20 pt-6">
            <Link href="/admin/lessons">
              <Button 
                type="button" 
                variant="outline" 
                className="border-indigo-500/30 text-indigo-300 hover:bg-indigo-950/30"
              >
                Cancel
              </Button>
            </Link>
            
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 flex items-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>Save Changes</span>
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
      
      <div className="mt-8 bg-indigo-950/20 border border-indigo-500/20 rounded-md p-4">
        <h3 className="text-lg font-medium text-indigo-300 mb-2">Markdown Preview Tips</h3>
        <ul className="list-disc pl-5 text-slate-300 text-sm space-y-1">
          <li><code className="bg-slate-800 text-indigo-300 px-1 rounded"># Heading 1</code> - For main titles</li>
          <li><code className="bg-slate-800 text-indigo-300 px-1 rounded">## Heading 2</code> - For section titles</li>
          <li><code className="bg-slate-800 text-indigo-300 px-1 rounded">- Item</code> or <code className="bg-slate-800 text-indigo-300 px-1 rounded">* Item</code> - For bullet lists</li>
          <li><code className="bg-slate-800 text-indigo-300 px-1 rounded">```python<br/>print("Hello World")<br/>```</code> - For code blocks</li>
          <li><code className="bg-slate-800 text-indigo-300 px-1 rounded">**bold**</code> - For bold text</li>
          <li><code className="bg-slate-800 text-indigo-300 px-1 rounded">*italic*</code> - For italic text</li>
        </ul>
      </div>
    </div>
  );
}