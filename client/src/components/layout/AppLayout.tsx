import React from "react";
import "../..//axiro.css";

type AppLayoutProps = {
  header?: React.ReactNode;
  children: React.ReactNode;
};

const AppLayout: React.FC<AppLayoutProps> = ({ header, children }) => {
  return (
    <div className="app-shell">
      {header}
      <main className="app-content">{children}</main>
    </div>
  );
};

export default AppLayout;
