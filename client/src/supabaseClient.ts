import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kgylrcacddzvyhvgtfgn.supabase.co";
const supabaseAnonKey =
  "sb_publishable_qD19uNTkDsZewwnyukDTA_13_3L2ez";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
