import React from "react";
import AppLayout from "../components/layout/AppLayout";
import ScreenHeader from "../components/layout/ScreenHeader";
import Card from "../components/ui/Card";
import Avatar from "../components/ui/Avatar";
import Button from "../components/ui/Button";

const ProfileScreen: React.FC = () => {
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
      <Card className="mt-12">
        <div className="row-gap-12">
          <Avatar label="IN" />
          <div className="col">
            <strong>Ihor</strong>
            <span className="text-muted">Строительная компания · проекты</span>
          </div>
        </div>

        <p className="mt-12">
          INGVARR Sp. z o.o. · Сварка мостов и металлических конструкций · Katowice · Cała Polska
        </p>

        <div className="mt-12 row-gap-10">
          <Button>Редактировать профиль</Button>
          <Button variant="ghost">Поделиться</Button>
        </div>
      </Card>
    </AppLayout>
  );
};

export default ProfileScreen;
