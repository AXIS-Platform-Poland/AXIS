import React from "react";
import AppLayout from "../components/layout/AppLayout";
import ScreenHeader from "../components/layout/ScreenHeader";
import Card from "../components/ui/Card";
import Avatar from "../components/ui/Avatar";
import Button from "../components/ui/Button";

const UserScreen: React.FC = () => {
  // пока захардкожим Mostostal как пример
  return (
    <AppLayout
      header={
        <ScreenHeader
          title="Mostostal"
          subtitle="@mostostal_bridge_team"
        />
      }
    >
      <Card className="mt-12">
        <div className="row-gap-12">
          <Avatar label="MK" />
          <div className="col">
            <strong>Mostostal · бригада</strong>
            <span className="text-muted">Строительство мостов · PL</span>
          </div>
        </div>

        <p className="mt-12">
          Монтаж и сварка мостовых конструкций, тяжёлый металлокаркас, железнодорожные и дорожные путепроводы.
        </p>

        <div className="mt-12 row-gap-10">
          <Button>Написать</Button>
          <Button variant="ghost">Пригласить в проект</Button>
        </div>
      </Card>
    </AppLayout>
  );
};

export default UserScreen;
