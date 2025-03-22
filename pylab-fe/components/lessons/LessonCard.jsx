import React from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, BookOpen } from "lucide-react";

const LessonCard = ({ lesson }) => {
  // Format the date nicely - handle different date field names
  const dateValue = lesson.createdAt || lesson.created_at || new Date().toISOString();
  const formattedDate = new Date(dateValue).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Estimate reading time (roughly 200 words per minute)
  const wordCount = lesson.content?.split(/\s+/).length || 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  // Handle different ID field names (id, _id, lessonId)
  const lessonId = lesson.id || lesson._id || lesson.lessonId;

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow duration-300 bg-slate-900/80 border-indigo-500/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-indigo-400">{lesson.title}</CardTitle>
        <CardDescription className="flex items-center text-sm text-slate-400 gap-1">
          <Calendar size={14} />
          <span>{formattedDate}</span>
          <span className="mx-1">•</span>
          <Clock size={14} />
          <span>{readingTime} min read</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-slate-300 line-clamp-3">
          {lesson.description || "No description available."}
        </p>
      </CardContent>
      <CardFooter className="pt-2 border-t border-indigo-500/20">
        <Link href={`/lessons/${lessonId}`} className="w-full">
          <Button 
            variant="outline" 
            className="w-full border-indigo-500/30 text-indigo-400 hover:bg-indigo-950/30 flex items-center gap-2"
          >
            <BookOpen size={16} />
            <span>Read Lesson</span>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LessonCard; 