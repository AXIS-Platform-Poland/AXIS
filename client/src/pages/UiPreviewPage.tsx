import React, { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";

type FeedTab = "forYou" | "friends";

const navItems = [
  { to: "/posts", label: "Home" },
  { to: "/discover", label: "Discover" },
  { to: "/friends", label: "Messenger" },
  { to: "/communities", label: "Communities" },
  { to: "/messages", label: "Messages" },
  { to: "/notifications", label: "Notifications" },
  { to: "/settings", label: "Profile" },
];

function Pill({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 14px",
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.14)",
        background: active ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)",
        color: "rgba(255,255,255,0.92)",
        cursor: "pointer",
        fontWeight: 600,
      }}
    >
      {children}
    </button>
  );
}

function GlassCard({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        borderRadius: 28,
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function GradientLine() {
  return (
    <div
      style={{
        height: 3,
        borderRadius: 999,
        background:
          "linear-gradient(90deg, rgba(0,210,255,1) 0%, rgba(187,120,255,1) 50%, rgba(255,70,170,1) 100%)",
        opacity: 0.9,
      }}
    />
  );
}

export default function UIPreviewPage() {
  const [tab, setTab] = useState<FeedTab>("forYou");
  const [query, setQuery] = useState("");

  const posts = useMemo(() => {
    const base = [
      { id: 1, user: "Sophia L.", time: "2ч назад", text: "Exploring new digital dimension ✨", likes: 1200, comments: 350 },
      { id: 2, user: "Maxim P.", time: "5ч назад", text: "New UI concept: glass + neon", likes: 980, comments: 210 },
      { id: 3, user: "Anna K.", time: "вчера", text: "Working on Axiro feed interactions", likes: 640, comments: 88 },
      { id: 4, user: "TravelGuru", time: "вчера", text: "Top places to visit in 2026 🌍", likes: 1540, comments: 402 },
      { id: 5, user: "Dev Talks", time: "2 дня назад", text: "Routing patterns for scalable apps", likes: 430, comments: 52 },
      { id: 6, user: "Creative Minds", time: "3 дня назад", text: "Design system: spacing & typography", likes: 720, comments: 91 },
    ];

    const filtered = base.filter((p) =>
      p.text.toLowerCase().includes(query.toLowerCase())
    );

    if (tab === "friends") {
      return filtered.filter((p) => p.user === "Sophia L." || p.user === "Anna K." || p.user === "Maxim P.");
    }
    return filtered;
  }, [tab, query]);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 24,
        background:
          "radial-gradient(1200px 800px at 30% 20%, rgba(140,80,255,0.18), transparent 60%)," +
          "radial-gradient(900px 700px at 70% 30%, rgba(0,210,255,0.14), transparent 55%)," +
          "radial-gradient(900px 700px at 50% 90%, rgba(255,70,170,0.10), transparent 55%)," +
          "#0b0e12",
        color: "white",
        fontFamily:
          "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
      }}
    >
      {/* контейнер "3 экрана" */}
      <div
        style={{
          maxWidth: 1220,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "320px 1fr 360px",
          gap: 22,
          alignItems: "start",
        }}
      >
        {/* LEFT */}
        <GlassCard style={{ padding: 22, position: "sticky", top: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 12,
                background:
                  "linear-gradient(135deg, rgba(0,210,255,0.85), rgba(187,120,255,0.85))",
              }}
            />
            <div>
              <div style={{ fontWeight: 900, letterSpacing: 0.4 }}>AXIRO</div>
              <div style={{ opacity: 0.6, fontSize: 12 }}>Menu</div>
            </div>
          </div>

          <div style={{ marginTop: 18 }}>
            <GradientLine />
          </div>

          <div style={{ marginTop: 18, display: "grid", gap: 10 }}>
            {navItems.map((it) => (
              <NavLink
                key={it.to}
                to={it.to}
                style={({ isActive }) => ({
                  textDecoration: "none",
                  color: "rgba(255,255,255,0.88)",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 12px",
                  borderRadius: 16,
                  background: isActive ? "rgba(255,255,255,0.10)" : "transparent",
                  border: "1px solid rgba(255,255,255,0.06)",
                })}
              >
                <span
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.16)",
                    display: "inline-block",
                  }}
                />
                <span style={{ fontWeight: 600 }}>{it.label}</span>
              </NavLink>
            ))}
          </div>

          <div style={{ marginTop: 18 }}>
            <NavLink
              to="/ui"
              style={{
                display: "block",
                textDecoration: "none",
                padding: "12px 14px",
                borderRadius: 18,
                border: "1px solid rgba(255,255,255,0.14)",
                background:
                  "linear-gradient(90deg, rgba(0,210,255,0.22), rgba(187,120,255,0.22))",
                color: "rgba(255,255,255,0.95)",
                fontWeight: 800,
                textAlign: "center",
              }}
            >
              UI Preview (ты сейчас здесь)
            </NavLink>
          </div>
        </GlassCard>

        {/* CENTER */}
        <div>
          <GlassCard style={{ padding: 18 }}>
            <div style={{ fontWeight: 700, opacity: 0.9, textAlign: "center" }}>
              Сейчас активно: 18 друзей • 4 тренда
            </div>

            <div style={{ marginTop: 12 }}>
              <GradientLine />
            </div>

            <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
              <Pill active={tab === "forYou"} onClick={() => setTab("forYou")}>
                Для вас
              </Pill>
              <Pill active={tab === "friends"} onClick={() => setTab("friends")}>
                Друзья
              </Pill>
            </div>

            <div style={{ marginTop: 16 }}>
              <div style={{ fontWeight: 800, marginBottom: 10 }}>Smart Stories</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {["Анна К.", "Максим Р.", "Тренды", "Создать moment", "TravelGuru"].map((t) => (
                  <button
                    key={t}
                    onClick={() => alert(`Stories: ${t}`)}
                    style={{
                      padding: "10px 12px",
                      borderRadius: 14,
                      border: "1px solid rgba(255,255,255,0.14)",
                      background: "rgba(255,255,255,0.06)",
                      color: "rgba(255,255,255,0.9)",
                      cursor: "pointer",
                      fontWeight: 700,
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* composer */}
            <div style={{ marginTop: 18, display: "flex", gap: 10, alignItems: "center" }}>
              <button
                onClick={() => alert("Создать пост")}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.14)",
                  background:
                    "linear-gradient(135deg, rgba(0,210,255,0.22), rgba(187,120,255,0.22))",
                  color: "white",
                  fontSize: 22,
                  fontWeight: 900,
                  cursor: "pointer",
                }}
              >
                +
              </button>
              <div
                style={{
                  flex: 1,
                  padding: "12px 14px",
                  borderRadius: 18,
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "rgba(255,255,255,0.06)",
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                Начните текст…
              </div>
              <button
                onClick={() => alert("Загрузить видео")}
                style={{
                  padding: "10px 12px",
                  borderRadius: 14,
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.92)",
                  cursor: "pointer",
                  fontWeight: 800,
                }}
              >
                Видео
              </button>
            </div>

            {/* feed */}
            <div style={{ marginTop: 18, display: "grid", gap: 14 }}>
              {posts.map((p) => (
                <GlassCard key={p.id} style={{ padding: 14, borderRadius: 22 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: 14,
                          background: "rgba(255,255,255,0.14)",
                        }}
                      />
                      <div>
                        <div style={{ fontWeight: 900 }}>{p.user}</div>
                        <div style={{ opacity: 0.6, fontSize: 12 }}>{p.time}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => alert("Меню поста")}
                      style={{
                        border: "1px solid rgba(255,255,255,0.12)",
                        background: "rgba(255,255,255,0.06)",
                        color: "rgba(255,255,255,0.9)",
                        borderRadius: 12,
                        padding: "8px 10px",
                        cursor: "pointer",
                        fontWeight: 800,
                      }}
                    >
                      ⋯
                    </button>
                  </div>

                  <div style={{ marginTop: 12, fontWeight: 700, opacity: 0.95 }}>
                    {p.text}
                  </div>

                  <div
                    style={{
                      marginTop: 12,
                      height: 180,
                      borderRadius: 18,
                      border: "1px solid rgba(255,255,255,0.10)",
                      background:
                        "linear-gradient(135deg, rgba(0,210,255,0.20), rgba(187,120,255,0.20), rgba(255,70,170,0.18))",
                    }}
                  />

                  <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <button
                      onClick={() => alert("Лайк")}
                      style={{
                        padding: "8px 12px",
                        borderRadius: 14,
                        border: "1px solid rgba(255,255,255,0.14)",
                        background: "rgba(255,255,255,0.06)",
                        color: "rgba(255,255,255,0.9)",
                        cursor: "pointer",
                        fontWeight: 800,
                      }}
                    >
                      ❤️ {p.likes}
                    </button>
                    <button
                      onClick={() => alert("Комментарии")}
                      style={{
                        padding: "8px 12px",
                        borderRadius: 14,
                        border: "1px solid rgba(255,255,255,0.14)",
                        background: "rgba(255,255,255,0.06)",
                        color: "rgba(255,255,255,0.9)",
                        cursor: "pointer",
                        fontWeight: 800,
                      }}
                    >
                      💬 {p.comments}
                    </button>
                    <button
                      onClick={() => alert("Поделиться")}
                      style={{
                        padding: "8px 12px",
                        borderRadius: 14,
                        border: "1px solid rgba(255,255,255,0.14)",
                        background:
                          "linear-gradient(90deg, rgba(0,210,255,0.18), rgba(187,120,255,0.18))",
                        color: "rgba(255,255,255,0.95)",
                        cursor: "pointer",
                        fontWeight: 900,
                      }}
                    >
                      Поделиться
                    </button>
                  </div>
                </GlassCard>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* RIGHT */}
        <GlassCard style={{ padding: 18, position: "sticky", top: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontWeight: 900, fontSize: 18 }}>Search</div>
            <button
              onClick={() => alert("Меню поиска")}
              style={{
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.9)",
                borderRadius: 12,
                padding: "8px 10px",
                cursor: "pointer",
                fontWeight: 900,
              }}
            >
              ≡
            </button>
          </div>

          <div style={{ marginTop: 12 }}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: 16,
                border: "1px solid rgba(255,255,255,0.14)",
                outline: "none",
                background: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.92)",
              }}
            />
          </div>

          <div style={{ marginTop: 16 }}>
            <div style={{ fontWeight: 900, marginBottom: 10 }}>Trending now</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  onClick={() => alert(`Trending card ${i}`)}
                  style={{
                    cursor: "pointer",
                    borderRadius: 16,
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.06)",
                    padding: 10,
                  }}
                >
                  <div
                    style={{
                      height: 54,
                      borderRadius: 12,
                      background:
                        "linear-gradient(135deg, rgba(0,210,255,0.18), rgba(187,120,255,0.18))",
                      border: "1px solid rgba(255,255,255,0.10)",
                    }}
                  />
                  <div style={{ height: 8 }} />
                  <div
                    style={{
                      height: 8,
                      borderRadius: 999,
                      background: "rgba(255,255,255,0.12)",
                    }}
                  />
                  <div style={{ height: 6 }} />
                  <div
                    style={{
                      height: 8,
                      borderRadius: 999,
                      background: "rgba(255,255,255,0.10)",
                      width: "70%",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <div style={{ fontWeight: 900, marginBottom: 10 }}>People you may like</div>
            {[
              { name: "Creative Minds", sub: "1–2 поста в день" },
              { name: "Dev Talks", sub: "1–2 поста в день" },
              { name: "Live Group", sub: "онлайн" },
            ].map((u) => (
              <div
                key={u.name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 10px",
                  borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: "rgba(255,255,255,0.04)",
                  marginBottom: 10,
                }}
              >
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 14,
                      background: "rgba(255,255,255,0.14)",
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: 900 }}>{u.name}</div>
                    <div style={{ opacity: 0.65, fontSize: 12 }}>{u.sub}</div>
                  </div>
                </div>
                <button
                  onClick={() => alert(`Follow: ${u.name}`)}
                  style={{
                    padding: "10px 12px",
                    borderRadius: 14,
                    border: "1px solid rgba(255,255,255,0.14)",
                    background: "rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.92)",
                    cursor: "pointer",
                    fontWeight: 900,
                  }}
                >
                  Follow
                </button>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 14, opacity: 0.65, fontSize: 12 }}>
            Это UI-прототип. Дальше перенесём дизайн в реальные страницы, чтобы всё было “по-настоящему”.
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
