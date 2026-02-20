import React from "react";
import AppLayout from "../components/layout/AppLayout";
import ScreenHeader from "../components/layout/ScreenHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const ChatsScreen: React.FC = () => {
  return (
    <AppLayout
      header={
        <ScreenHeader
          title="Чаты"
          subtitle="Сообщения и переговоры"
        />
      }
    >
      <Card className="mt-12">
        <h3>Сообщения AXIRO</h3>
        <p className="text-muted mt-8">
          Здесь будут диалоги с бригадами, заказчиками и командами. Сейчас это прототип интерфейса.
        </p>
        <div className="mt-16 row-gap-12">
          <Button>Открыть тестовый чат</Button>
          <Button variant="ghost">Создать новый диалог</Button>
        </div>
      </Card>
    </AppLayout>
  );
};

export default ChatsScreen;
