import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { profile } = useAuth();
  const navigate = useNavigate();

  if (!profile) {
    return (
      <div className="text-white p-6">
        Загрузка профиля…
      </div>
    );
  }

  const cardBg = "rgba(15, 23, 42, 0.9)";
  const borderC = "rgba(255,255,255,0.07)";

  return (
    <div className="p-4 md:p-8 text-white max-w-5xl mx-auto">

      {/* Верхний блок профиля */}
      <div
        className="rounded-xl p-6 mb-6 shadow-lg flex flex-col md:flex-row items-center md:items-start gap-6"
        style={{ background: cardBg, border: `1px solid ${borderC}` }}
      >
        {/* Аватар */}
        <img
          src={profile.avatar_url || "https://placehold.co/150x150/png"}
          alt="avatar"
          className="w-32 h-32 rounded-full object-cover border border-gray-700 shadow-md cursor-pointer"
          onClick={() => navigate("/edit-profile")}
        />

        <div className="flex-1">
          {/* Имя + бейдж */}
          <h1 className="text-2xl font-bold flex items-center gap-3">
            {profile.full_name || "Без имени"}
          </h1>

          {/* Бейдж Owner */}
          <span className="inline-block px-3 py-1 mt-2 rounded-full text-sm bg-blue-600/20 border border-blue-500/30 text-blue-300">
            OWNER • INGVARR Sp. z o.o.
          </span>

          {/* ID */}
          <p className="mt-3 text-sm opacity-80 break-all">
            ID: {profile.id}
          </p>

          {/* Кнопки справа (на мобилке вниз) */}
          <div className="flex gap-3 mt-4 flex-wrap">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition"
            >
              ← Назад
            </button>

            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
              }}
              className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition"
            >
              Поделиться
            </button>

            <button
              onClick={() => navigate("/edit-profile")}
              className="px-4 py-2 rounded bg-orange-500 hover:bg-orange-400 transition"
            >
              Редактировать
            </button>
          </div>
        </div>
      </div>

      {/* Статистика */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
      >
        {[
          { label: "Посты", value: 0 },
          { label: "Лайки", value: 0 },
          { label: "Комментарии", value: 0 },
          { label: "Друзья", value: 0 },
        ].map((item, i) => (
          <div
            key={i}
            className="rounded-xl p-4 text-center shadow"
            style={{ background: cardBg, border: `1px solid ${borderC}` }}
          >
            <div className="text-2xl font-bold">{item.value}</div>
            <div className="opacity-70 mt-1">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Быстрые действия */}
      <div
        className="rounded-xl p-5 mb-6 shadow grid grid-cols-1 md:grid-cols-3 gap-4"
        style={{ background: cardBg, border: `1px solid ${borderC}` }}
      >
        <button
          onClick={() => navigate("/create-post")}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 transition"
        >
          Создать пост
        </button>

        <button
          onClick={() => navigate("/feed")}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 transition"
        >
          Перейти в ленту
        </button>

        <button
          onClick={() => navigate("/reels")}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 transition"
        >
          Открыть ролики
        </button>
      </div>

      {/* Посты пользователя */}
      <div
        className="rounded-xl p-6 shadow"
        style={{ background: cardBg, border: `1px solid ${borderC}` }}
      >
        <h2 className="text-xl font-bold mb-2">Посты пользователя</h2>

        <p className="opacity-80">
          Пока нет постов. Создай первый пост на странице{" "}
          <span
            onClick={() => navigate("/create-post")}
            className="text-blue-400 cursor-pointer"
          >
            «Посты».
          </span>
        </p>

        <p className="text-sm opacity-60 mt-3">
          В будущем здесь появятся:
          <br />— последние публикации  
          <br />— ролики  
          <br />— ссылки на соцсети  
        </p>
      </div>
    </div>
  );
}
