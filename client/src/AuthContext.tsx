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
  user: any;
  session: any;
  profile: Profile | null;

  refreshProfile: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;

  signUpWithEmail: (email: string, password: string) => Promise<{ needsEmailConfirm: boolean }>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function fetchProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, user_id, email, full_name, avatar_url, bio, created_at")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    console.error("fetchProfile error:", error.message);
    return null;
  }
  return data ?? null;
}

async function ensureProfile(user: any): Promise<void> {
  // Создаём профайл, если его нет (чтобы Settings не показывал Not found)
  const existing = await fetchProfile(user.id);
  if (existing) return;

  const { error } = await supabase.from("profiles").insert({
    user_id: user.id,
    email: user.email ?? null,
    full_name: null,
    avatar_url: null,
    bio: null,
  });

  if (error) {
    // Если политика не даёт insert — увидишь тут ошибку, это важно для диагностики
    console.error("ensureProfile insert error:", error.message);
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  const refreshProfile = async () => {
    if (!user) return;
    const p = await fetchProfile(user.id);
    setProfile(p);
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) throw new Error("Not authenticated");
    const { error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("user_id", user.id);

    if (error) throw error;
    await refreshProfile();
  };

  const signUpWithEmail = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Важно: куда возвращаем после подтверждения письма
        emailRedirectTo: `${window.location.origin}/auth`,
      },
    });

    if (error) throw error;

    // Если включены email confirmations — user есть, но session может быть null до подтверждения
    const needsEmailConfirm = !data.session;

    return { needsEmailConfirm };
  };

  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    setProfile(null);
  };

  useEffect(() => {
    let mounted = true;

    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;

      setSession(data.session ?? null);
      setUser(data.session?.user ?? null);

      if (data.session?.user) {
        await ensureProfile(data.session.user);
        const p = await fetchProfile(data.session.user.id);
        if (mounted) setProfile(p);
      }

      setLoading(false);
    })();

    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      if (!mounted) return;

      setSession(newSession);
      setUser(newSession?.user ?? null);

      if (newSession?.user) {
        await ensureProfile(newSession.user);
        const p = await fetchProfile(newSession.user.id);
        if (mounted) setProfile(p);
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo(
    () => ({
      loading,
      user,
      session,
      profile,
      refreshProfile,
      updateProfile,
      signUpWithEmail,
      signInWithEmail,
      signOut,
    }),
    [loading, user, session, profile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
