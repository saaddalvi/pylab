"use client";

import { useState, useEffect } from "react";
import { getAllLessons } from "@/lib/services/lessonService";
import LessonCard from "@/components/lessons/LessonCard";
import { BookOpen } from "lucide-react";

export default function LessonsPage() {
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);

  useEffect(() => {
    const fetchLessons = async () => {
      setIsLoading(true);
      setError(null);

      try {
        console.log("Fetching lessons...");
        const result = await getAllLessons();
        console.log("API response:", result);
        
        if (result.success) {
          // Extract lessons array from result.data.lessons
          const lessonsData = result.data.lessons || result.data;
          setLessons(Array.isArray(lessonsData) ? lessonsData : []);
          setDebugInfo(null);
        } else {
          setError(result.error);
          setDebugInfo(JSON.stringify(result, null, 2));
        }
      } catch (err) {
        setError("Failed to fetch lessons. Please try again later.");
        console.error("Error fetching lessons:", err);
        setDebugInfo(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLessons();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-center mb-8 text-indigo-600">Python Lessons</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="h-64 rounded-lg bg-slate-800/50 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-indigo-600">Python Lessons</h1>
          <div className="bg-red-950/30 p-6 rounded-lg border border-red-800/30 max-w-2xl mx-auto">
            <p className="text-red-400 mb-2">Error loading lessons</p>
            <p className="text-slate-300 mb-4">{error}</p>
            
            {debugInfo && (
              <div className="text-left mt-4 bg-slate-800/50 p-4 rounded overflow-auto max-h-60">
                <p className="font-mono text-xs text-slate-300 whitespace-pre-wrap">
                  {debugInfo}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!lessons || lessons.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-center mb-8 text-indigo-600">Python Lessons</h1>
        <div className="text-center py-12 bg-slate-900/50 rounded-lg border border-indigo-500/20 max-w-2xl mx-auto">
          <BookOpen size={48} className="mx-auto text-indigo-400/60 mb-4" />
          <h2 className="text-xl font-medium text-slate-200 mb-2">No lessons available</h2>
          <p className="text-slate-400">Check back soon as we add new Python lessons.</p>
        </div>
      </div>
    );
  }

  // Lessons display
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-indigo-600 mb-2">Python Lessons</h1>
        <p className="text-slate-300 max-w-2xl mx-auto">
          Explore our collection of Python lessons designed to help you master Python programming
          from basics to advanced concepts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <LessonCard key={lesson.id || lesson._id || Math.random()} lesson={lesson} />
        ))}
      </div>
    </div>
  );
}
