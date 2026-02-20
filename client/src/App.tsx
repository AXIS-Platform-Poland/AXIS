import React, { useState } from 'react';
import './axiro.css';

type Screen = 'feed' | 'profile' | 'reels' | 'messenger' | 'settings' | 'user';

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('feed');

  return (
    <>
      <div id="screens">
        {screen === 'feed' && <FeedScreen onShow={setScreen} />}
        {/* позже добавим остальные экраны:
            {screen === 'profile' && <ProfileScreen onShow={setScreen} />} и т.д.
         */}
      </div>

      <BottomNav active={screen} onChange={setScreen} />
    </>
  );
};

interface ScreenProps {
  onShow: (screen: Screen) => void;
}

/** ЛЕНТА */
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
                onClick={() => onShow('user')}
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

interface AvatarChipProps {
  initials: string;
  label: string;
}

const AvatarChip: React.FC<AvatarChipProps> = ({ initials, label }) => (
  <div
    className="col"
    style={{ alignItems: 'center', minWidth: '60px' }}
  >
    <div className="avatar-sm">{initials}</div>
    <span
      className="text-muted"
      style={{ fontSize: '11px', marginTop: '4px' }}
    >
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
