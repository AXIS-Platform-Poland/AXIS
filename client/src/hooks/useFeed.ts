// src/hooks/useFeed.ts
import { useEffect, useState } from "react";
import { FeedPost, fetchFeedMock } from "../api/feed";

export function useFeed() {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await fetchFeedMock();
        if (!cancelled) {
          setPosts(data);
          setLoading(false);
        }
      } catch (e) {
        if (!cancelled) {
          setError("Не удалось загрузить ленту");
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { posts, loading, error };
}
