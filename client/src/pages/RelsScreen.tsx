import React from "react";
import AppLayout from "../components/layout/AppLayout";
import ScreenHeader from "../components/layout/ScreenHeader";
import Card from "../components/ui/Card";

const ReelsScreen: React.FC = () => {
  return (
    <AppLayout
      header={
        <ScreenHeader
          title="Видео AXIRO"
          subtitle="Короткие ролики проектов"
        />
      }
    >
      <Card className="mt-12">
        <p>Здесь будут ролики проектов (прототип).</p>
      </Card>
    </AppLayout>
  );
};

export default ReelsScreen;
