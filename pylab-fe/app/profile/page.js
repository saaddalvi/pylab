"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { getStudentProfile } from "@/lib/services/profileService";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function StudentProfile() {
  const { isStudentAuthenticated, loading, studentToken } = useAuth();
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    rollno: "",
    lessonsCompleted: 0,
    joinedAt: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch student profile data
  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        const data = await getStudentProfile(studentToken);
        
        // Check if the profile data is in the response itself or nested under a property
        const profileData = data.profile || data;
        
        setProfileData({
          name: profileData.name || profileData.fullName || "No name provided",
          email: profileData.email || "No email provided",
          rollno: profileData.rollno || "No Roll Number",
          lessonsCompleted: profileData.lessonsCompleted || 0,
          joinedAt: profileData.joinedAt ? new Date(profileData.joinedAt).toLocaleDateString() : "Unknown",
        });
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching student profile:", err);
        setError("Failed to load profile data");
        setIsLoading(false);
      }
    };

    // Only try to fetch profile when loading is complete and we know the authentication state
    if (!loading) {
      if (isStudentAuthenticated && studentToken) {
        fetchStudentProfile();
      } else {
        setIsLoading(false);
        setError("You must be logged in to view your profile");
      }
    }
  }, [isStudentAuthenticated, loading, studentToken]);

  // Display loading state
  if (isLoading) {
    return (
      <div className="container mx-auto p-4 flex justify-center items-center min-h-[70vh]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Loading Profile...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
  }

  // Display error state
  if (error) {
    return (
      <div className="container mx-auto p-4 flex justify-center items-center min-h-[70vh]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-red-500">Error</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button asChild>
              <Link href="/auth/student/signin">Go to Sign In</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Display profile data
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Summary Card */}
        <Card className="w-full md:w-2/3">
          <CardHeader>
            <CardTitle>Student Profile</CardTitle>
            <CardDescription>Your personal information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-sm text-gray-500">Full Name</h3>
                <p className="text-lg">{profileData.name}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-gray-500">Email</h3>
                <p className="text-lg">{profileData.email}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-gray-500">Roll Number</h3>
                <p className="text-lg">{profileData.rollno}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-gray-500">Joined</h3>
                <p className="text-lg">{profileData.joinedAt}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Summary Card */}
        <Card className="w-full md:w-1/3">
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
            <CardDescription>Track your learning journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-sm text-gray-500">Lessons Completed</h3>
                <p className="text-2xl font-bold">{profileData.lessonsCompleted}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/profile/progress">View Detailed Progress</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}