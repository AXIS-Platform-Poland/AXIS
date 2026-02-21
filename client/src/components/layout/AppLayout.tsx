// src/components/layout/AppLayout.tsx
import React from "react";
import "../../axiro.css";

type AppLayoutProps = {
  header?: React.ReactNode;
  children: React.ReactNode;
};

/**
 * AppLayout — базовый каркас экрана AXIRO.
 * Сюда НЕ добавляем бизнес-логику, только структуру.
 */
const AppLayout: React.FC<AppLayoutProps> = ({ header, children }) => {
  return (
    <div className="app-shell">
      {/* Верхний хедер (название экрана / логотип / действия) */}
      {header}

      {/* Основное содержимое экрана */}
      <main className="app-content">{children}</main>
    </div>
  );
};

export default AppLayout;
