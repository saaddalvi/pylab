"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { getAllProgress } from "@/lib/services/progressService";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, CheckCircle, Clock, Award } from "lucide-react";
import Link from "next/link";

export default function ProgressDashboard() {
  const [progressData, setProgressData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if not logged in
    if (!user || !token) {
      router.push("/auth/student/signin");
      return;
    }

    const fetchProgress = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await getAllProgress(token);
        if (result.success) {
          setProgressData(result.data);
        } else {
          setError(result.error);
        }
      } catch (err) {
        console.error("Error fetching progress:", err);
        setError("Failed to load progress data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgress();
  }, [user, token, router]);

  // Calculate overall progress statistics
  const totalLessons = progressData.length;
  const completedLessons = progressData.filter(item => item.completed).length;
  const completionRate = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const avgScore = totalLessons > 0 
    ? Math.round(progressData.reduce((sum, item) => sum + (item.score || 0), 0) / totalLessons) 
    : 0;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-indigo-600 mb-8">Your Learning Progress</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-8 animate-pulse">
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="bg-slate-800/50 h-32 rounded-lg"></div>
          ))}
        </div>
        <div className="bg-slate-800/50 h-64 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-indigo-600 mb-8">Your Learning Progress</h1>
        <div className="bg-red-950/30 p-6 rounded-lg border border-red-800/30">
          <p className="text-red-400 mb-2">Error loading progress data</p>
          <p className="text-slate-300">{error}</p>
          <Button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-indigo-600 hover:bg-indigo-700"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!progressData || progressData.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-indigo-600 mb-8">Your Learning Progress</h1>
        <div className="bg-slate-900/50 p-8 rounded-lg border border-indigo-500/20 text-center">
          <Clock size={48} className="mx-auto text-indigo-400/60 mb-4" />
          <h2 className="text-xl font-medium text-slate-200 mb-2">No progress data yet</h2>
          <p className="text-slate-400 mb-6">Start exploring lessons to track your progress</p>
          <Link href="/lessons">
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
              Explore Lessons
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-indigo-600 mb-8">Your Learning Progress</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-8">
        <Card className="p-6 bg-slate-900 border-indigo-500/20">
          <h2 className="text-slate-400 text-sm font-medium mb-2">Completion Rate</h2>
          <div className="flex items-center">
            <div className="text-3xl font-bold text-white mr-2">{completionRate}%</div>
            <div className="text-slate-400">completed</div>
          </div>
          <div className="mt-4 w-full bg-slate-800 rounded-full h-2.5">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full" 
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </Card>

        <Card className="p-6 bg-slate-900 border-indigo-500/20">
          <h2 className="text-slate-400 text-sm font-medium mb-2">Lessons Completed</h2>
          <div className="flex items-center">
            <div className="text-3xl font-bold text-white mr-2">{completedLessons}</div>
            <div className="text-slate-400">of {totalLessons} lessons</div>
          </div>
          <div className="mt-4 text-indigo-400">
            {completedLessons === totalLessons && totalLessons > 0 ? "All lessons completed!" : "Keep going!"}
          </div>
        </Card>

        <Card className="p-6 bg-slate-900 border-indigo-500/20">
          <h2 className="text-slate-400 text-sm font-medium mb-2">Average Score</h2>
          <div className="flex items-center">
            <div className="text-3xl font-bold text-white mr-2">{avgScore}</div>
            <div className="text-slate-400">points</div>
          </div>
          <div className="mt-4 text-indigo-400">
            {avgScore >= 80 ? "Excellent!" : avgScore >= 60 ? "Good work!" : "Keep practicing!"}
          </div>
        </Card>
      </div>

      {/* Detailed Progress List */}
      <Card className="bg-slate-900 border-indigo-500/20">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-semibold text-white">Lesson Progress</h2>
        </div>
        <div className="divide-y divide-slate-800">
          {progressData.sort((a, b) => {
            // Sort by completion status first, then by date
            if (a.completed !== b.completed) return a.completed ? -1 : 1;
            return new Date(b.startedAt) - new Date(a.startedAt);
          }).map((progress) => (
            <div key={progress.id} className="p-6 flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-4">
                  {progress.completed ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : (
                    <Clock className="h-6 w-6 text-amber-500" />
                  )}
                </div>
                <div>
                  <h3 className="text-white font-medium">{progress.lesson.title}</h3>
                  <div className="flex items-center mt-1">
                    {progress.score && (
                      <div className="flex items-center text-slate-400 mr-4">
                        <Award className="h-4 w-4 mr-1" />
                        <span>{progress.score} points</span>
                      </div>
                    )}
                    <div className="text-slate-400 text-sm">
                      {progress.completed 
                        ? `Completed on ${new Date(progress.completedAt).toLocaleDateString()}` 
                        : `Started on ${new Date(progress.startedAt).toLocaleDateString()}`}
                    </div>
                  </div>
                </div>
              </div>
              <Link href={`/lessons/${progress.lessonId}`}>
                <Button variant="ghost" size="sm" className="text-indigo-400 hover:text-indigo-300 hover:bg-indigo-950/50">
                  <span className="mr-1">{progress.completed ? "Review" : "Continue"}</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}