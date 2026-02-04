import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kgyglrcacddzvyhvgfgn.supabase.co';
const supabaseAnonKey = 'sb_publishable_qD19uNTkDsZewnwnyukDTA_1J_JLlez';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);