import React from "react";
import { NavLink } from "react-router-dom";
import { useI18n } from "../i18n/i18nProvider";

export default function Sidebar() {
  const { t } = useI18n();

  const itemClass = ({ isActive }: { isActive: boolean }) =>
    `sb-item ${isActive ? "sb-item--active" : ""}`;

  return (
    <aside className="sb">
      {/* Brand */}
      <div className="sb-brand">
        <div className="sb-title">Ingvarr Sp. z o.o.</div>
        <div className="sb-subtitle">Professional services • Poland</div>
      </div>

      {/* Navigation */}
      <nav className="sb-nav">
        <NavLink to="/" className={itemClass}>
          <span className="sb-ico">🏠</span>
          <span className="sb-text">{t.nav.posts}</span>
        </NavLink>

        <NavLink to="/friends" className={itemClass}>
          <span className="sb-ico">👥</span>
          <span className="sb-text">{t.nav.friends}</span>
        </NavLink>

        <NavLink to="/reels" className={itemClass}>
          <span className="sb-ico">🎬</span>
          <span className="sb-text">{t.nav.reels}</span>
        </NavLink>

        <NavLink to="/marketplace" className={itemClass}>
          <span className="sb-ico">🛒</span>
          <span className="sb-text">{t.nav.marketplace}</span>
        </NavLink>

        <div className="sb-sep" />

        <NavLink to="/settings" className={itemClass}>
          <span className="sb-ico">⚙️</span>
          <span className="sb-text">{t.nav.settings}</span>
        </NavLink>
      </nav>

      {/* Footer / small hint */}
      <div className="sb-footer">
        <div className="sb-dot" />
        <div className="sb-foottext">AXIS Platform</div>
      </div>
    </aside>
  );
}
