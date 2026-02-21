// src/pages/ProfileScreen.tsx
import React from "react";
import AppLayout from "../components/layout/AppLayout";
import ScreenHeader from "../components/layout/ScreenHeader";
import Card from "../components/ui/Card";
import Avatar from "../components/ui/Avatar";
import Button from "../components/ui/Button";

const ProfileScreen: React.FC = () => {
  const projects = [
    { id: 1, name: "Awanbek" },
    { id: 2, name: "Most DK79" },
    { id: 3, name: "Rail Bridge" },
    { id: 4, name: "Most DK79 · NDT" },
    { id: 5, name: "Silesia Steel" },
    { id: 6, name: "Bridge 72h" },
  ];

  return (
    <AppLayout
      header={
        <ScreenHeader
          title="Ihor · INGVARR"
          subtitle="@ingvarr_sp_z_o_o"
          rightSlot={<button className="icon-button">☰</button>}
        />
      }
    >
      {/* Основной блок профиля */}
      <Card className="mt-12">
        {/* Аватар + имя + статистика */}
        <div className="row-between">
          <div className="row-gap-12">
            <Avatar label="IN" />
            <div className="col">
              <strong>Ihor</strong>
              <span className="text-muted">Строительная компания</span>
            </div>
          </div>

          {/* Статистика: проекты / бригады / отзывы */}
          <div className="row-gap-16">
            <div className="col center-text">
              <strong>18</strong>
              <span className="text-muted">проекты</span>
            </div>
            <div className="col center-text">
              <strong>4</strong>
              <span className="text-muted">бригады</span>
            </div>
            <div className="col center-text">
              <strong>12</strong>
              <span className="text-muted">отзывы</span>
            </div>
          </div>
        </div>

        {/* Описание компании */}
        <div className="mt-16">
          <strong>INGVARR Sp. z o.o.</strong>
          <p className="mt-4">
            🛠 Сварка мостов и металлических конструкций
            <br />
            📍 Katowice · Cała Polska
          </p>
          <a
            href="https://www.ingvarr.eu"
            target="_blank"
            rel="noreferrer"
            className="link-primary mt-4"
          >
            www.ingvarr.eu
          </a>
        </div>

        {/* Кнопки действия */}
        <div className="mt-16 row-gap-10">
          <Button>Редактировать профиль</Button>
          <Button variant="ghost">Поделиться</Button>
          <Button variant="ghost">Контакты</Button>
        </div>
      </Card>

      {/* Профессиональная панель */}
      <Card variant="soft" className="mt-12">
        <div className="row-between">
          <div className="col">
            <strong>Профессиональная панель</strong>
            <span className="text-muted mt-4">
              1,2 тыс. просмотров вашей AXIRO-страницы за 30 дней.
            </span>
          </div>
          <span className="text-muted">↗</span>
        </div>
      </Card>

      {/* Вкладки сетки */}
      <Card variant="soft" className="mt-12">
        <div className="row-gap-24">
          <button className="profile-tab profile-tab-active">
            <span>Сетка</span>
          </button>
          <button className="profile-tab">
            <span>Видео</span>
          </button>
          <button className="profile-tab">
            <span>Отзывы</span>
          </button>
        </div>
      </Card>

      {/* Сетка проектов (как плитки) */}
      <section className="mt-12">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "12px",
          }}
        >
          {projects.map((project) => (
            <div key={project.id} className="card-soft profile-grid-tile">
              <span className="text-muted-small">{project.name}</span>
            </div>
          ))}
        </div>
      </section>
    </AppLayout>
  );
};

export default ProfileScreen;
