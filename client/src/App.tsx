"use client";

import React from "react";

export default function AxiroStyleLanding() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070A12] text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#7C3AED]/20 blur-[90px]" />
        <div className="absolute right-[-120px] top-20 h-[520px] w-[520px] rounded-full bg-[#22D3EE]/18 blur-[90px]" />
        <div className="absolute left-1/3 bottom-[-220px] h-[640px] w-[640px] rounded-full bg-[#60A5FA]/12 blur-[110px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_55%)]" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-14">
        {/* Center group (3 floating panels) */}
        <div className="relative h-[720px] w-full max-w-5xl">
          {/* Left panel */}
          <GlassPanel className="absolute left-0 top-20 hidden h-[520px] w-[290px] -rotate-[6deg] lg:block">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">
                <span className="text-lg font-bold">X</span>
              </div>
              <div className="text-lg font-semibold tracking-wide">AXIRO</div>
            </div>

            <div className="mt-8 h-[2px] w-full rounded-full bg-gradient-to-r from-cyan-400/80 via-indigo-400/80 to-fuchsia-400/80" />

            <nav className="mt-7 space-y-4 text-sm text-white/80">
              <NavItem label="Home" />
              <NavItem label="Discover" />
              <NavItem label="Messenger" />
              <NavItem label="Communities" />
              <NavItem label="Messages" />
              <NavItem label="Notifications" />
              <NavItem label="Profile" />
            </nav>

            <button className="mt-10 w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-fuchsia-500/10 hover:opacity-95">
              Create
            </button>
          </GlassPanel>

          {/* Middle panel (main feed) */}
          <GlassPanel className="absolute left-1/2 top-6 z-20 h-[640px] w-[360px] -translate-x-1/2">
            {/* Top bar */}
            <div className="flex items-center justify-between">
              <div className="text-xs text-white/70">
                Сейчас активно: <span className="text-white/90">18 друзей</span> •{" "}
                <span className="text-white/90">4 тренда</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <div className="h-8 w-8 rounded-full bg-white/10" />
              </div>
            </div>

            {/* Gradient divider */}
            <div className="mt-4 h-[3px] w-full rounded-full bg-gradient-to-r from-cyan-400/80 via-indigo-400/80 to-fuchsia-400/80" />

            {/* Tabs */}
            <div className="mt-4 inline-flex rounded-full bg-white/5 p-1">
              <button className="rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-4 py-2 text-xs font-semibold text-black">
                Для вас
              </button>
              <button className="rounded-full px-4 py-2 text-xs font-medium text-white/70 hover:text-white">
                Друзья
              </button>
            </div>

            {/* Stories */}
            <div className="mt-6">
              <div className="text-sm font-semibold text-white/90">Smart Stories</div>
              <div className="mt-3 flex gap-2">
                <Pill label="Анна К." />
                <Pill label="Максим Р." />
                <Pill label="Тренды" accent />
              </div>
              <div className="mt-3 flex gap-2">
                <Pill label="Создать moment" icon />
                <Pill label="TravelGuru" />
              </div>
            </div>

            {/* Composer */}
            <div className="mt-6 flex items-center gap-3">
              <button className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-black shadow shadow-fuchsia-500/10">
                +
              </button>
              <div className="flex-1 rounded-2xl bg-white/5 px-4 py-3 text-sm text-white/60">
                Начните текст…
              </div>
              <button className="rounded-2xl bg-white/6 px-4 py-3 text-xs font-semibold text-white/80 hover:bg-white/10">
                Видео
              </button>
            </div>

            {/* Feed card */}
            <div className="mt-6 rounded-3xl bg-white/5 p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-white/10" />
                <div>
                  <div className="text-sm font-semibold">Sophia L.</div>
                  <div className="text-xs text-white/60">community • 2ч назад</div>
                </div>
                <div className="ml-auto text-white/50">⋮</div>
              </div>

              <div className="mt-4 overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500/20 via-indigo-500/20 to-fuchsia-500/20">
                <div className="h-44 w-full bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.18),transparent_50%),radial-gradient(circle_at_70%_40%,rgba(217,70,239,0.18),transparent_55%)]" />
              </div>

              <div className="mt-4 text-sm text-white/85">
                Exploring new digital dimension ✨ <span className="text-white/60">#neo</span>{" "}
                <span className="text-white/60">#future</span>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-white/60">
                <div className="flex gap-4">
                  <span>❤ 12k</span>
                  <span>💬 350</span>
                  <span>↗ 120</span>
                </div>
                <button className="rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-4 py-2 text-xs font-semibold text-black">
                  Поддержать
                </button>
              </div>
            </div>

            {/* Bottom nav */}
            <div className="absolute bottom-4 left-1/2 flex w-[92%] -translate-x-1/2 items-center justify-between rounded-3xl bg-white/5 px-5 py-3">
              <BottomIcon label="Home" active />
              <BottomIcon label="Explore" />
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-black shadow shadow-fuchsia-500/10">
                +
              </div>
              <BottomIcon label="Chats" badge />
              <BottomIcon label="Profile" />
            </div>
          </GlassPanel>

          {/* Right panel */}
          <GlassPanel className="absolute right-0 top-24 hidden h-[520px] w-[300px] rotate-[6deg] lg:block">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">Search</div>
              <div className="text-white/60">≡</div>
            </div>

            <div className="mt-5 rounded-2xl bg-white/5 px-4 py-3 text-sm text-white/60">
              Search…
            </div>

            <div className="mt-6">
              <div className="text-sm font-semibold text-white/90">Trending now</div>
              <div className="mt-3 grid grid-cols-3 gap-3">
                <MiniCard />
                <MiniCard />
                <MiniCard />
              </div>
            </div>

            <div className="mt-7">
              <div className="text-sm font-semibold text-white/90">People you may like</div>
              <div className="mt-3 space-y-3">
                <PersonRow name="Creative Minds" />
                <PersonRow name="Dev Talks" />
                <PersonRow name="Live Group" />
              </div>
            </div>

            <div className="mt-7 rounded-3xl bg-white/5 p-4">
              <div className="text-sm font-semibold text-white/90">Your activity</div>
              <div className="mt-3 space-y-2 text-xs text-white/60">
                <div className="flex justify-between"><span>Посты</span><span className="text-white/80">120</span></div>
                <div className="flex justify-between"><span>Подписчики</span><span className="text-white/80">150K</span></div>
                <div className="flex justify-between"><span>Просмотры</span><span className="text-white/80">50K</span></div>
              </div>
            </div>
          </GlassPanel>

          {/* little sparkle */}
          <div className="pointer-events-none absolute bottom-10 right-10 hidden h-10 w-10 rotate-45 lg:block">
            <div className="h-full w-full rounded-xl bg-white/10 blur-[1px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* UI helpers */

function GlassPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded-[34px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function NavItem({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl px-3 py-2 hover:bg-white/5">
      <div className="h-7 w-7 rounded-xl bg-white/10" />
      <span>{label}</span>
    </div>
  );
}

function Pill({ label, accent, icon }: { label: string; accent?: boolean; icon?: boolean }) {
  return (
    <div
      className={[
        "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80",
        accent ? "bg-gradient-to-r from-cyan-400/20 to-fuchsia-500/20" : "",
      ].join(" ")}
    >
      {icon && <span className="grid h-5 w-5 place-items-center rounded-full bg-white/10">+</span>}
      {label}
    </div>
  );
}

function MiniCard() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-2">
      <div className="h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 via-indigo-500/20 to-fuchsia-500/20" />
      <div className="mt-2 h-2 w-10 rounded bg-white/10" />
      <div className="mt-1 h-2 w-14 rounded bg-white/10" />
    </div>
  );
}

function PersonRow({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/5 px-3 py-2">
      <div className="h-9 w-9 rounded-2xl bg-white/10" />
      <div className="flex-1">
        <div className="text-xs font-semibold text-white/90">{name}</div>
        <div className="text-[11px] text-white/60">1–2 поста в день</div>
      </div>
      <button className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-white/80 hover:bg-white/15">
        Follow
      </button>
    </div>
  );
}

function BottomIcon({ label, active, badge }: { label: string; active?: boolean; badge?: boolean }) {
  return (
    <div className="relative grid place-items-center gap-1 text-[10px] text-white/60">
      <div
        className={[
          "grid h-9 w-9 place-items-center rounded-2xl",
          active ? "bg-white/10 text-white" : "bg-transparent",
        ].join(" ")}
      >
        <div className="h-5 w-5 rounded-lg bg-white/15" />
      </div>
      <span className={active ? "text-white/85" : ""}>{label}</span>
      {badge && (
        <span className="absolute right-2 top-1 grid h-4 w-4 place-items-center rounded-full bg-red-500 text-[10px] text-white">
          3
        </span>
      )}
    </div>
  );
}
