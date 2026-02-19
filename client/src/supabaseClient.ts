import { createClient } from "@supabase/supabase-js";

// URL и ключ берём из переменных окружения Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// На всякий случай подсказка в консоль, если что-то не так с env
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "[supabaseClient] Missing VITE_SUPABASE_URL или VITE_SUPABASE_ANON_KEY"
  );
}

// Создаём клиент
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 👉 Именованный экспорт (можно: import { supabase } from "../supabaseClient")
export { supabase };

// 👉 Default-экспорт (можно: import supabase from "../supabaseClient")
export default supabase;
