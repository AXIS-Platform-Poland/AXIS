import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { useI18n } from "../i18n/I18nProvider";

export default function SettingsPage() {
  const { t } = useI18n();
  const { loading, user, profile, refreshProfile, updateProfile, signOut } = useAuth();

  const [fullName, setFullName] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  const [saving, setSaving] = useState<boolean>(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    setFullName(profile?.full_name ?? "");
    setAvatarUrl(profile?.avatar_url ?? "");
    setBio(profile?.bio ?? "");
  }, [profile]);

  const onSave = async () => {
    setMsg(null);

    if (!user) {
      setMsg(t.settings.needAuth);
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
      setMsg(t.settings.savedOk);
    } catch (e: any) {
      setMsg(`${t.settings.saveError}: ${e?.message ?? String(e)}`);
    } finally {
      setSaving(false);
    }
  };

  const isAuthed = !!user;

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: 16 }}>
      <h2 style={{ marginBottom: 12 }}>{t.settings.title}</h2>

      {/* STATUS CARD */}
      <div style={{ padding: 12, border: "1px solid #333", borderRadius: 10, marginBottom: 12 }}>
        <div style={{ opacity: 0.9, marginBottom: 6 }}>
          <b>{t.settings.status}:</b>{" "}
          {isAuthed ? (
            <>
              {t.settings.authenticated} ✅
            </>
          ) : (
            <>
              {t.settings.notAuthenticated} ❌
            </>
          )}
        </div>

        <div style={{ opacity: 0.9 }}>
          <div>
            <b>{t.settings.userLabel}:</b> {user?.email ?? "—"}
          </div>
          <div>
            <b>{t.settings.userIdLabel}:</b> {user?.id ?? "—"}
          </div>
          <div>
            <b>{t.settings.profileLabel}:</b>{" "}
            {profile ? (
              <>
                {t.settings.profileLoaded} ✅
              </>
            ) : (
              <>
                {t.settings.profileNotFound} ⚠️
              </>
            )}
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <button onClick={refreshProfile} disabled={loading}>
            {t.settings.refreshProfile}
          </button>

          <button onClick={signOut} style={{ background: "#b23b3b", color: "white" }}>
            {t.common.signOut}
          </button>
        </div>
      </div>

      {/* EDIT PROFILE */}
      <div style={{ padding: 12, border: "1px solid #333", borderRadius: 10 }}>
        <h3 style={{ marginTop: 0 }}>{t.settings.editProfile}</h3>

        <div style={{ display: "grid", gap: 10 }}>
          <label>
            <div style={{ marginBottom: 4 }}>{t.settings.fullName}</div>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={t.settings.fullNamePlaceholder}
              style={{ width: "100%", padding: 8 }}
            />
          </label>

          <label>
            <div style={{ marginBottom: 4 }}>{t.settings.avatarUrl}</div>
            <input
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://..."
              style={{ width: "100%", padding: 8 }}
            />
          </label>

          <label>
            <div style={{ marginBottom: 4 }}>{t.settings.bio}</div>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder={t.settings.bioPlaceholder}
              rows={4}
              style={{ width: "100%", padding: 8 }}
            />
          </label>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={onSave} disabled={saving || loading || !user}>
              {saving ? t.settings.saving : t.common.save}
            </button>

            {msg && <div style={{ opacity: 0.95 }}>{msg}</div>}
          </div>
        </div>

        {/* DEBUG CURRENT VALUES (optional) */}
        <div style={{ marginTop: 12, opacity: 0.9 }}>
          <div style={{ marginBottom: 6 }}>
            <b>{t.settings.currentValues}</b>
          </div>
          <div>full_name: {profile?.full_name ?? "NULL"}</div>
          <div>avatar_url: {profile?.avatar_url ?? "NULL"}</div>
          <div>bio: {profile?.bio ?? "NULL"}</div>
          <div>created_at: {profile?.created_at ?? "NULL"}</div>
        </div>
      </div>
    </div>
  );
}
