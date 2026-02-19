// @ts-nocheck
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const css = `
.premium-profile {
  min-height: 100vh;
  padding-bottom: 96px;
  background: radial-gradient(circle at top, #0f0f0f, #050505);
  color: #ffffff;
  -webkit-font-smoothing: antialiased;
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.premium-profile .page {
  max-width: 960px;
  margin: 0 auto;
  padding: 16px 16px 32px;
}

/* Верх: логотип + статус + иконка меню */
.premium-profile .top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.premium-profile .brand {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.premium-profile .brand-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 12px rgba(34, 197, 94, 0.9);
}

.premium-profile .menu-toggle {
  width: 40px;
  height: 40px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(15, 23, 42, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #ffffff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(16px);
}

.premium-profile .menu-toggle i {
  font-size: 1.1rem;
}

/* Выпадающее меню */
.premium-profile .menu-panel {
  position: fixed;
  top: 64px;
  right: 16px;
  width: 220px;
  background: rgba(15, 23, 42, 0.96);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 22px 60px rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(18px);
  padding: 12px 12px 10px;
  font-size: 0.85rem;
  display: none;
  z-index: 40;
}

.premium-profile .menu-panel.open {
  display: block;
}

.premium-profile .menu-section-title {
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.7rem;
  color: #9ca3af;
  margin: 4px 6px 6px;
}

.premium-profile .menu-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.premium-profile .menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 8px;
  border-radius: 12px;
  cursor: pointer;
  color: #e5e7eb;
  transition: background 0.25s ease, transform 0.25s ease, color 0.25s ease;
}

.premium-profile .menu-item i {
  width: 18px;
  text-align: center;
  color: #007aff;
}

.premium-profile .menu-item:hover {
  background: rgba(31, 41, 55, 0.9);
  transform: translateY(-1px);
  color: #ffffff;
}

.premium-profile .menu-divider {
  height: 1px;
  background: rgba(148, 163, 184, 0.28);
  margin: 8px 0;
}

/* Профиль: карточка */
.premium-profile .profile-header {
  position: relative;
  border-radius: 32px;
  overflow: hidden;
  background: radial-gradient(circle at top, #020617, #020617 40%, #000 100%);
  border: 1px solid rgba(148, 163, 184, 0.45);
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.95);
  margin-bottom: 20px;
}

.premium-profile .header-cover {
  width: 100%;
  height: 180px;
  background-image: url("https://images.pexels.com/photos/167684/pexels-photo-167684.jpeg?auto=compress&cs=tinysrgb&w=1600");
  background-size: cover;
  background-position: center;
  position: relative;
}

/* Аватар */
.premium-profile .avatar-wrapper {
  position: absolute;
  left: 50%;
  bottom: -56px;
  transform: translateX(-50%);
  width: 112px;
  height: 112px;
  border-radius: 999px;
  overflow: hidden;
  box-shadow:
    0 0 0 3px rgba(15, 23, 42, 0.9),
    0 0 0 5px rgba(255, 255, 255, 0.18),
    0 0 32px rgba(255, 255, 255, 0.42);
  background: #111827;
}

.premium-profile .avatar-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Основной блок профиля */
.premium-profile .profile-main {
  padding: 72px 18px 20px;
  text-align: center;
}

.premium-profile .profile-name {
  font-size: 1.7rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  margin-bottom: 4px;
}

.premium-profile .profile-status {
  font-size: 0.8rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #fbbf24;
  margin-bottom: 12px;
}

.premium-profile .profile-type {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.92);
  border: 1px solid rgba(148, 163, 184, 0.6);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.9);
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  margin-bottom: 18px;
  color: #e5e7eb;
}

.premium-profile .profile-type i {
  color: #38bdf8;
}

/* Статистика */
.premium-profile .stats-row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  padding: 0 10px 18px;
}

.premium-profile .stat-item {
  background: rgba(15, 23, 42, 0.96);
  border-radius: 18px;
  border: 1px solid rgba(148, 163, 184, 0.45);
  padding: 12px 6px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.premium-profile .stat-value {
  font-size: 1.15rem;
  font-weight: 600;
}

.premium-profile .stat-label {
  font-size: 0.68rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #9ca3af;
}

/* Кнопки действий */
.premium-profile .actions-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  padding: 0 10px 18px;
}

.premium-profile .btn-ghost,
.premium-profile .btn-main,
.premium-profile .btn-outline {
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(15, 23, 42, 0.9);
  color: #ffffff;
  padding: 10px 18px;
  font-size: 0.85rem;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease,
    background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
  backdrop-filter: blur(14px);
  box-shadow: 0 14px 35px rgba(0, 0, 0, 0.75);
  white-space: nowrap;
}

.premium-profile .btn-main {
  background: #ffffff;
  color: #020617;
  border-color: transparent;
}

.premium-profile .btn-outline {
  background: rgba(15, 23, 42, 0.92);
  border-color: rgba(148, 163, 184, 0.7);
}

.premium-profile .btn-ghost:hover,
.premium-profile .btn-main:hover,
.premium-profile .btn-outline:hover {
  transform: scale(1.05) translateY(-1px);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.85);
}

.premium-profile .btn-ghost i,
.premium-profile .btn-outline i {
  color: #007aff;
}

.premium-profile .btn-main i {
  color: #020617;
}

/* Посты */
.premium-profile .posts-section {
  margin-top: 26px;
}

.premium-profile .posts-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 12px;
  padding: 0 4px;
}

.premium-profile .posts-title {
  font-size: 1rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.premium-profile .posts-subtitle {
  font-size: 0.72rem;
  color: #9ca3af;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

/* Пост на полную ширину, без рамок */
.premium-profile .post-card {
  width: 100%;
  margin: 0 0 26px 0;
  background: none;
  border-radius: 0;
  border: none;
  box-shadow: none;
  overflow: hidden;
}

.premium-profile .post-inner {
  background: linear-gradient(
    to bottom,
    rgba(15, 23, 42, 0.96),
    rgba(15, 23, 42, 0.98)
  );
}

/* Шапка поста */
.premium-profile .post-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px 8px;
}

.premium-profile .post-author {
  display: flex;
  align-items: center;
  gap: 10px;
}

.premium-profile .post-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 0 2px rgba(15, 23, 42, 0.9);
}

.premium-profile .post-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.premium-profile .post-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.premium-profile .post-name {
  font-size: 0.9rem;
  font-weight: 600;
}

.premium-profile .post-tagline {
  font-size: 0.72rem;
  color: #9ca3af;
}

.premium-profile .post-time {
  font-size: 0.7rem;
  color: #9ca3af;
}

.premium-profile .post-menu {
  color: #9ca3af;
  cursor: pointer;
}

/* Текст и картинка */
.premium-profile .post-text {
  padding: 0 16px 10px;
  font-size: 0.9rem;
  line-height: 1.5;
  color: #e5e7eb;
}

.premium-profile .post-image {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 0;
}

/* Футер поста */
.premium-profile .post-footer {
  display: flex;
  justify-content: space-between;
  padding: 10px 16px 12px;
  border-top: 1px solid rgba(31, 41, 55, 0.95);
  font-size: 0.85rem;
  color: #e5e7eb;
}

.premium-profile .post-actions {
  display: flex;
  gap: 14px;
}

.premium-profile .post-action-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  color: #e5e7eb;
  transition: color 0.25s ease, transform 0.25s ease;
}

.premium-profile .post-action-btn i {
  font-size: 0.9rem;
}

.premium-profile .post-action-btn:hover {
  color: #007aff;
  transform: translateY(-1px);
}

/* Адаптив */
@media (min-width: 768px) {
  .premium-profile .header-cover {
    height: 220px;
  }

  .premium-profile .avatar-wrapper {
    width: 128px;
    height: 128px;
    bottom: -64px;
  }

  .premium-profile .profile-main {
    padding-top: 80px;
  }

  .premium-profile .profile-name {
    font-size: 2rem;
  }

  .premium-profile .stats-row {
    padding-inline: 40px;
  }

  .premium-profile .actions-row {
    padding-inline: 40px;
  }

  .premium-profile .post-header,
  .premium-profile .post-text,
  .premium-profile .post-footer {
    padding-inline: 28px;
  }

  .premium-profile .page {
    padding-inline: 24px;
  }
}

@media (max-width: 480px) {
  .premium-profile .profile-header {
    border-radius: 0;
    border-left: none;
    border-right: none;
  }
}
`;

export default function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const displayName =
    user?.user_metadata?.full_name ||
    user?.email ||
    "Ihor Nepomiashchyi";

  const handleMenuClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const panel = document.getElementById("profile-menu-panel");
    const toggle = document.getElementById("profile-menu-toggle");
    if (
      panel &&
      toggle &&
      !panel.contains(target) &&
      !toggle.contains(target)
    ) {
      setMenuOpen(false);
    }
  };

  return (
    <>
      {/* Подключаем локальные стили для профиля */}
      <style>{css}</style>

      <div className="premium-profile" onClick={handleMenuClickOutside}>
        <div className="page">
          {/* Верхний бар */}
          <header className="top-bar">
            <div className="brand">
              <span className="brand-dot" />
              <span>AXIRO PROFILE</span>
            </div>

            <button
              id="profile-menu-toggle"
              className="menu-toggle"
              aria-label="Открыть меню"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen((v) => !v);
              }}
            >
              <i className="fas fa-bars" />
            </button>
          </header>

          {/* Выпадающее меню */}
          <aside
            id="profile-menu-panel"
            className={`menu-panel ${menuOpen ? "open" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="menu-section-title">Навигация</div>
            <ul className="menu-list">
              <li className="menu-item" onClick={() => navigate("/")}>
                <i className="fas fa-house" />
                <span>Главная</span>
              </li>
              <li className="menu-item" onClick={() => navigate("/posts")}>
                <i className="fas fa-clapperboard" />
                <span>Лента / Reels</span>
              </li>
              <li className="menu-item" onClick={() => navigate("/profile")}>
                <i className="fas fa-user" />
                <span>Мой профиль</span>
              </li>
            </ul>

            <div className="menu-divider" />

            <div className="menu-section-title">Язык</div>
            <ul className="menu-list">
              <li className="menu-item">
                <i className="fas fa-globe" />
                <span>Русский</span>
              </li>
              <li className="menu-item">
                <i className="fas fa-language" />
                <span>Polski</span>
              </li>
              <li className="menu-item">
                <i className="fas fa-language" />
                <span>English</span>
              </li>
            </ul>

            <div className="menu-divider" />

            <div className="menu-section-title">Аккаунт</div>
            <ul className="menu-list">
              <li className="menu-item" onClick={() => navigate("/auth")}>
                <i className="fas fa-right-to-bracket" />
                <span>Вход</span>
              </li>
              <li className="menu-item" onClick={() => navigate("/auth")}>
                <i className="fas fa-user-plus" />
                <span>Регистрация</span>
              </li>
              <li className="menu-item">
                <i className="fas fa-arrow-right-from-bracket" />
                <span>Выйти</span>
              </li>
            </ul>
          </aside>

          {/* Карточка профиля */}
          <section className="profile-header" aria-label="Профиль пользователя">
            <div className="header-cover">
              <div className="avatar-wrapper">
                <img
                  src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Аватар"
                />
              </div>
            </div>

            <div className="profile-main">
              <h1 className="profile-name">{displayName}</h1>
              <div className="profile-status">Owner • INGVARR Sp. z o.o.</div>

              <div className="profile-type">
                <i className="fas fa-crown" />
                <span>Профиль компании / личный профиль</span>
              </div>

              <div className="stats-row">
                <div className="stat-item">
                  <div className="stat-value">248</div>
                  <div className="stat-label">Подписки</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">1280</div>
                  <div className="stat-label">Подписчики</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">36</div>
                  <div className="stat-label">Публикации</div>
                </div>
              </div>

              <div className="actions-row">
                <button className="btn-ghost" type="button">
                  <i className="fas fa-id-card" />
                  <span>Обо мне</span>
                </button>
                <button className="btn-outline" type="button">
                  <i className="fas fa-user-plus" />
                  <span>Подписаться</span>
                </button>
                <button className="btn-main" type="button">
                  <i className="fas fa-paper-plane" />
                  <span>Связаться</span>
                </button>
              </div>
            </div>
          </section>

          {/* Секция постов */}
          <section className="posts-section" aria-label="Посты пользователя">
            <div className="posts-header">
              <h2 className="posts-title">Посты</h2>
              <div className="posts-subtitle">
                Личная лента AXIRO / INGVARR
              </div>
            </div>

            {/* Пост 1 (пример) */}
            <article className="post-card">
              <div className="post-inner">
                <header className="post-header">
                  <div className="post-author">
                    <div className="post-avatar">
                      <img
                        src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt="Автор поста"
                      />
                    </div>
                    <div className="post-meta">
                      <div className="post-name">{displayName}</div>
                      <div className="post-tagline">
                        Профессиональный аккаунт • AXIRO
                      </div>
                      <div className="post-time">2 часа назад • Katowice</div>
                    </div>
                  </div>
                  <div className="post-menu">
                    <i className="fas fa-ellipsis" />
                  </div>
                </header>

                <div className="post-text">
                  Новый объект: старт монтажа стальных конструкций для
                  мостового перехода. Команда INGVARR уже на площадке, NDT и
                  документация под контролем.
                </div>

                <img
                  className="post-image"
                  src="https://images.pexels.com/photos/50632/pexels-photo-50632.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt="Проект INGVARR"
                />

                <footer className="post-footer">
                  <div className="post-actions">
                    <div className="post-action-btn">
                      <i className="far fa-heart" />
                      <span>124</span>
                    </div>
                    <div className="post-action-btn">
                      <i className="far fa-comment" />
                      <span>18</span>
                    </div>
                    <div className="post-action-btn">
                      <i className="far fa-bookmark" />
                    </div>
                  </div>
                  <div className="post-action-btn">
                    <i className="fas fa-share" />
                    <span>Поделиться</span>
                  </div>
                </footer>
              </div>
            </article>

            {/* Пост 2 (пример) */}
            <article className="post-card">
              <div className="post-inner">
                <header className="post-header">
                  <div className="post-author">
                    <div className="post-avatar">
                      <img
                        src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt="Автор поста"
                      />
                    </div>
                    <div className="post-meta">
                      <div className="post-name">{displayName}</div>
                      <div className="post-tagline">
                        Строительная компания • INGVARR
                      </div>
                      <div className="post-time">1 день назад • Warszawa</div>
                    </div>
                  </div>
                  <div className="post-menu">
                    <i className="fas fa-ellipsis" />
                  </div>
                </header>

                <div className="post-text">
                  Завершили этап сварки главных балок. Используем только
                  сертифицированные материалы, контроль качества по ISO и
                  полная фото-отчётность для заказчика.
                </div>

                <img
                  className="post-image"
                  src="https://images.pexels.com/photos/220182/pexels-photo-220182.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt="Индустриальный объект"
                />

                <footer className="post-footer">
                  <div className="post-actions">
                    <div className="post-action-btn">
                      <i className="far fa-heart" />
                      <span>89</span>
                    </div>
                    <div className="post-action-btn">
                      <i className="far fa-comment" />
                      <span>9</span>
                    </div>
                    <div className="post-action-btn">
                      <i className="far fa-bookmark" />
                    </div>
                  </div>
                  <div className="post-action-btn">
                    <i className="fas fa-share" />
                    <span>Поделиться</span>
                  </div>
                </footer>
              </div>
            </article>
          </section>
        </div>
      </div>
    </>
  );
}
