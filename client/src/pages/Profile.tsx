// @ts-nocheck
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import supabase from "../supabaseClient";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const displayName =
    user?.user_metadata?.full_name ||
    user?.email ||
    "Ihor Nepomiashchyi";

  const displaySubtitle = "OWNER • INGVARR SP. Z O.O.";

  const goHome = () => navigate("/");
  const goReels = () => navigate("/reels");
  const goCreatePost = () => navigate("/posts");
  const goMessages = () => navigate("/messages");
  const goProfile = () => navigate("/profile");

  return (
    <div className="axiro-profile-root">
      {/* Локальные стили только для этой страницы */}
      <style>{`
        :root {
          --bg-main: #050505;
          --bg-secondary: #0b0b0f;
          --accent-blue: #007AFF;
          --glass-bg: rgba(255,255,255,0.04);
          --glass-border: rgba(255,255,255,0.10);
          --text-main: #ffffff;
          --text-muted: #9ca3af;
          --gold: #fbbf24;
        }

        .axiro-profile-root {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          background:
            radial-gradient(circle at top, #0f0f10 0, #050505 45%, #000 100%);
          color: var(--text-main);
          font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont,
            "Segoe UI", sans-serif;
        }

        .axiro-profile-shell {
          width: 100%;
          max-width: 1100px;
          padding: 16px 16px 96px;
          box-sizing: border-box;
        }

        .axiro-profile-brand {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 14px;
        }

        .axiro-profile-brand-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #22c55e;
          box-shadow: 0 0 12px rgba(34,197,94,0.8);
        }

        /* Карточка профиля */

        .axiro-profile-card {
          position: relative;
          border-radius: 26px;
          background: radial-gradient(circle at top, #0f172a 0, #020617 55%, #02010f 100%);
          overflow: hidden;
          box-shadow:
            0 28px 60px rgba(0,0,0,0.85),
            0 0 0 1px rgba(15,23,42,0.9);
          margin-bottom: 20px;
        }

        .axiro-cover {
          position: relative;
          width: 100%;
          height: 180px;
          overflow: hidden;
        }

        @media (min-width: 768px) {
          .axiro-cover {
            height: 220px;
          }
        }

        .axiro-cover-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.04);
          filter: saturate(1.05) contrast(1.02);
        }

        .axiro-cover-gradient {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to bottom,
              rgba(0,0,0,0.1) 0,
              rgba(0,0,0,0.25) 40%,
              rgba(2,6,23,0.96) 100%);
        }

        .axiro-profile-main {
          padding: 72px 18px 20px;
          position: relative;
        }

        @media (min-width: 768px) {
          .axiro-profile-main {
            padding: 82px 36px 26px;
          }
        }

        .axiro-avatar-wrap {
          position: absolute;
          left: 50%;
          top: -64px;
          transform: translateX(-50%);
          width: 112px;
          height: 112px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at 30% 0%, #ffffff 0, #e5e7eb 30%, #4b5563 100%);
          box-shadow:
            0 0 0 3px rgba(255,255,255,0.22),
            0 0 32px rgba(255,255,255,0.35),
            0 28px 40px rgba(15,23,42,0.9);
        }

        @media (min-width: 768px) {
          .axiro-avatar-wrap {
            width: 132px;
            height: 132px;
            top: -72px;
          }
        }

        .axiro-avatar-img {
          width: 94%;
          height: 94%;
          border-radius: inherit;
          object-fit: cover;
          border: 3px solid rgba(15,23,42,0.9);
        }

        .axiro-profile-header {
          text-align: center;
          margin-bottom: 16px;
        }

        .axiro-profile-name {
          font-size: 1.8rem;
          font-weight: 700;
          letter-spacing: 0.03em;
        }

        @media (min-width: 768px) {
          .axiro-profile-name {
            font-size: 2rem;
          }
        }

        .axiro-profile-subtitle {
          margin-top: 6px;
          font-size: 0.75rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--gold);
        }

        .axiro-profile-badge-row {
          display: flex;
          justify-content: center;
          margin-top: 10px;
        }

        .axiro-profile-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          border-radius: 999px;
          background: rgba(15,23,42,0.96);
          border: 1px solid rgba(148,163,184,0.5);
          font-size: 0.7rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .axiro-profile-badge-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          border-radius: 999px;
          background: rgba(59,130,246,0.15);
          color: var(--accent-blue);
        }

        /* Статистика */

        .axiro-stats-row {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
          margin-top: 16px;
        }

        @media (max-width: 480px) {
          .axiro-stats-row {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 8px;
          }
        }

        .axiro-stat-card {
          padding: 12px 10px 10px;
          border-radius: 16px;
          background: rgba(15,23,42,0.9);
          border: 1px solid rgba(148,163,184,0.45);
          box-shadow: 0 14px 30px rgba(15,23,42,0.85);
        }

        .axiro-stat-value {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .axiro-stat-label {
          font-size: 0.6rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        /* Кнопки действий */

        .axiro-actions-row {
          margin-top: 18px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
        }

        .axiro-btn {
          border: 1px solid var(--glass-border);
          background: var(--glass-bg);
          color: var(--text-main);
          padding: 8px 16px;
          border-radius: 999px;
          font-size: 0.8rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: all 0.25s ease;
          backdrop-filter: blur(10px);
        }

        .axiro-btn-icon {
          width: 18px;
          text-align: center;
          opacity: 0.85;
        }

        .axiro-btn:hover {
          transform: translateY(-1px) scale(1.03);
          box-shadow: 0 14px 30px rgba(0,0,0,0.65);
          background: rgba(255,255,255,0.08);
        }

        .axiro-btn-primary {
          background: #ffffff;
          color: #050505;
          border-color: rgba(255,255,255,0.6);
          box-shadow:
            0 14px 30px rgba(0,0,0,0.85),
            0 0 0 1px rgba(15,23,42,0.9);
        }

        .axiro-btn-primary:hover {
          background: #e5e7eb;
        }

        /* Заголовок постов */

        .axiro-posts-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin: 20px 4px 10px;
        }

        .axiro-posts-title {
          font-size: 1rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .axiro-posts-meta {
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        /* Лента постов */

        .axiro-posts-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .axiro-post {
          width: 100%;
          background:
            linear-gradient(to bottom,
              rgba(15,23,42,0.95),
              rgba(15,23,42,0.98));
          border-radius: 14px;
          border: 1px solid rgba(15,23,42,0.9);
          box-shadow:
            0 22px 40px rgba(0,0,0,0.95),
            0 0 0 1px rgba(15,23,42,0.9);
          overflow: hidden;
        }

        .axiro-post-header {
          display: flex;
          align-items: center;
          padding: 10px 12px 6px;
          gap: 8px;
        }

        .axiro-post-avatar {
          width: 34px;
          height: 34px;
          border-radius: 999px;
          overflow: hidden;
          border: 2px solid rgba(148,163,184,0.8);
        }

        .axiro-post-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .axiro-post-author {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .axiro-post-author-name {
          font-size: 0.9rem;
          font-weight: 600;
        }

        .axiro-post-author-meta {
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        .axiro-post-menu {
          margin-left: auto;
          color: var(--text-muted);
          font-size: 1.2rem;
        }

        .axiro-post-text {
          padding: 4px 12px 10px;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .axiro-post-image {
          width: 100%;
          max-height: 340px;
          overflow: hidden;
        }

        .axiro-post-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .axiro-post-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px 10px;
          font-size: 0.8rem;
          border-top: 1px solid rgba(31,41,55,0.9);
        }

        .axiro-post-actions-left,
        .axiro-post-actions-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .axiro-post-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: var(--text-muted);
          cursor: pointer;
          transition: color 0.2s ease, transform 0.2s ease;
        }

        .axiro-post-action-btn:hover {
          color: var(--accent-blue);
          transform: translateY(-1px);
        }

        .axiro-post-action-icon {
          font-size: 1rem;
        }

        /* Плавающий док (верх+низ) */

        .axiro-floating-dock {
          position: fixed;
          left: 50%;
          transform: translateX(-50%);
          width: min(420px, 96%);
          height: 54px;
          background: rgba(15,23,42,0.9);
          border-radius: 999px;
          border: 1px solid rgba(148,163,184,0.55);
          box-shadow:
            0 18px 35px rgba(0,0,0,0.85),
            0 0 0 1px rgba(15,23,42,1);
          backdrop-filter: blur(18px);
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 0 14px;
          z-index: 40;
        }

        .axiro-floating-dock--top {
          top: 10px;
        }

        .axiro-floating-dock--bottom {
          bottom: 10px;
        }

        @media (min-width: 900px) {
          .axiro-floating-dock--bottom {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .axiro-floating-dock--top {
            display: none;
          }
        }

        .axiro-dock-item {
          flex: 1;
          display: flex;
          justify-content: center;
        }

        .axiro-dock-btn {
          width: 38px;
          height: 38px;
          border-radius: 999px;
          border: none;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.25s ease;
          position: relative;
        }

        .axiro-dock-btn--primary {
          background: radial-gradient(circle at 30% 0%, #38bdf8 0, #007AFF 45%, #4f46e5 100%);
          color: #ffffff;
          width: 48px;
          height: 48px;
          margin-top: -6px;
          box-shadow:
            0 18px 38px rgba(37,99,235,0.85),
            0 0 0 2px rgba(15,23,42,0.95);
        }

        .axiro-dock-btn--avatar {
          padding: 0;
          border-radius: 999px;
          overflow: hidden;
          border: 2px solid rgba(148,163,184,0.9);
        }

        .axiro-dock-btn--avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .axiro-dock-btn:hover {
          transform: translateY(-1px) scale(1.05);
          color: var(--accent-blue);
        }

        .axiro-dock-btn--primary:hover {
          transform: translateY(-2px) scale(1.06);
        }

        .axiro-dock-icon {
          font-size: 1.1rem;
        }

        /* Кнопка меню */

        .axiro-menu-btn-wrap {
          position: absolute;
          top: 16px;
          right: 18px;
        }

        @media (min-width: 768px) {
          .axiro-menu-btn-wrap {
            top: 18px;
            right: 24px;
          }
        }

        .axiro-menu-btn {
          width: 40px;
          height: 40px;
          border-radius: 999px;
          border: 1px solid rgba(148,163,184,0.5);
          background: rgba(15,23,42,0.92);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--text-main);
          box-shadow: 0 18px 40px rgba(0,0,0,0.95);
        }

        .axiro-menu-btn:hover {
          background: rgba(15,23,42,1);
        }

        .axiro-menu-btn-lines {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .axiro-menu-line {
          width: 16px;
          height: 2px;
          border-radius: 999px;
          background: #e5e7eb;
        }

        .axiro-menu-line:nth-child(2) {
          width: 20px;
        }

        .axiro-menu-line:nth-child(3) {
          width: 12px;
        }

        /* Адаптив */

        @media (min-width: 1024px) {
          .axiro-profile-shell {
            padding-top: 70px;
          }
          .axiro-profile-card {
            margin-top: 18px;
          }
        }

      `}</style>

      <div className="axiro-profile-shell">
        {/* Верхний док для десктопа */}
        <nav className="axiro-floating-dock axiro-floating-dock--top">
          <div className="axiro-dock-item">
            <button
              className="axiro-dock-btn"
              onClick={goHome}
              aria-label="Домой"
            >
              <span className="axiro-dock-icon">🏠</span>
            </button>
          </div>
          <div className="axiro-dock-item">
            <button
              className="axiro-dock-btn"
              onClick={goReels}
              aria-label="Reels"
            >
              <span className="axiro-dock-icon">🎬</span>
            </button>
          </div>
          <div className="axiro-dock-item">
            <button
              className="axiro-dock-btn axiro-dock-btn--primary"
              onClick={goCreatePost}
              aria-label="Создать"
            >
              +
            </button>
          </div>
          <div className="axiro-dock-item">
            <button
              className="axiro-dock-btn"
              onClick={goMessages}
              aria-label="Сообщения"
            >
              <span className="axiro-dock-icon">💬</span>
            </button>
          </div>
          <div className="axiro-dock-item">
            <button
              className="axiro-dock-btn axiro-dock-btn--avatar"
              onClick={goProfile}
              aria-label="Профиль"
            >
              <img
                src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
                alt="Profile"
              />
            </button>
          </div>
        </nav>

        {/* Лого / подпись */}
        <div className="axiro-profile-brand">
          <span className="axiro-profile-brand-dot" />
          <span>AXIRO PROFILE</span>
        </div>

        {/* Карточка профиля */}
        <section className="axiro-profile-card" aria-label="Профиль">
          {/* Кнопка меню */}
          <div className="axiro-menu-btn-wrap">
            <button className="axiro-menu-btn" aria-label="Меню">
              <div className="axiro-menu-btn-lines">
                <span className="axiro-menu-line" />
                <span className="axiro-menu-line" />
                <span className="axiro-menu-line" />
              </div>
            </button>
          </div>

          {/* Обложка */}
          <div className="axiro-cover">
            <img
              className="axiro-cover-img"
              src="https://images.pexels.com/photos/1179220/pexels-photo-1179220.jpeg"
              alt="Cover"
            />
            <div className="axiro-cover-gradient" />
          </div>

          {/* Основная часть */}
          <div className="axiro-profile-main">
            {/* Аватар */}
            <div className="axiro-avatar-wrap">
              <img
                className="axiro-avatar-img"
                src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
                alt="Avatar"
              />
            </div>

            {/* Имя / статус */}
            <header className="axiro-profile-header">
              <h1 className="axiro-profile-name">{displayName}</h1>
              <p className="axiro-profile-subtitle">{displaySubtitle}</p>
              <div className="axiro-profile-badge-row">
                <div className="axiro-profile-badge">
                  <span className="axiro-profile-badge-icon">👑</span>
                  <span>Профиль компании / личный профиль</span>
                </div>
              </div>
            </header>

            {/* Статистика */}
            <div className="axiro-stats-row">
              <div className="axiro-stat-card">
                <div className="axiro-stat-value">248</div>
                <div className="axiro-stat-label">Подписки</div>
              </div>
              <div className="axiro-stat-card">
                <div className="axiro-stat-value">1 280</div>
                <div className="axiro-stat-label">Подписчики</div>
              </div>
              <div className="axiro-stat-card">
                <div className="axiro-stat-value">36</div>
                <div className="axiro-stat-label">Публикации</div>
              </div>
            </div>

            {/* Кнопки действий */}
            <div className="axiro-actions-row">
              <button className="axiro-btn" type="button">
                <span className="axiro-btn-icon">📄</span>
                <span>Обо мне</span>
              </button>
              <button className="axiro-btn" type="button">
                <span className="axiro-btn-icon">➕</span>
                <span>Подписаться</span>
              </button>
              <button className="axiro-btn axiro-btn-primary" type="button">
                <span className="axiro-btn-icon">✈️</span>
                <span>Связаться</span>
              </button>
            </div>
          </div>
        </section>

        {/* Заголовок постов */}
        <div className="axiro-posts-header">
          <h2 className="axiro-posts-title">Посты</h2>
          <div className="axiro-posts-meta">
            Личная лента AXIRO / INGVARR
          </div>
        </div>

        {/* Лента постов — две фейковые карточки, только UI */}
        <section className="axiro-posts-list" aria-label="Лента постов">
          {/* Пост 1 */}
          <article className="axiro-post">
            <header className="axiro-post-header">
              <div className="axiro-post-avatar">
                <img
                  src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
                  alt="Author"
                />
              </div>
              <div className="axiro-post-author">
                <div className="axiro-post-author-name">
                  {displayName}
                </div>
                <div className="axiro-post-author-meta">
                  Профессиональный аккаунт • AXIRO · 2 ч назад · Katowice
                </div>
              </div>
              <div className="axiro-post-menu">⋯</div>
            </header>
            <div className="axiro-post-text">
              Новый объект: старт монтажа стальных конструкций для мостового
              перехода. Команда INGVARR уже на площадке, NDT и документация под
              контролем.
            </div>
            <div className="axiro-post-image">
              <img
                src="https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg"
                alt="Project photo"
              />
            </div>
            <footer className="axiro-post-actions">
              <div className="axiro-post-actions-left">
                <button className="axiro-post-action-btn" type="button">
                  <span className="axiro-post-action-icon">❤</span>
                  <span>196</span>
                </button>
                <button className="axiro-post-action-btn" type="button">
                  <span className="axiro-post-action-icon">💬</span>
                  <span>24</span>
                </button>
              </div>
              <div className="axiro-post-actions-right">
                <button className="axiro-post-action-btn" type="button">
                  <span className="axiro-post-action-icon">🔗</span>
                  <span>Поделиться</span>
                </button>
                <button className="axiro-post-action-btn" type="button">
                  <span className="axiro-post-action-icon">⭐</span>
                  <span>В избранное</span>
                </button>
              </div>
            </footer>
          </article>

          {/* Пост 2 */}
          <article className="axiro-post">
            <header className="axiro-post-header">
              <div className="axiro-post-avatar">
                <img
                  src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
                  alt="Author"
                />
              </div>
              <div className="axiro-post-author">
                <div className="axiro-post-author-name">
                  {displayName}
                </div>
                <div className="axiro-post-author-meta">
                  Профессиональный аккаунт • AXIRO · 1 дн назад · Warszawa
                </div>
              </div>
              <div className="axiro-post-menu">⋯</div>
            </header>
            <div className="axiro-post-text">
              Завершили сварку и монтаж очередного пролёта. Контроль качества по
              ISO 5817 В, протоколы NDT и отчёты по моменту затяжки болтов —
              готовы и переданы заказчику.
            </div>
            <div className="axiro-post-image">
              <img
                src="https://images.pexels.com/photos/258160/pexels-photo-258160.jpeg"
                alt="Bridge project"
              />
            </div>
            <footer className="axiro-post-actions">
              <div className="axiro-post-actions-left">
                <button className="axiro-post-action-btn" type="button">
                  <span className="axiro-post-action-icon">❤</span>
                  <span>248</span>
                </button>
                <button className="axiro-post-action-btn" type="button">
                  <span className="axiro-post-action-icon">💬</span>
                  <span>31</span>
                </button>
              </div>
              <div className="axiro-post-actions-right">
                <button className="axiro-post-action-btn" type="button">
                  <span className="axiro-post-action-icon">🔗</span>
                  <span>Поделиться</span>
                </button>
                <button className="axiro-post-action-btn" type="button">
                  <span className="axiro-post-action-icon">⭐</span>
                  <span>В избранное</span>
                </button>
              </div>
            </footer>
          </article>
        </section>
      </div>

      {/* Нижний док для телефона */}
      <nav className="axiro-floating-dock axiro-floating-dock--bottom">
        <div className="axiro-dock-item">
          <button
            className="axiro-dock-btn"
            onClick={goHome}
            aria-label="Домой"
          >
            <span className="axiro-dock-icon">🏠</span>
          </button>
        </div>
        <div className="axiro-dock-item">
          <button
            className="axiro-dock-btn"
            onClick={goReels}
            aria-label="Reels"
          >
            <span className="axiro-dock-icon">🎬</span>
          </button>
        </div>
        <div className="axiro-dock-item">
          <button
            className="axiro-dock-btn axiro-dock-btn--primary"
            onClick={goCreatePost}
            aria-label="Создать"
          >
            +
          </button>
        </div>
        <div className="axiro-dock-item">
          <button
            className="axiro-dock-btn"
            onClick={goMessages}
            aria-label="Сообщения"
          >
            <span className="axiro-dock-icon">💬</span>
          </button>
        </div>
        <div className="axiro-dock-item">
          <button
            className="axiro-dock-btn axiro-dock-btn--avatar"
            onClick={goProfile}
            aria-label="Профиль"
          >
            <img
              src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
              alt="Profile"
            />
          </button>
        </div>
      </nav>
    </div>
  );
}
