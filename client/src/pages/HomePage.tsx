import PostCard from "../components/PostCard";

export default function HomePage() {
  return (
    <div className="grid gap-4">
      <div className="rounded-2xl border border-neutral-900 bg-neutral-950/60 p-4">
        <div className="text-lg font-semibold">Feed</div>
        <div className="mt-1 text-sm text-neutral-400">
          Everything is clickable — like a real social app.
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

      <PostCard
        author="Ingvarr Sp. z o.o."
        time="2h"
        text="Наконец-то запустили наш проект на Vercel! Всё работает идеально. 😎📈"
      />
      <PostCard
        author="AXIS Platform"
        time="today"
        text="Next step: auth, profiles, messaging, marketplace — we build it."
      />
    </div>
  );
}
