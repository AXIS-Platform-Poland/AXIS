import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { supabase } from "../supabaseClient";

type FeedPostRow = {
  id: string;
  created_at: string;
  content: string;
  user_id: string;
};

function timeAgo(iso: string) {
  const d = new Date(iso);
  const diffMs = Date.now() - d.getTime();
  const min = Math.floor(diffMs / 60000);

  if (min < 1) return "только что";
  if (min < 60) return `${min} мин назад`;

  const h = Math.floor(min / 60);
  if (h < 24) return `${h} ч назад`;

  const days = Math.floor(h / 24);
  return `${days} дн назад`;
}

export default function HomePage() {
  const [posts, setPosts] = useState<FeedPostRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("freed_posts")
        .select("id, created_at, content, user_id")
        .order("created_at", { ascending: false });

      if (!mounted) return;

      if (error) {
        setError(error.message);
        setPosts([]);
      } else {
        setPosts((data as FeedPostRow[]) || []);
      }

      setLoading(false);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="grid gap-4">
      <div className="rounded-2xl border border-neutral-900 bg-neutral-950/60 p-4">
        <div className="text-lg font-semibold">Feed</div>
        <div className="mt-1 text-sm text-neutral-400">
          Теперь лента берётся из Supabase: <b>freed_posts</b>
        </div>

        <div className="mt-4 flex gap-2">
          <button className="rounded-2xl border border-neutral-900 bg-neutral-900 px-4 py-2 text-sm hover:bg-neutral-800">
            Create post
          </button>
          <button className="rounded-2xl border border-neutral-900 bg-neutral-950/40 px-4 py-2 text-sm hover:bg-neutral-900/60">
            Upload media
          </button>
        </div>
      </div>

      {loading && (
        <div className="text-sm text-neutral-400">Загружаю посты...</div>
      )}

      {error && (
        <div className="rounded-xl border border-red-900 bg-red-950/30 p-3 text-sm text-red-300">
          Ошибка Supabase: {error}
        </div>
      )}

      {!loading && !error && posts.length === 0 && (
        <div className="text-sm text-neutral-400">
          В таблице <b>freed_posts</b> пока нет постов.
        </div>
      )}

      {posts.map((p) => (
        <PostCard
          key={p.id}
          author={p.user_id}
          time={timeAgo(p.created_at)}
          text={p.content}
        />
      ))}
    </div>
  );
}
