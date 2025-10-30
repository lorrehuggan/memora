import { type ReactNode, createContext, useContext, useEffect, useState } from "react";

import type { Session, User } from "@/types/auth";

import { authClient } from "./client";

interface AuthContextType {
  session: { user: User; session: Session } | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<{
    user: User;
    session: Session;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const sessionData = authClient.useSession();

  useEffect(() => {
    setSession(sessionData.data);
    setLoading(sessionData.isPending);
  }, [sessionData.data, sessionData.isPending]);

  return <AuthContext.Provider value={{ session, loading }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
