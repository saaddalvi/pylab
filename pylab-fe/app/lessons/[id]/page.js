"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getLessonById } from "@/lib/services/lessonService";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, ChevronLeft } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export default function LessonPage() {
  const router = useRouter();
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLesson = async () => {
      if (!id) return;

      setIsLoading(true);
      setError(null);

      try {
        const result = await getLessonById(id);
        
        if (result.success) {
          console.log("Lesson data:", result.data);
          // Extract the lesson from the nested structure
          const lessonData = result.data.lesson || result.data;
          setLesson(lessonData);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError("Failed to fetch lesson. Please try again later.");
        console.error("Error fetching lesson:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLesson();
  }, [id]);

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="animate-pulse">
          <div className="h-8 w-3/4 bg-slate-800/50 rounded mb-4"></div>
          <div className="h-4 w-1/4 bg-slate-800/50 rounded mb-12"></div>
          <div className="space-y-4">
            {[...Array(10)].map((_, index) => (
              <div key={index} className="h-4 bg-slate-800/50 rounded w-full"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/lessons">
          <Button variant="ghost" className="mb-6 text-indigo-400">
            <ChevronLeft size={18} className="mr-1" />
            Back to lessons
          </Button>
        </Link>
        
        <div className="bg-red-950/30 p-6 rounded-lg border border-red-800/30">
          <h1 className="text-lg font-medium text-red-400 mb-2">Error loading lesson</h1>
          <p className="text-slate-300">{error}</p>
        </div>
      </div>
    );
  }

  // No lesson found
  if (!lesson) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/lessons">
          <Button variant="ghost" className="mb-6 text-indigo-400">
            <ChevronLeft size={18} className="mr-1" />
            Back to lessons
          </Button>
        </Link>
        
        <div className="text-center py-12 bg-slate-900/50 rounded-lg border border-indigo-500/20">
          <h1 className="text-xl font-medium text-slate-200 mb-2">Lesson not found</h1>
          <p className="text-slate-400 mb-6">The lesson you're looking for doesn't exist or has been removed.</p>
          <Link href="/lessons">
            <Button variant="outline" className="border-indigo-500/30 text-indigo-400 hover:bg-indigo-950/30">
              Browse All Lessons
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Format the date nicely
  const dateValue = lesson.createdAt || lesson.created_at || new Date().toISOString();
  const formattedDate = new Date(dateValue).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Estimate reading time (roughly 200 words per minute)
  const wordCount = lesson.content?.split(/\s+/).length || 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  // Extract content - different API might use different field names
  const lessonContent = lesson.content || lesson.body || "";

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link href="/lessons">
        <Button variant="ghost" className="mb-6 text-indigo-400">
          <ChevronLeft size={18} className="mr-1" />
          Back to lessons
        </Button>
      </Link>

      <article className="prose prose-invert prose-indigo max-w-none">
        <h1 className="text-3xl font-bold text-indigo-400 mb-2">{lesson.title}</h1>
        
        <div className="flex items-center text-sm text-slate-400 mb-8">
          <Calendar size={16} className="mr-1" />
          <span>{formattedDate}</span>
          <span className="mx-2">•</span>
          <Clock size={16} className="mr-1" />
          <span>{readingTime} min read</span>
        </div>

        {lesson.description && (
          <div className="bg-indigo-950/30 p-4 rounded-lg border border-indigo-500/20 mb-8">
            <p className="text-slate-300 italic">{lesson.description}</p>
          </div>
        )}
        
        <div className="lesson-content text-slate-300">
          <ReactMarkdown>
            {lessonContent}
          </ReactMarkdown>
        </div>
      </article>

      <div className="mt-12 pt-6 border-t border-indigo-500/20">
        <Link href="/lessons">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <ArrowLeft size={18} className="mr-2" />
            Back to all lessons
          </Button>
        </Link>
      </div>
    </div>
  );
}