import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useI18n } from "../i18n/I18nProvider";

// Если у тебя в AuthContext другой экспорт — скажи, подстрою.
// Я делаю максимально “безопасно”, чтобы не падало.
import { useAuth } from "../AuthContext";

type PublicProfile = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  about: string | null;
  created_at?: string | null;
};

type FeedPost = {
  id: string;
  content: string | null;
  created_at: string | null;
};

export default function ProfilePage() {
  const { t } = useI18n();
  const nav = useNavigate();
  const params = useParams<{ id?: string }>();

  const auth = (() => {
    try {
      // @ts-ignore
      return useAuth?.();
    } catch {
      return null;
    }
  })();

  const currentUserId: string | null =
    // @ts-ignore
    auth?.user?.id ?? auth?.session?.user?.id ?? null;

  const viewedUserId = params.id ?? currentUserId;
  const isOwnProfile = useMemo(() => {
    if (!currentUserId || !viewedUserId) return false;
    return currentUserId === viewedUserId;
  }, [currentUserId, viewedUserId]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState<PublicProfile | null>(null);

  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [about, setAbout] = useState("");

  const [postsLoading, setPostsLoading] = useState(false);
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [postsError, setPostsError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setPostsError(null);

      if (!viewedUserId) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("public_profiles")
        .select("id, full_name, avatar_url, about, created_at")
        .eq("id", viewedUserId)
        .maybeSingle();

      if (cancelled) return;

      if (error) {
        console.error(error);
        setProfile(null);
      } else {
        setProfile(data as any);
        setFullName((data?.full_name ?? "") as string);
        setAvatarUrl((data?.avatar_url ?? "") as string);
        setAbout((data?.about ?? "") as string);
      }

      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [viewedUserId]);

  useEffect(() => {
    let cancelled = false;

    async function loadPosts() {
      if (!viewedUserId) return;
      setPostsLoading(true);
      setPostsError(null);

      // Если в твоей таблице feed_posts другой столбец (например author_id) — скажи, я поправлю.
      const { data, error } = await supabase
        .from("feed_posts")
        .select("id, content, created_at")
        .eq("user_id", viewedUserId)
        .order("created_at", { ascending: false })
        .limit(30);

      if (cancelled) return;

      if (error) {
        console.error(error);
        setPosts([]);
        setPostsError("Не удалось загрузить посты (проверь колонку user_id в feed_posts).");
      } else {
        setPosts((data ?? []) as any);
      }

      setPostsLoading(false);
    }

    loadPosts();
    return () => {
      cancelled = true;
    };
  }, [viewedUserId]);

  async function onSave() {
    if (!isOwnProfile || !currentUserId) return;

    setSaving(true);
    try {
      const payload: PublicProfile = {
        id: currentUserId,
        full_name: fullName.trim() || null,
        avatar_url: avatarUrl.trim() || null,
        about: about.trim() || null,
      };

      const { error } = await supabase.from("public_profiles").upsert(payload, {
        onConflict: "id",
      });

      if (error) throw error;

      // обновим локально
      setProfile((p) => ({
        ...(p ?? { id: currentUserId, full_name: null, avatar_url: null, about: null }),
        ...payload,
      }));
    } catch (e) {
      console.error(e);
      alert("Ошибка сохранения профиля. Посмотри консоль.");
    } finally {
      setSaving(false);
    }
  }

  function titleText() {
    // пытаемся использовать твои словари, но если ключей нет — будет fallback.
    // @ts-ignore
    return t?.profile?.title ?? "Профиль";
  }

  if (!viewedUserId) {
    return (
      <div className="p-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-lg font-semibold">{titleText()}</div>
          <div className="text-white/70 mt-2">Нужно войти в аккаунт.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="max-w-3xl mx-auto space-y-4">
        {/* Header card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-white/10 overflow-hidden flex items-center justify-center">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="avatar"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    // если ссылка битая
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <div className="text-white/60 text-xl">👤</div>
              )}
            </div>

            <div className="flex-1">
              <div className="text-xl font-semibold">
                {loading ? "Loading..." : profile?.full_name || "Без имени"}
              </div>
              <div className="text-white/60 text-sm break-all">{viewedUserId}</div>
            </div>

            <button
              type="button"
              onClick={() => nav(-1)}
              className="px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 transition"
            >
              ← Назад
            </button>
          </div>

          <div className="mt-4 text-white/80 whitespace-pre-wrap">
            {loading ? "" : profile?.about || "Пока нет описания."}
          </div>
        </div>

        {/* Edit card (only own) */}
        {isOwnProfile && (
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-4">
            <div className="text-lg font-semibold mb-3">
              {/* @ts-ignore */}
              {t?.profile?.edit ?? "Редактировать профиль"}
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-white/70 text-sm mb-1">
                  {/* @ts-ignore */}
                  {t?.profile?.fullName ?? "Полное имя"}
                </div>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-xl bg-black/30 border border-white/10 px-3 py-2 outline-none focus:border-white/25"
                  placeholder="Например: Ihor Nepomiashchyi"
                />
              </div>

              <div>
                <div className="text-white/70 text-sm mb-1">
                  {/* @ts-ignore */}
                  {t?.profile?.avatar ?? "Ссылка на аватар"}
                </div>
                <input
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="w-full rounded-xl bg-black/30 border border-white/10 px-3 py-2 outline-none focus:border-white/25"
                  placeholder="https://..."
                />
              </div>

              <div>
                <div className="text-white/70 text-sm mb-1">
                  {/* @ts-ignore */}
                  {t?.profile?.about ?? "О себе"}
                </div>
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="w-full min-h-[110px] rounded-xl bg-black/30 border border-white/10 px-3 py-2 outline-none focus:border-white/25"
                  placeholder="Коротко о себе..."
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onSave}
                  disabled={saving}
                  className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 hover:bg-white/15 transition disabled:opacity-60"
                >
                  {saving ? "Сохранение..." : "Сохранить"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setFullName(profile?.full_name ?? "");
                    setAvatarUrl(profile?.avatar_url ?? "");
                    setAbout(profile?.about ?? "");
                  }}
                  className="px-4 py-2 rounded-xl bg-transparent border border-white/10 hover:bg-white/5 transition"
                >
                  Отмена
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Posts */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-4">
          <div className="text-lg font-semibold mb-3">
            {/* @ts-ignore */}
            {t?.profile?.posts ?? "Посты"}
          </div>

          {postsLoading && <div className="text-white/60">Loading...</div>}

          {!postsLoading && postsError && (
            <div className="text-red-300">{postsError}</div>
          )}

          {!postsLoading && !postsError && posts.length === 0 && (
            <div className="text-white/60">Постов пока нет.</div>
          )}

          <div className="space-y-3">
            {posts.map((p) => (
              <div
                key={p.id}
                className="rounded-2xl border border-white/10 bg-black/20 p-3"
              >
                <div className="text-white/50 text-xs mb-1">
                  {p.created_at ? new Date(p.created_at).toLocaleString() : ""}
                </div>
                <div className="text-white/90 whitespace-pre-wrap">
                  {p.content ?? ""}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
