import React from "react";
import TopBar from "./TopBar";
import BottomNav from "./BottomNav";

export default function AppLayout({ children }) {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#060B18",
        paddingTop: "64px", // отступ, чтобы TopBar не перекрывал контент
      }}
    >
      <TopBar />

      <div style={{ paddingBottom: "70px" }}>
        {children}
      </div>

      <BottomNav />
    </div>
  );
}
