import React from "react";
import AppLayout from "../components/layout/AppLayout";
import ScreenHeader from "../components/layout/ScreenHeader";
import Card from "../components/ui/Card";
import Avatar from "../components/ui/Avatar";
import Button from "../components/ui/Button";

const FeedScreen: React.FC = () => {
  return (
    <AppLayout
      header={
        <ScreenHeader
          title="AXIRO"
          subtitle="Сеть для исполнителей"
          rightSlot={<button className="icon-button">🔍</button>}
        />
      }
    >
      <h2 className="section-title">АКТИВНЫЕ БРИГАДЫ</h2>

      {/* Пример карточки поста */}
      <Card className="mt-12">
        <div className="row-gap-12">
          <Avatar label="IN" />
          <div className="col">
            <strong>Ihor · INGVARR</strong>
            <span className="text-muted">Сейчас · Katowice, PL</span>
          </div>
        </div>

        <p className="mt-12">
          Запуск моста в процессе. Нужны 4 сварщика MIG/MAG (135/136) на ночную смену, окно 72 часа.
        </p>

        <div className="mt-12 row-gap-8">
          <span className="badge-pill">MIG/MAG 135/136</span>
          <span className="badge-pill">NDT · EN ISO 5817</span>
        </div>

        <div className="mt-16 row-between">
          <span className="text-muted">♡ 32 · 💬 9 · 👀 3</span>
          <Button variant="ghost">Открыть</Button>
        </div>
      </Card>
    </AppLayout>
  );
};

export default FeedScreen;
