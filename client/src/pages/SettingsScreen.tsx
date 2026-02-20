import React from "react";
import AppLayout from "../components/layout/AppLayout";
import ScreenHeader from "../components/layout/ScreenHeader";
import Card from "../components/ui/Card";

const SettingsScreen: React.FC = () => {
  return (
    <AppLayout
      header={
        <ScreenHeader
          title="Настройки"
          subtitle="AXIRO · ранний доступ"
        />
      }
    >
      <Card className="mt-12">
        <div className="row-between">
          <span>Язык интерфейса</span>
          <span className="text-muted">RU · EN · PL (скоро)</span>
        </div>
      </Card>

      <Card className="mt-12">
        <div className="row-between">
          <span>Тема</span>
          <span className="text-muted">Dark Premium · активна</span>
        </div>
      </Card>

      <Card className="mt-12">
        <div className="row-between">
          <span>Уведомления</span>
          <span className="text-muted">Настроим после подключения бэкенда</span>
        </div>
      </Card>
    </AppLayout>
  );
};

export default SettingsScreen;
