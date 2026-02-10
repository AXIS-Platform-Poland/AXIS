import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "./supabaseClient";

type Profile = {
  id: string;
  user_id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string | null;
};

type AuthContextValue = {
  loading: boolean;
  session: any | null;
  user: any | null;
  profile: Profile | null;
  refreshProfile: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function fetchProfile(userId: string): Promise<Profile | null> {
  // ВАЖНО: ищем по user_id (так у тебя настроено)
  const { data, error } = await supabase
    .from("profiles")
    .select("id,user_id,email,full_name,avatar_url,bio,created_at")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    console.error("fetchProfile error:", error.message);
    return null;
  }
  return data ?? null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  const refreshProfile = async () => {
    if (!user?.id) {
      setProfile(null);
      return;
    }
    const p = await fetchProfile(user.id);
    setProfile(p);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    // onAuthStateChange сам всё почистит, но на всякий:
    setSession(null);
    setUser(null);
    setProfile(null);
  };

  useEffect(() => {
    let isMounted = true;

    (async () => {
      setLoading(true);

      const { data } = await supabase.auth.getSession();
      const currentSession = data?.session ?? null;

      if (!isMounted) return;

      setSession(currentSession);
      const currentUser = currentSession?.user ?? null;
      setUser(currentUser);

      if (currentUser?.id) {
        const p = await fetchProfile(currentUser.id);
        if (!isMounted) return;
        setProfile(p);
      } else {
        setProfile(null);
      }

      setLoading(false);
    })();

    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      if (!isMounted) return;

      setSession(newSession);
      const newUser = newSession?.user ?? null;
      setUser(newUser);

      if (newUser?.id) {
        const p = await fetchProfile(newUser.id);
        if (!isMounted) return;
        setProfile(p);
      } else {
        setProfile(null);
      }
    });

    return () => {
      isMounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ loading, session, user, profile, refreshProfile, signOut }),
    [loading, session, user, profile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
