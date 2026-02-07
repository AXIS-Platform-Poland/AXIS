export default function SettingsPage() {
  return (
    <div className="rounded-2xl border border-neutral-900 bg-neutral-950/60 p-4">
      <div className="text-lg font-semibold">Settings</div>
      <div className="mt-2 text-sm text-neutral-400">
        Здесь будет настройка профиля, безопасности, уведомлений, тем.
      </div>

      <div className="mt-4 grid gap-3">
        <div className="rounded-2xl border border-neutral-900 bg-neutral-950/40 p-4">
          <div className="font-medium">Profile</div>
          <div className="text-sm text-neutral-400">
            name, bio, avatar, cover
          </div>
          <button className="mt-3 rounded-2xl bg-neutral-900 px-4 py-2 text-sm hover:bg-neutral-800">
            Edit profile
          </button>
        </div>

        <div className="rounded-2xl border border-neutral-900 bg-neutral-950/40 p-4">
          <div className="font-medium">Security</div>
          <div className="text-sm text-neutral-400">
            password, sessions, 2FA (soon)
          </div>
          <button className="mt-3 rounded-2xl bg-neutral-900 px-4 py-2 text-sm hover:bg-neutral-800">
            Open security
          </button>
        </div>
      </div>
    </div>
  );
}
