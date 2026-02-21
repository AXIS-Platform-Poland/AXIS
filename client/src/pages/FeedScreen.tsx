// src/pages/FeedScreen.tsx
import React from "react";
import AppLayout from "../components/layout/AppLayout";
import ScreenHeader from "../components/layout/ScreenHeader";
import Card from "../components/ui/Card";
import Avatar from "../components/ui/Avatar";
import Button from "../components/ui/Button";
import { useFeed } from "../hooks/useFeed";

const FeedScreen: React.FC = () => {
  const { posts, loading, error } = useFeed();

  return (
    <AppLayout
      header={
        <ScreenHeader
          title="AXIRO"
          subtitle="Сеть для исполнителей"
          rightSlot={
            <div className="row-gap-8">
              <button className="icon-button">＋</button>
              <button className="icon-button">🔍</button>
            </div>
          }
        />
      }
    >
      {/* Блок «Активные бригады» */}
      <section>
        <h2 className="section-title">АКТИВНЫЕ БРИГАДЫ</h2>

        <div className="row-gap-10 mt-8">
          <button className="badge-pill badge-pill-accent">+ Вы</button>
          <button className="badge-pill">MK · Mostostal</button>
          <button className="badge-pill">PX · Polimex</button>
          <button className="badge-pill">WD · WKS Duna</button>
          <button className="badge-pill">NX · NEXBUD</button>
        </div>

        <div className="row-gap-10 mt-12">
          <button className="badge-pill badge-pill-accent">Все</button>
          <button className="badge-pill">Проекты</button>
          <button className="badge-pill">Бригады</button>
          <button className="badge-pill">Тендеры</button>
          <button className="badge-pill">Только AXIRO</button>
        </div>
      </section>

      {/* Лента постов */}
      <section className="mt-16">
        {loading && (
          <Card variant="soft">
            <p className="text-muted">Загружаем ленту AXIRO…</p>
          </Card>
        )}

        {error && (
          <Card variant="soft">
            <p className="text-muted">{error}</p>
          </Card>
        )}

        {!loading &&
          !error &&
          posts.map((post) => (
            <Card key={post.id} className="mt-12">
              {/* Автор / бригада */}
              <div className="row-gap-12">
                <Avatar label="IN" />
                <div className="col">
                  <strong>
                    {post.author} · {post.company}
                  </strong>
                  <span className="text-muted">Сейчас · {post.location}</span>
                </div>
                <button className="profile-menu-btn">⋯</button>
              </div>

              {/* Текст поста */}
              <p className="mt-12">{post.description}</p>

              {/* Блок проекта */}
              <div className="card-soft mt-12">
                <div className="row-between">
                  <div className="col">
                    <span className="text-muted">Проект</span>
                    <strong>{post.title}</strong>
                  </div>
                  <Button variant="ghost">Открыть</Button>
                </div>
              </div>

              {/* Теги */}
              <div className="mt-12 row-gap-8">
                {post.tags.map((tag) => (
                  <span key={tag} className="badge-pill">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Статистика / действия */}
              <div className="mt-12 row-between">
                <span className="text-muted">
                  ♡ {post.likes} · 💬 {post.comments} · 👀 {post.watchers}
                </span>
                <button className="btn btn-ghost">Сохранить</button>
              </div>
            </Card>
          ))}

        {/* Карточка приветствия AXIRO (как «обновления») */}
        <Card variant="highlight" className="mt-16">
          <div className="row-gap-12">
            <Avatar label="AX" small />
            <div className="col">
              <strong>AXIRO · Обновления</strong>
              <span className="text-muted">ранняя версия · прототип</span>
            </div>
          </div>

          <p className="mt-12">
            Добро пожаловать в раннюю версию AXIRO. Подключайте бригады, делитесь реальными проектами и
            держите всю коммуникацию в одном месте.
          </p>

          <div className="mt-16 row-gap-10">
            <Button>Создать проект</Button>
            <Button variant="ghost">Профиль бригады</Button>
          </div>
        </Card>
      </section>
    </AppLayout>
  );
};

export default FeedScreen;
