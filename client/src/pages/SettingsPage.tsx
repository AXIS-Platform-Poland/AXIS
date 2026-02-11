import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";

export default function SettingsPage() {
  const { loading, user, profile, refreshProfile, updateProfile, signOut } = useAuth();

  const [fullName, setFullName] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    setFullName(profile?.full_name ?? "");
    setAvatarUrl(profile?.avatar_url ?? "");
    setBio(profile?.bio ?? "");
  }, [profile]);

  const onSave = async () => {
    setMsg(null);

    if (!user) {
      setMsg("Нет авторизации. Войди в аккаунт.");
      return;
    }

    try {
      setSaving(true);

      await updateProfile({
        full_name: fullName.trim() || null,
        avatar_url: avatarUrl.trim() || null,
        bio: bio.trim() || null,
      });

      await refreshProfile();
      setMsg("✅ Сохранено");
    } catch (e: any) {
      setMsg("❌ Ошибка сохранения: " + (e?.message ?? String(e)));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: 16 }}>
      <h2 style={{ marginBottom: 12 }}>Settings</h2>

      <div style={{ padding: 12, border: "1px solid #333", borderRadius: 10, marginBottom: 12 }}>
        <div><b>Status:</b> {user ? "Authenticated ✅" : "Not authenticated ❌"}</div>
        <div style={{ opacity: 0.9, marginTop: 6 }}>
          <div><b>User:</b> {user?.email ?? "-"}</div>
          <div><b>User Id:</b> {user?.id ?? "-"}</div>
          <div><b>Profile (public.profiles):</b> {profile ? "Loaded ✅" : "Not found / empty ⚠️"}</div>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <button onClick={refreshProfile} disabled={loading}>
            Refresh profile
          </button>
          <button onClick={signOut} style={{ background: "#b23b3b", color: "white" }}>
            Sign out
          </button>
        </div>
      </div>

      <div style={{ padding: 12, border: "1px solid #333", borderRadius: 10 }}>
        <h3 style={{ marginTop: 0 }}>Edit profile</h3>

        <div style={{ display: "grid", gap: 10 }}>
          <label>
            <div style={{ marginBottom: 4 }}>Full name</div>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Например: Ihor Nepomiashchyi"
              style={{ width: "100%", padding: 8 }}
            />
          </label>

          <label>
            <div style={{ marginBottom: 4 }}>Avatar URL</div>
            <input
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://..."
              style={{ width: "100%", padding: 8 }}
            />
          </label>

          <label>
            <div style={{ marginBottom: 4 }}>Bio</div>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Коротко о себе..."
              rows={4}
              style={{ width: "100%", padding: 8 }}
            />
          </label>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={onSave} disabled={saving || loading || !user}>
              {saving ? "Saving..." : "Save"}
            </button>
            {msg && <div style={{ opacity: 0.95 }}>{msg}</div>}
          </div>

          <div style={{ marginTop: 10, opacity: 0.9 }}>
            <div><b>Current values from profiles:</b></div>
            <div>full_name: {profile?.full_name ?? "NULL"}</div>
            <div>avatar_url: {profile?.avatar_url ?? "NULL"}</div>
            <div>bio: {profile?.bio ?? "NULL"}</div>
            <div>created_at: {profile?.created_at ?? "NULL"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
