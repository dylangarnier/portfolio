"use client";

import { AuthProvider, useAuth } from "@/lib/auth-context";
import { LoginForm } from "@/components/admin/login-form";
import type { ReactNode } from "react";

function AdminLayoutInner({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return <>{children}</>;
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AuthProvider>
  );
}
