export default function ReelsPage() {
  return (
    <div className="rounded-2xl border border-neutral-900 bg-neutral-950/60 p-4">
      <div className="text-lg font-semibold">Reels</div>
      <div className="mt-2 text-sm text-neutral-400">
        Тут будет видео-лента (как TikTok/IG Reels). Сейчас заглушка.
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[9/16] rounded-2xl border border-neutral-900 bg-neutral-900/40"
          />
        ))}
      </div>
    </div>
  );
}
