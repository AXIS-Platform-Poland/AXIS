import { Heart, MessageSquare, Send } from "lucide-react";
import { useState } from "react";

export default function PostCard({
  author,
  time,
  text,
}: {
  author: string;
  time: string;
  text: string;
}) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-900 bg-neutral-950/60">
      <div className="flex items-center gap-3 p-4">
        <div className="h-11 w-11 rounded-2xl bg-neutral-800" />
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold">{author}</div>
          <div className="text-xs text-neutral-400">{time}</div>
        </div>
      </div>

      <div className="px-4 pb-4 text-sm leading-relaxed text-neutral-100">
        {text}
      </div>

      <div className="border-t border-neutral-900">
        <div className="flex items-center gap-2 p-2">
          <button
            onClick={() => setLiked((v) => !v)}
            className={[
              "flex items-center gap-2 rounded-2xl px-4 py-2 text-sm hover:bg-neutral-900/60",
              liked ? "text-red-300" : "text-neutral-200",
            ].join(" ")}
          >
            <Heart size={18} />
            Like
          </button>

          <button className="flex items-center gap-2 rounded-2xl px-4 py-2 text-sm text-neutral-200 hover:bg-neutral-900/60">
            <MessageSquare size={18} />
            Comment
          </button>

          <button className="ml-auto flex items-center gap-2 rounded-2xl px-4 py-2 text-sm text-neutral-200 hover:bg-neutral-900/60">
            <Send size={18} />
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
