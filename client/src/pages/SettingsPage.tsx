import React from "react";
import { useAuth } from "../AuthContext";

export default function SettingsPage() {
  const { loading, user, profile, refreshProfile, signOut } = useAuth();

  return (
    <div
      style={{
        padding: 16,
        color: "white",
      }}
    >
      <div
        style={{
          maxWidth: 720,
          margin: "0 auto",
          background: "#141414",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 16,
          padding: 16,
        }}
      >
        <h2 style={{ marginTop: 0, marginBottom: 12 }}>Settings</h2>

        <div
          style={{
            padding: 12,
            borderRadius: 12,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.10)",
            marginBottom: 12,
          }}
        >
          <div style={{ opacity: 0.9, marginBottom: 6 }}>
            <b>Status:</b>{" "}
            {loading ? "Loading auth..." : user ? "Authenticated ✅" : "Not logged in ❌"}
          </div>

          <div style={{ opacity: 0.9, marginBottom: 6 }}>
            <b>User:</b>{" "}
            {user
              ? `${user.email ?? "(no email)"} | id: ${user.id}`
              : "—"}
          </div>

          <div style={{ opacity: 0.9 }}>
            <b>Profile (public.profiles):</b>{" "}
            {user ? (
              profile ? (
                <span>
                  Loaded ✅{" "}
                  <span style={{ opacity: 0.85 }}>
                    (user_id: {profile.user_id}, email: {profile.email ?? "NULL"})
                  </span>
                </span>
              ) : (
                <span style={{ color: "#ffb74d" }}>
                  Not found ⚠️ (нет строки в profiles для этого user_id)
                </span>
              )
            ) : (
              "—"
            )}
          </div>
        </div>

        {user && (
          <>
            <div
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                marginBottom: 12,
              }}
            >
              <button
                onClick={refreshProfile}
                style={{
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.18)",
                  background: "rgba(255,255,255,0.08)",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Refresh profile
              </button>

              <button
                onClick={signOut}
                style={{
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.18)",
                  background: "rgba(255,80,80,0.15)",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Sign out
              </button>
            </div>

            <div
              style={{
                padding: 12,
                borderRadius: 12,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              <div style={{ marginBottom: 8, opacity: 0.85 }}>
                Ниже — значения из <code>profiles</code> (если есть):
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 6 }}>
                <div style={{ opacity: 0.75 }}>full_name</div>
                <div>{profile?.full_name ?? "NULL"}</div>

                <div style={{ opacity: 0.75 }}>avatar_url</div>
                <div style={{ wordBreak: "break-all" }}>{profile?.avatar_url ?? "NULL"}</div>

                <div style={{ opacity: 0.75 }}>bio</div>
                <div style={{ whiteSpace: "pre-wrap" }}>{profile?.bio ?? "NULL"}</div>

                <div style={{ opacity: 0.75 }}>created_at</div>
                <div>{profile?.created_at ?? "NULL"}</div>
              </div>
            </div>
          </>
        )}

        {!loading && !user && (
          <div style={{ opacity: 0.85 }}>
            Зайди через страницу <b>Login / Register</b>, потом вернись сюда —
            тут сразу покажет, загрузился ли профиль.
          </div>
        )}
      </div>
    </div>
  );
}
