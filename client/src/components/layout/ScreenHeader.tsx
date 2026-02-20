import React from "react";

type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
  rightSlot?: React.ReactNode;
};

const ScreenHeader: React.FC<ScreenHeaderProps> = ({ title, subtitle, rightSlot }) => {
  return (
    <header className="app-header">
      <div className="app-header-left">
        <div className="app-logo">AX</div>
        <div className="app-title">
          <span className="app-title-main">{title}</span>
          {subtitle && <span className="app-title-sub">{subtitle}</span>}
        </div>
      </div>
      {rightSlot}
    </header>
  );
};

export default ScreenHeader;
