"use client";

import AuthForm from "@/components/auth/AuthForm";
import { adminSignUp } from "@/lib/services/authService";

export default function AdminSignUp() {
  const handleSignUp = async (formData) => {
    const result = await adminSignUp(formData);
    if (result.success) {
      // If sign-up successful, we want to redirect to sign-in
      return { ...result, redirectTo: "/auth/admin/signin" };
    }
    return result;
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/10 to-slate-950/30"></div>
      <div className="absolute -right-40 top-40 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
      
      <div className="relative z-10 w-full max-w-md">
        <AuthForm
          type="signup"
          userType="admin"
          onSubmit={handleSignUp}
          redirectPath="/auth/admin/signin"
          alternateAuthPath="/auth/admin/signin"
        />
      </div>
    </div>
  );
}