import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,     // ✅ makes sure session is saved
    autoRefreshToken: true,   // ✅ refresh session automatically
    detectSessionInUrl: true, // ✅ handles OAuth flows
  },
});