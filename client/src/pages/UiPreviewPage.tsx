export default function UiPreviewPage() {
  return (
    <div className="min-h-[calc(100vh-56px)] w-full">
      {/* фон как в макете */}
      <div className="absolute inset-0 -z-10 bg-[#0b0b0f]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(88,101,242,0.18),transparent_40%),radial-gradient(circle_at_70%_30%,rgba(0,255,200,0.10),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(160,81,255,0.14),transparent_45%)]" />

      <div className="mx-auto flex max-w-6xl items-center justify-center gap-6 px-4 py-10">
        {/* Левый “телефон” */}
        <div className="w-[280px] rounded-[28px] border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-white/10" />
            <div className="text-white">
              <div className="text-sm font-semibold">AXIRO</div>
              <div className="text-xs text-white/60">Menu</div>
            </div>
          </div>

          <div className="mb-4 h-[2px] w-full bg-gradient-to-r from-cyan-400/70 via-purple-500/70 to-pink-500/70" />

          <div className="space-y-2">
            {["Home", "Discover", "Messenger", "Communities", "Messages", "Notifications", "Profile"].map(
              (t) => (
                <div
                  key={t}
                  className="flex items-center gap-3 rounded-xl px-3 py-2 text-white/80 hover:bg-white/10"
                >
                  <div className="h-8 w-8 rounded-full bg-white/10" />
                  <div className="text-sm">{t}</div>
                </div>
              )
            )}
          </div>

          <button className="mt-6 w-full rounded-2xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 px-4 py-3 text-sm font-semibold text-black">
            Create
          </button>
        </div>

        {/* Центр */}
        <div className="w-[360px] rounded-[28px] border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
          <div className="mb-3 text-center text-sm text-white/70">
            Сейчас активно: <span className="text-white">18 друзей</span> •{" "}
            <span className="text-white">4 тренда</span>
          </div>

          <div className="mb-4 h-[2px] w-full bg-gradient-to-r from-cyan-400/70 via-purple-500/70 to-pink-500/70" />

          <div className="mb-4 flex gap-2">
            <button className="rounded-full bg-white/15 px-4 py-2 text-sm text-white">
              Для вас
            </button>
            <button className="rounded-full bg-white/5 px-4 py-2 text-sm text-white/70">
              Друзья
            </button>
          </div>

          <div className="mb-3 text-sm font-semibold text-white">Smart Stories</div>
          <div className="mb-4 flex flex-wrap gap-2">
            {["Анна К.", "Максим Р.", "Тренды", "Создать moment", "TravelGuru"].map((t) => (
              <div
                key={t}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80"
              >
                {t}
              </div>
            ))}
          </div>

          <div className="mb-4 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-400/70 via-purple-500/70 to-pink-500/70" />
            <input
              className="w-full bg-transparent text-sm text-white/80 outline-none placeholder:text-white/40"
              placeholder="Начните текст..."
            />
            <button className="rounded-xl bg-white/10 px-3 py-2 text-xs text-white/80">
              Видео
            </button>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-full bg-white/10" />
                <div>
                  <div className="text-sm font-semibold text-white">Sophia L.</div>
                  <div className="text-xs text-white/50">community • 2ч назад</div>
                </div>
              </div>
              <div className="text-white/60">⋯</div>
            </div>

            <div className="h-44 rounded-2xl bg-gradient-to-br from-cyan-400/30 via-purple-500/25 to-pink-500/25" />
            <div className="mt-3 flex items-center gap-4 text-xs text-white/70">
              <span>❤️ 12k</span>
              <span>💬 350</span>
              <span>🔥 120</span>
              <button className="ml-auto rounded-full bg-white/10 px-3 py-2 text-xs text-white">
                Поддержать
              </button>
            </div>
          </div>
        </div>

        {/* Правый “телефон” */}
        <div className="w-[280px] rounded-[28px] border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm font-semibold text-white">Search</div>
            <div className="text-white/60">≡</div>
          </div>

          <div className="mb-4 rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-white/50">
            Search...
          </div>

          <div className="mb-2 text-sm font-semibold text-white">Trending now</div>
          <div className="mb-4 grid grid-cols-3 gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-2">
                <div className="h-14 rounded-xl bg-gradient-to-br from-cyan-400/20 via-purple-500/20 to-pink-500/20" />
                <div className="mt-2 h-2 w-10 rounded bg-white/10" />
                <div className="mt-1 h-2 w-16 rounded bg-white/10" />
              </div>
            ))}
          </div>

          <div className="mb-2 text-sm font-semibold text-white">People you may like</div>
          <div className="space-y-2">
            {["Creative Minds", "Dev Talks", "Live Group"].map((t) => (
              <div
                key={t}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-3"
              >
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-white/10" />
                  <div>
                    <div className="text-sm text-white">{t}</div>
                    <div className="text-xs text-white/50">1–2 поста в день</div>
                  </div>
                </div>
                <button className="rounded-full bg-white/10 px-3 py-2 text-xs text-white">
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
