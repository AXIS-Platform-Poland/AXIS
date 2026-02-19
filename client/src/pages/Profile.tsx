import React from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  if (!user || !profile) {
    return (
      <div className="text-center text-white mt-20 text-xl">
        Загрузка профиля…
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 w-full mx-auto max-w-5xl text-white">

      {/* 🔵 Блок ПРОФИЛЯ */}
      <div className="bg-[#0D1624] rounded-2xl p-6 shadow-xl border border-[#1E3A5F]">
        <div className="flex flex-col md:flex-row md:items-center gap-6">

          {/* Аватар */}
          <img
            src={profile.avatar_url || "/no-avatar.png"}
            className="w-28 h-28 rounded-full object-cover border-2 border-[#1E3A5F]"
            alt="avatar"
          />

          {/* Имя + бейдж */}
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold">{profile.full_name}</h2>

            {/* Маленький бейдж */}
            <span className="px-3 py-1 text-sm rounded-full bg-[#1E3A5F] w-fit">
              OWNER • INGVARR Sp. z o.o.
            </span>

            {/* ID */}
            <div className="text-sm opacity-70">ID: {profile.user_id}</div>
          </div>
        </div>

        {/* Кнопки */}
        <div className="flex flex-wrap gap-3 mt-6">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700"
          >
            ← Назад
          </button>

          <button
            onClick={() => navigator.share?.({ url: window.location.href })}
            className="px-4 py-2 bg-blue-700 rounded-lg hover:bg-blue-800"
          >
            Поделиться
          </button>

          <button
            onClick={() => navigate("/edit-profile")}
            className="px-4 py-2 bg-orange-500 rounded-lg hover:bg-orange-600"
          >
            Редактировать
          </button>
        </div>
      </div>

      {/* 🔵 Статистика */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {[
          { label: "Посты", value: 0 },
          { label: "Лайки", value: 0 },
          { label: "Комментарии", value: 0 },
          { label: "Друзья", value: 0 },
        ].map((i) => (
          <div
            key={i.label}
            className="bg-[#0D1624] border border-[#1E3A5F] p-4 rounded-xl text-center shadow-md"
          >
            <div className="text-3xl font-bold">{i.value}</div>
            <div className="opacity-70 mt-1">{i.label}</div>
          </div>
        ))}
      </div>

      {/* 🔵 Быстрые действия */}
      <div className="flex flex-col md:flex-row gap-4 mt-6">
        <button
          onClick={() => navigate("/post/create")}
          className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl"
        >
          Создать пост
        </button>

        <button
          onClick={() => navigate("/feed")}
          className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-800 rounded-xl"
        >
          Перейти в ленту
        </button>

        <button
          onClick={() => navigate("/reels")}
          className="flex-1 px-4 py-3 bg-purple-700 hover:bg-purple-800 rounded-xl"
        >
          Открыть ролики
        </button>
      </div>

      {/* 🔵 Посты пользователя */}
      <div className="bg-[#0D1624] border border-[#1E3A5F] rounded-2xl p-6 mt-8 shadow-xl">
        <h3 className="text-xl font-bold mb-3">Посты пользователя</h3>

        <div className="opacity-70">
          Пока нет постов. Создай первый пост на странице{" "}
          <span
            className="text-blue-400 cursor-pointer"
            onClick={() => navigate("/post/create")}
          >
            «Посты»
          </span>
          .
          <br />
          <br />
          В будущем здесь появятся:
          <ul className="list-disc ml-5 mt-2">
            <li>последние публикации</li>
            <li>ролики</li>
            <li>ссылки на соцсети</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
