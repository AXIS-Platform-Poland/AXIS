// client/src/components/Sidebar.tsx
import React from "react";

type SidebarProps = {
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
};

/**
 * Минимальный Sidebar-заглушка.
 * Ничего не рисует, просто оставлен,
 * чтобы не ломались импорты в других компонентах.
 */
export default function Sidebar(_props: SidebarProps) {
  return null;
}
