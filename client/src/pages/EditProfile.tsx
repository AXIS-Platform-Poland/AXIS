import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import supabase from "../supabaseClient";

export default function EditProfilePage() {
  const { profile, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const [full_name, setName] = useState(profile?.full_name || "");
  const [bio, setBio] = useState(profile?.bio || "");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const handleSave = async () => {
    // upload avatar
    let avatar_url = profile?.avatar_url || null;

    if (avatarFile) {
      const fileExt = avatarFile.name.split(".").pop();
      const fileName = `${profile?.id}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      await supabase.storage.from("avatars").upload(filePath, avatarFile, {
        upsert: true,
      });

      avatar_url = supabase.storage.from("avatars").getPublicUrl(filePath)
        .data.publicUrl;
    }

    await supabase.from("profiles").update({
      full_name,
      bio,
      avatar_url,
    }).eq("id", profile?.id);

    await refreshProfile();
    navigate("/profile");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto text-white">
      <h1 className="text-2xl font-bold mb-6">Редактировать профиль</h1>

      <label className="block mb-3">Полное имя</label>
      <input
        value={full_name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 rounded bg-gray-800 mb-5"
      />

      <label className="block mb-3">О себе</label>
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        className="w-full p-2 rounded bg-gray-800 mb-5 h-28"
      />

      <label className="block mb-3">Аватар</label>
      <input
        type="file"
        onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
        className="w-full mb-6"
      />

      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-600 rounded"
        >
          Сохранить
        </button>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-600 rounded"
        >
          Назад
        </button>
      </div>
    </div>
  );
}
