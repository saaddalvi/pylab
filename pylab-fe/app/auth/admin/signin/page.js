"use client";

import AuthForm from "@/components/auth/AuthForm";
import { adminSignIn } from "@/lib/services/authService";

export default function AdminSignIn() {
  const handleSignIn = async (formData) => {
    return await adminSignIn(formData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/10 to-slate-950/30"></div>
      <div className="absolute -left-40 top-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
      
      <div className="relative z-10 w-full max-w-md">
        <AuthForm
          type="signin"
          userType="admin"
          onSubmit={handleSignIn}
          redirectPath="/admin/dashboard"
          alternateAuthPath="/auth/admin/signup"
        />
      </div>
    </div>
  );
}