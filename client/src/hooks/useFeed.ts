import { useEffect, useState } from "react";
import { FeedPost, fetchFeedMock } from "../api/feed";

export function useFeed() {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedMock().then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  return { posts, loading };
}
