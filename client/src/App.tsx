import React, { useState } from 'react';
import './axiro.css';

type Screen = 'feed' | 'profile' | 'reels' | 'messenger' | 'settings' | 'user';

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('feed');

  return (
    <>
      <div id="screens">
        {screen === 'feed' && <FeedScreen onShow={setScreen} />}
        {screen === 'profile' && <ProfileScreen onShow={setScreen} />}
        {/* остальные экраны добавим позже */}
      </div>

      <BottomNav active={screen} onChange={setScreen} />
    </>
  );
};

interface ScreenProps {
  onShow: (screen: Screen) => void;
}

/* ================== ЛЕНТА ================== */

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
        {/* Активные бригады */}
        <section>
          <div className="row-between mb-8">
            <span className="section-title">АКТИВНЫЕ БРИГАДЫ</span>
            <span className="text-muted" style={{ fontSize: '11px' }}>
              Смотреть все
            </span>
          </div>
          <div
            className="row-gap-12"
            style={{ overflowX: 'auto', paddingBottom: '6px' }}
          >
            <div
              className="col"
              style={{ alignItems: 'center', minWidth: '60px' }}
            >
              <div
                className="avatar-sm"
                style={{ border: '1px dashed rgba(129,140,248,0.7)' }}
              >
                +
              </div>
              <span
                className="text-muted"
                style={{ fontSize: '11px', marginTop: '4px' }}
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

        {/* Фильтры */}
        <section className="mt-12">
          <div
            className="row-gap-8"
            style={{ overflowX: 'auto', paddingBottom: '6px' }}
          >
            <span className="badge-pill-accent">Все</span>
            <span className="badge-pill">Проекты</span>
            <span className="badge-pill">Бригады</span>
            <span className="badge-pill">Тендеры</span>
            <span className="badge-pill">Только AXIRO</span>
          </div>
        </section>

        {/* Посты */}
        <section className="mt-16">
          {/* Пост 1 */}
          <article className="card-soft" style={{ marginBottom: '12px' }}>
            <div className="row-between">
              <div className="row-gap-10">
                <div className="avatar-sm">IN</div>
                <div className="col">
                  <span style={{ fontSize: '13px', fontWeight: 500 }}>
                    Ihor · INGVARR
                  </span>
                  <span className="text-muted" style={{ fontSize: '11px' }}>
                    Сейчас · Katowice, PL
                  </span>
                </div>
              </div>
              <span className="text-muted" style={{ fontSize: '16px' }}>
                ⋮
              </span>
            </div>

            <p
              className="text-muted mt-10"
              style={{ fontSize: '13px', lineHeight: 1.6 as number }}
            >
              Запуск моста в процессе. Нужны 4 сварщика MIG/MAG (135/136) на
              ночную смену, окно 72 часа.
            </p>

            <div className="card" style={{ marginTop: '10px', padding: '10px' }}>
              <div className="row-between">
                <div className="col">
                  <span style={{ fontSize: '13px', fontWeight: 500 }}>
                    Проект · Аванбек
                  </span>
                  <span className="text-muted" style={{ fontSize: '11px' }}>
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
              style={{ fontSize: '12px', color: 'var(--text-muted)' }}
            >
              <div className="row-gap-12">
                <span>♡ 32</span>
                <span>💬 9</span>
                <span>↻ 3</span>
              </div>
              <span>Сохранить</span>
            </div>
          </article>

          {/* Пост 2 */}
          <article className="card-soft" style={{ marginBottom: '12px' }}>
            <div className="row-between">
              <div className="row-gap-10">
                <div className="avatar-sm">AX</div>
                <div className="col">
                  <span style={{ fontSize: '13px', fontWeight: 500 }}>
                    AXIRO · Обновления
                  </span>
                  <span className="text-muted" style={{ fontSize: '11px' }}>
                    1 час назад
                  </span>
                </div>
              </div>
            </div>

            <p
              className="text-muted mt-10"
              style={{ fontSize: '13px', lineHeight: 1.6 as number }}
            >
              Добро пожаловать в раннюю версию AXIRO. Подключайте бригады,
              делитесь реальными проектами и держите всю коммуникацию в одном
              месте.
            </p>

            <div className="row-gap-8 mt-10">
              <button className="btn btn-primary" style={{ flex: 1 }}>
                Создать проект
              </button>
              <button
                className="btn btn-ghost"
                style={{ flex: 1 }}
                onClick={() => onShow('profile')}
              >
                Открыть профиль
              </button>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
};

/* ================== ПРОФИЛЬ (как Instagram) ================== */

const ProfileScreen: React.FC<ScreenProps> = ({ onShow }) => {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header-left">
          <button
            className="icon-button"
            style={{ marginRight: 4 }}
            onClick={() => onShow('feed')}
          >
            ‹
          </button>
          <div className="app-title">
            <span className="app-title-main">Ihor · INGVARR</span>
            <span className="app-title-sub">@ingvarr_sp_z_o_o</span>
          </div>
        </div>
        <button className="icon-button">☰</button>
      </header>

      <main className="app-content">
        {/* Верхний блок: аватар + статистика */}
        <section style={{ marginBottom: 16 }}>
          <div className="row-between">
            <div className="row-gap-12">
              <div className="avatar">IN</div>
              <div className="col" style={{ justifyContent: 'center' }}>
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

        {/* Био */}
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
              className="text-muted"
              style={{ fontSize: 13, color: '#60a5fa', textDecoration: 'none' }}
            >
              www.ingvarr.eu
            </a>
          </div>
        </section>

        {/* Кнопки управления */}
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

        {/* Плашка как "Профессиональная панель" */}
        <section style={{ marginBottom: 16 }}>
          <div className="card-soft">
            <div className="row-between">
              <div className="col">
                <span style={{ fontSize: 13, fontWeight: 500 }}>
                  Профессиональная панель
                </span>
                <span className="text-muted" style={{ fontSize: 12 }}>
                  1,2 тыс. просмотров вашей AXIRO-страницы за 30 дней
                </span>
              </div>
              <span style={{ fontSize: 18 }}>↗</span>
            </div>
          </div>
        </section>

        {/* Табы: Сетка / Видео / Отзывы */}
        <section style={{ marginBottom: 12 }}>
          <div className="row-gap-12" style={{ justifyContent: 'space-around' }}>
            <ProfileTab icon="▦" label="Сетка" active />
            <ProfileTab icon="▶" label="Видео" />
            <ProfileTab icon="★" label="Отзывы" />
          </div>
        </section>

        {/* Сетка проектов (упрощённый мок) */}
        <section>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 4,
            }}
          >
            {[
              'Awanbek',
              'Most DK79',
              'Rail Bridge',
              'Podpory HEB',
              'Spawanie NDT',
              'AXIRO Demo',
            ].map((name) => (
              <div
                key={name}
                style={{
                  position: 'relative',
                  paddingBottom: '100%',
                  borderRadius: 12,
                  overflow: 'hidden',
                  background:
                    'radial-gradient(circle at top, rgba(129,140,248,0.35), rgba(15,23,42,1))',
                  border: '1px solid rgba(148,163,184,0.22)',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 8,
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-start',
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 500,
                      color: '#e5e7eb',
                      textShadow: '0 0 8px rgba(15,23,42,0.9)',
                    }}
                  >
                    {name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

interface ProfileStatProps {
  value: string;
  label: string;
}

const ProfileStat: React.FC<ProfileStatProps> = ({ value, label }) => (
  <div className="col" style={{ alignItems: 'center' }}>
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
      flexDirection: 'column',
      gap: 2,
      borderRadius: 0,
      borderBottom: active
        ? '2px solid rgba(129,140,248,0.9)'
        : '2px solid transparent',
      padding: '6px 4px',
      color: active ? 'var(--accent-strong)' : 'var(--text-muted)',
    }}
  >
    <span style={{ fontSize: 16 }}>{icon}</span>
    <span style={{ fontSize: 11 }}>{label}</span>
  </button>
);

/* ================== ВСПОМОГАТЕЛЬНЫЕ КОМПОНЕНТЫ ================== */

interface AvatarChipProps {
  initials: string;
  label: string;
}

const AvatarChip: React.FC<AvatarChipProps> = ({ initials, label }) => (
  <div className="col" style={{ alignItems: 'center', minWidth: '60px' }}>
    <div className="avatar-sm">{initials}</div>
    <span className="text-muted" style={{ fontSize: '11px', marginTop: '4px' }}>
      {label}
    </span>
  </div>
);

interface BottomNavProps {
  active: Screen;
  onChange: (screen: Screen) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ active, onChange }) => {
  const navItemClass = (name: Screen) =>
    'nav-item' + (active === name ? ' nav-item-active' : '');

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-inner">
        <button className={navItemClass('feed')} onClick={() => onChange('feed')}>
          <div className="nav-icon">⌂</div>
          <span>Лента</span>
        </button>
        <button
          className={navItemClass('reels')}
          onClick={() => onChange('reels')}
        >
          <div className="nav-icon">▶</div>
          <span>Видео</span>
        </button>
        <button
          className={navItemClass('messenger')}
          onClick={() => onChange('messenger')}
        >
          <div className="nav-icon">✉</div>
          <span>Чаты</span>
        </button>
        <button
          className={navItemClass('profile')}
          onClick={() => onChange('profile')}
        >
          <div className="nav-icon">◎</div>
          <span>Профиль</span>
        </button>
        <button
          className={navItemClass('settings')}
          onClick={() => onChange('settings')}
        >
          <div className="nav-icon">⚙</div>
          <span>Настройки</span>
        </button>
      </div>
    </nav>
  );
};

export default App;
