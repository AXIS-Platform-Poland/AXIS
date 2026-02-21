// src/components/layout/ScreenHeader.tsx
import React from "react";

type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
  rightSlot?: React.ReactNode; // кнопки справа (поиск, плюс, меню и т.п.)
};

/**
 * ScreenHeader — универсальный верхний бар экрана.
 * Используем: Лента, Видео, Чаты, Профиль, Настройки.
 */
const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  subtitle,
  rightSlot,
}) => {
  return (
    <header className="app-header">
      <div className="app-header-left">
        {/* Мини-логотип AXIRO — оставляем один для всех экранов */}
        <div className="app-logo">AX</div>

        <div className="app-title">
          <span className="app-title-main">{title}</span>
          {subtitle && <span className="app-title-sub">{subtitle}</span>}
        </div>
      </div>

      {rightSlot && <div className="row-gap-8">{rightSlot}</div>}
    </header>
  );
};

export default ScreenHeader;
