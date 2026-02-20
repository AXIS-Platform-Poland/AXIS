import React, { useState } from "react";
import "./App.css";
import "./axiro.css";

/** Все экраны приложения */
type Screen = "feed" | "profile" | "reels" | "messenger" | "settings" | "user";

/** Пропсы для экранов (чтобы можно было переключать экран) */
interface ScreenProps {
  onShow: (screen: Screen) => void;
}

/* =========================
 *        ROOT APP
 * ========================= */

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>("feed");

  return (
    <>
      <div id="screens">
        {screen === "feed" && <FeedScreen onShow={setScreen} />}
        {screen === "profile" && <ProfileScreen onShow={setScreen} />}
        {screen === "reels" && <ReelsScreen onShow={setScreen} />}
        {screen === "messenger" && <MessengerScreen onShow={setScreen} />}
        {screen === "settings" && <SettingsScreen onShow={setScreen} />}
      </div>

      <BottomNav active={screen} onChange={setScreen} />
    </>
  );
};

/* =========================
 *        FEED SCREEN
 * ========================= */

const FeedScreen: React.FC<ScreenProps> = ({ onShow }) => {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header-left">
          <div className="app-logo">AX</div>
          <div className="app-title">
            <span className="app-title-main">AXIRO</span>
            <span className="app-title-sub">Сеть для исполнителей</span>
          </div>
        </div>
        <div className="row-gap-8">
          <button className="icon-button">✚</button>
          <button className="icon-button">🔍</button>
        </div>
      </header>

      <main className="app-content">
        {/* АКТИВНЫЕ БРИГАДЫ */}
        <section>
          <div className="row-between mb-8">
            <span className="section-title">АКТИВНЫЕ БРИГАДЫ</span>
            <span className="text-muted" style={{ fontSize: "11px" }}>
              Смотреть все
            </span>
          </div>

          <div
            className="row-gap-12"
            style={{ overflowX: "auto", paddingBottom: "6px" }}
          >
            <div className="col" style={{ alignItems: "center", minWidth: "60px" }}>
              <div
                className="avatar-sm"
                style={{ border: "1px dashed rgba(129,140,248,0.7)" }}
              >
                +
              </div>
              <span
                className="text-muted"
                style={{ fontSize: "11px", marginTop: "4px" }}
              >
                Вы
              </span>
            </div>

            <AvatarChip initials="MK" label="Mostostal" />
            <AvatarChip initials="PX" label="Polimex" />
            <AvatarChip initials="WD" label="WKS Duna" />
            <AvatarChip initials="NX" label="NEXBUD" />
          </div>
        </section>

        {/* ФИЛЬТРЫ */}
        <section className="mt-12">
          <div
            className="row-gap-8"
            style={{ overflowX: "auto", paddingBottom: "6px" }}
          >
            <span className="badge-pill-accent">Все</span>
            <span className="badge-pill">Проекты</span>
            <span className="badge-pill">Бригады</span>
            <span className="badge-pill">Тендеры</span>
            <span className="badge-pill">Только AXIRO</span>
          </div>
        </section>

        {/* ПОСТ 1 */}
        <section className="mt-16">
          <article className="card-soft" style={{ marginBottom: "12px" }}>
            <div className="row-between">
              <div className="row-gap-10">
                <div className="avatar-sm">IN</div>
                <div className="col">
                  <span style={{ fontSize: "13px", fontWeight: 500 }}>
                    Ihor · INGVARR
                  </span>
                  <span className="text-muted" style={{ fontSize: "11px" }}>
                    Сейчас · Katowice, PL
                  </span>
                </div>
              </div>
              <span className="text-muted" style={{ fontSize: "16px" }}>
                ⋮
              </span>
            </div>

            <p
              className="text-muted mt-10"
              style={{ fontSize: "13px", lineHeight: 1.6 }}
            >
              Запуск моста в процессе. Нужны 4 сварщика MIG/MAG (135/136) на
              ночную смену, окно 72 часа.
            </p>

            <div className="card" style={{ marginTop: "10px", padding: "10px" }}>
              <div className="row-between">
                <div className="col">
                  <span style={{ fontSize: "13px", fontWeight: 500 }}>
                    Проект · Аванбек
                  </span>
                  <span className="text-muted" style={{ fontSize: "11px" }}>
                    Старт: 26 февраля · Силезия
                  </span>
                </div>
                <span className="badge-pill-accent">Открыт</span>
              </div>
              <div className="row-gap-8 mt-8">
                <span className="badge-pill">MIG/MAG 135/136</span>
                <span className="badge-pill">NDT · EN ISO 5817</span>
              </div>
            </div>

            <div
              className="row-between mt-10"
              style={{ fontSize: "12px", color: "var(--text-muted)" }}
            >
              <div className="row-gap-12">
                <span>♡ 32</span>
                <span>💬 9</span>
                <span>↻ 3</span>
              </div>
              <span>Сохранить</span>
            </div>
          </article>

          {/* ПОСТ 2 */}
          <article className="card-soft" style={{ marginBottom: "12px" }}>
            <div className="row-between">
              <div className="row-gap-10">
                <div className="avatar-sm">AX</div>
                <div className="col">
                  <span style={{ fontSize: "13px", fontWeight: 500 }}>
                    AXIRO · Обновления
                  </span>
                  <span className="text-muted" style={{ fontSize: "11px" }}>
                    1 час назад
                  </span>
                </div>
              </div>
            </div>

            <p
              className="text-muted mt-10"
              style={{ fontSize: "13px", lineHeight: 1.6 }}
            >
              Добро пожаловать в раннюю версию AXIRO. Подключайте бригады,
              делитесь реальными проектами и держите всю коммуникацию в одном месте.
            </p>

            <div className="row-gap-8 mt-10">
              <button className="btn btn-primary" style={{ flex: 1 }}>
                Создать проект
              </button>
              <button
                className="btn btn-ghost"
                style={{ flex: 1 }}
                onClick={() => onShow("profile")}
              >
                Профиль бригады
              </button>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
};

/* =========================
 *      PROFILE SCREEN
 * ========================= */

const ProfileScreen: React.FC<ScreenProps> = ({ onShow }) => {
  return (
    <div className="app-shell">
      <header className="profile-header">
        <button className="profile-back-btn" onClick={() => onShow("feed")}>
          ⟵
        </button>

        <div className="profile-header-title">
          <span className="profile-header-name">Ihor · INGVARR</span>
          <span className="profile-header-username">@ingvarr_sp_z_o_o</span>
        </div>

        <button className="profile-menu-btn">☰</button>
      </header>

      <main className="app-content">
        {/* Аватар + статистика */}
        <section style={{ marginBottom: 16 }}>
          <div className="row-between">
            <div className="row-gap-12">
              <div className="avatar">IN</div>
              <div className="col" style={{ justifyContent: "center" }}>
                <span style={{ fontSize: 16, fontWeight: 600 }}>Ihor</span>
                <span className="text-muted" style={{ fontSize: 13 }}>
                  Строительная компания
                </span>
              </div>
            </div>
            <div className="row-gap-12">
              <ProfileStat value="18" label="проекты" />
              <ProfileStat value="4" label="бригады" />
              <ProfileStat value="12" label="отзывы" />
            </div>
          </div>
        </section>

        {/* BIO */}
        <section style={{ marginBottom: 16 }}>
          <div className="col" style={{ gap: 4 }}>
            <span style={{ fontSize: 14, fontWeight: 600 }}>
              INGVARR Sp. z o.o.
            </span>
            <span className="text-muted" style={{ fontSize: 13 }}>
              ♻️ Сварка мостов и металлических конструкций
            </span>
            <span className="text-muted" style={{ fontSize: 13 }}>
              📍 Katowice · Cała Polska
            </span>
            <a
              href="https://www.ingvarr.eu"
              style={{ fontSize: 13, color: "#60a5fa", textDecoration: "none" }}
            >
              www.ingvarr.eu
            </a>
          </div>
        </section>

        {/* КНОПКИ */}
        <section style={{ marginBottom: 16 }}>
          <div className="row-gap-8">
            <button className="btn btn-primary" style={{ flex: 2 }}>
              Редактировать профиль
            </button>
            <button className="btn btn-ghost" style={{ flex: 1 }}>
              Поделиться
            </button>
            <button className="btn btn-ghost" style={{ flex: 1 }}>
              Контакты
            </button>
          </div>
        </section>

        {/* ПРОФЕССИОНАЛЬНАЯ ПАНЕЛЬ */}
        <section style={{ marginBottom: 16 }}>
          <div className="card-soft">
            <div className="row-between">
              <div className="col">
                <span style={{ fontSize: 13, fontWeight: 500 }}>
                  Профессиональная панель
                </span>
                <span className="text-muted" style={{ fontSize: 12 }}>
                  1,2 тыс. просмотров AXIRO-страницы за 30 дней
                </span>
              </div>
              <span style={{ fontSize: 18 }}>↗</span>
            </div>
          </div>
        </section>

        {/* ТАБЫ */}
        <section style={{ marginBottom: 12 }}>
          <div className="row-gap-12" style={{ justifyContent: "space-around" }}>
            <ProfileTab icon="▦" label="Сетка" active />
            <ProfileTab icon="▶" label="Видео" />
            <ProfileTab icon="★" label="Отзывы" />
          </div>
        </section>

        {/* СЕТКА ПРОЕКТОВ */}
        <section>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 4,
            }}
          >
            {["Awanbek", "Most DK79", "Rail Bridge", "Podpory HEB", "NDT", "AXIRO"].map(
              (name) => (
                <div
                  key={name}
                  style={{
                    position: "relative",
                    paddingBottom: "100%",
                    borderRadius: 12,
                    overflow: "hidden",
                    background:
                      "radial-gradient(circle at top, rgba(129,140,248,0.35), rgba(15,23,42,1))",
                    border: "1px solid rgba(148,163,184,0.22)",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 8,
                      display: "flex",
                      alignItems: "flex-end",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 500,
                        color: "#e5e7eb",
                        textShadow: "0 0 8px rgba(15,23,42,0.9)",
                      }}
                    >
                      {name}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

/* =========================
 *        REELS SCREEN
 * ========================= */

const ReelsScreen: React.FC<ScreenProps> = () => {
  const reels = [
    {
      id: 1,
      title: "Ночной запуск моста · Аванбек",
      tags: ["MIG/MAG", "72 часа", "NDT"],
      views: "2,3K",
      likes: "180",
    },
    {
      id: 2,
      title: "Монтаж временных опор HEB 500",
      tags: ["HEB 500", "Подпоры", "Most"],
      views: "1,1K",
      likes: "96",
    },
    {
      id: 3,
      title: "AXIRO · демо ленты и профилей",
      tags: ["AXIRO", "Prototype"],
      views: "560",
      likes: "42",
    },
  ];

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header-left">
          <div className="app-logo">▶</div>
          <div className="app-title">
            <span className="app-title-main">Видео AXIRO</span>
            <span className="app-title-sub">Короткие ролики проектов</span>
          </div>
        </div>
      </header>

      <main className="app-content reels-content">
        <div className="reels-list">
          {reels.map((reel) => (
            <article key={reel.id} className="reel-card">
              <div className="reel-video-dummy">
                <div className="reel-gradient-overlay" />
                <div className="reel-chip">00:30</div>
              </div>

              <div className="reel-info">
                <div className="row-between">
                  <div className="col">
                    <span className="reel-title">{reel.title}</span>
                    <div className="row-gap-8" style={{ marginTop: 4 }}>
                      {reel.tags.map((tag) => (
                        <span key={tag} className="badge-pill">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="col" style={{ alignItems: "flex-end" }}>
                    <span className="reel-stat">
                      👁 {reel.views} · ♡ {reel.likes}
                    </span>
                    <div className="row-gap-8" style={{ marginTop: 6 }}>
                      <button className="icon-button">▶</button>
                      <button className="icon-button">🔇</button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};

/* =========================
 *      MESSENGER SCREEN
 * ========================= */

const MessengerScreen: React.FC<ScreenProps> = () => {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header-left">
          <div className="app-logo">✉</div>
          <div className="app-title">
            <span className="app-title-main">Чаты</span>
            <span className="app-title-sub">Сообщения и переговоры</span>
          </div>
        </div>
      </header>

      <main className="app-content">
        <section className="card-soft">
          <h3 style={{ margin: 0, fontSize: 15 }}>Сообщения AXIRO</h3>
          <p className="text-muted" style={{ marginTop: 6, fontSize: 13 }}>
            Здесь будут диалоги с бригадами, заказчиками и командами. Сейчас это
            прототип интерфейса, позже подключим Supabase и realtime.
          </p>
          <div className="mt-12 row-gap-8">
            <button className="btn btn-primary">Открыть тестовый чат</button>
            <button className="btn btn-ghost">Создать новый диалог</button>
          </div>
        </section>
      </main>
    </div>
  );
};

/* =========================
 *      SETTINGS SCREEN
 * ========================= */

const SettingsScreen: React.FC<ScreenProps> = () => {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header-left">
          <div className="app-logo">⚙</div>
          <div className="app-title">
            <span className="app-title-main">Настройки</span>
            <span className="app-title-sub">AXIRO · ранний доступ</span>
          </div>
        </div>
      </header>

      <main className="app-content">
        <section className="card-soft" style={{ marginBottom: 12 }}>
          <div className="row-between">
            <span style={{ fontSize: 14 }}>Язык интерфейса</span>
            <span className="text-muted" style={{ fontSize: 13 }}>
              RU · EN · PL (скоро)
            </span>
          </div>
        </section>

        <section className="card-soft" style={{ marginBottom: 12 }}>
          <div className="row-between">
            <span style={{ fontSize: 14 }}>Тема</span>
            <span className="text-muted" style={{ fontSize: 13 }}>
              Dark Premium · активна
            </span>
          </div>
        </section>

        <section className="card-soft">
          <div className="row-between">
            <span style={{ fontSize: 14 }}>Уведомления</span>
            <span className="text-muted" style={{ fontSize: 13 }}>
              Настроим после подключения бэкенда
            </span>
          </div>
        </section>
      </main>
    </div>
  );
};

/* =========================
 *  ВСПОМОГАТЕЛЬНЫЕ КОМПОНЕНТЫ
 * ========================= */

interface AvatarChipProps {
  initials: string;
  label: string;
}

const AvatarChip: React.FC<AvatarChipProps> = ({ initials, label }) => (
  <div className="col" style={{ alignItems: "center", minWidth: "60px" }}>
    <div className="avatar-sm">{initials}</div>
    <span className="text-muted" style={{ fontSize: "11px", marginTop: "4px" }}>
      {label}
    </span>
  </div>
);

interface ProfileStatProps {
  value: string;
  label: string;
}

const ProfileStat: React.FC<ProfileStatProps> = ({ value, label }) => (
  <div className="col" style={{ alignItems: "center" }}>
    <span style={{ fontSize: 15, fontWeight: 600 }}>{value}</span>
    <span className="text-muted" style={{ fontSize: 11 }}>
      {label}
    </span>
  </div>
);

interface ProfileTabProps {
  icon: string;
  label: string;
  active?: boolean;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ icon, label, active }) => (
  <button
    className="btn"
    style={{
      flexDirection: "column",
      gap: 2,
      borderRadius: 0,
      borderBottom: active
        ? "2px solid rgba(129,140,248,0.9)"
        : "2px solid transparent",
      padding: "6px 4px",
      color: active ? "var(--accent-strong)" : "var(--text-muted)",
    }}
  >
    <span style={{ fontSize: 16 }}>{icon}</span>
    <span style={{ fontSize: 11 }}>{label}</span>
  </button>
);

interface BottomNavProps {
  active: Screen;
  onChange: (screen: Screen) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ active, onChange }) => {
  const navItemClass = (name: Screen) =>
    "nav-item" + (active === name ? " nav-item-active" : "");

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-inner">
        <button className={navItemClass("feed")} onClick={() => onChange("feed")}>
          <div className="nav-icon">⌂</div>
          <span>Лента</span>
        </button>
        <button
          className={navItemClass("reels")}
          onClick={() => onChange("reels")}
        >
          <div className="nav-icon">▶</div>
          <span>Видео</span>
        </button>
        <button
          className={navItemClass("messenger")}
          onClick={() => onChange("messenger")}
        >
          <div className="nav-icon">✉</div>
          <span>Чаты</span>
        </button>
        <button
          className={navItemClass("profile")}
          onClick={() => onChange("profile")}
        >
          <div className="nav-icon">◎</div>
          <span>Профиль</span>
        </button>
        <button
          className={navItemClass("settings")}
          onClick={() => onChange("settings")}
        >
          <div className="nav-icon">⚙</div>
          <span>Настройки</span>
        </button>
      </div>
    </nav>
  );
};

export default App;
