import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "./supabaseClient";

// ---------- Типы ----------

export type Profile = {
  user_id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string | null;
};

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  profile: Profile | null;
  refreshProfile: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  signUpWithEmail: (
    email: string,
    password: string
  ) => Promise<{ needEmailConfirm: boolean }>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

// ---------- Контекст ----------

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// ---------- Вспомогательные функции ----------

async function fetchProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("user_id, email, full_name, avatar_url, bio, created_at")
    .eq("user_id", userId)
    .single();

  if (error) {
    // если профиля нет — просто вернём null
    if (error.code !== "PGRST116") {
      console.error("fetchProfile error:", error.message);
    }
    return null;
  }

  return data as Profile;
}

async function ensureProfile(user: User): Promise<Profile | null> {
  // пытаемся получить существующий профиль
  const existing = await fetchProfile(user.id);
  if (existing) return existing;

  // если профиля нет, попробуем создать (на случай, если триггер не сработал)
  const { data, error } = await supabase
    .from("profiles")
    .insert({
      user_id: user.id,
      email: user.email ?? null,
      full_name: null,
      avatar_url: null,
      bio: null,
    })
    .select("user_id, email, full_name, avatar_url, bio, created_at")
    .single();

  if (error) {
    console.error("ensureProfile insert error:", error.message);
    return null;
  }

  return data as Profile;
}

// ---------- Провайдер ----------

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // первоначальная загрузка
  useEffect(() => {
    let isMounted = true;

    async function init() {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (!isMounted) return;

        if (error) {
          console.error("Error getting session:", error);
          setSession(null);
          setUser(null);
          setProfile(null);
          return;
        }

        const currentSession = data.session ?? null;
        const currentUser = currentSession?.user ?? null;

        setSession(currentSession);
        setUser(currentUser);

        if (currentUser) {
          const p = await ensureProfile(currentUser);
          if (isMounted) setProfile(p);
        } else {
          setProfile(null);
        }
      } catch (e) {
        if (isMounted) console.error("Unexpected auth init error:", e);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    init();

    // подписка на изменения авторизации
    const { data: sub } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        const newUser = newSession?.user ?? null;
        setSession(newSession);
        setUser(newUser);

        if (newUser) {
          // подгружаем профиль, но не блокируем UI
          ensureProfile(newUser)
            .then((p) => setProfile(p))
            .catch((err) =>
              console.error("ensureProfile on auth change error:", err)
            );
        } else {
          setProfile(null);
        }
      }
    );

    return () => {
      isMounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  // ---------- Публичные методы ----------

  const refreshProfile = async () => {
    if (!user) return;
    const p = await fetchProfile(user.id);
    setProfile(p);
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) throw new Error("No authenticated user");

    const payload: Partial<Profile> = {
      ...updates,
      user_id: user.id,
    };

    const { data, error } = await supabase
      .from("profiles")
      .update(payload)
      .eq("user_id", user.id)
      .select("user_id, email, full_name, avatar_url, bio, created_at")
      .single();

    if (error) {
      console.error("updateProfile error:", error.message);
      throw error;
    }

    setProfile(data as Profile);
  };

  const signUpWithEmail = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth`,
      },
    });

    if (error) {
      console.error("signUp error:", error.message);
      throw error;
    }

    const needEmailConfirm = !!data.session === false;
    return { needEmailConfirm };
  };

  const signInWithEmail = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("signIn error:", error.message);
      throw error;
    }

    setSession(data.session);
    setUser(data.session?.user ?? null);

    if (data.session?.user) {
      const p = await ensureProfile(data.session.user);
      setProfile(p);
    } else {
      setProfile(null);
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("signOut error:", error.message);
      throw error;
    }
    setSession(null);
    setUser(null);
    setProfile(null);
  };

  const value: AuthContextValue = {
    session,
    user,
    loading,
    profile,
    refreshProfile,
    updateProfile,
    signUpWithEmail,
    signInWithEmail,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ---------- Хук ----------

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}
