export default function FriendsPage() {
  return (
    <div className="rounded-2xl border border-neutral-900 bg-neutral-950/60 p-4">
      <div className="text-lg font-semibold">Friends</div>
      <div className="mt-2 text-sm text-neutral-400">
        Здесь будет поиск людей, заявки, список друзей, рекомендации.
      </div>

      <div className="mt-4 grid gap-2 md:grid-cols-2">
        {["WKS Duna", "Mostostal", "Polimex", "EXBUD", "HIP Opole"].map((x) => (
          <button
            key={x}
            className="flex items-center justify-between rounded-2xl border border-neutral-900 bg-neutral-950/40 p-4 text-left hover:bg-neutral-900/60"
          >
            <div>
              <div className="font-medium">{x}</div>
              <div className="text-xs text-neutral-400">tap to open profile</div>
            </div>
            <span className="rounded-xl bg-neutral-900 px-3 py-1 text-xs">
              View
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
