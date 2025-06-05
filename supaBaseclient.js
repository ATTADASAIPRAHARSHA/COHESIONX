import { createClient } from '@supabase/supabase-js';

if (typeof process !== "undefined" && process.versions?.node) {
    await import('dotenv/config');
}

const SUPABASE_URL = typeof process !== "undefined" && process.versions?.node
    ? process.env.VITE_SUPABASE_URL
    : import.meta.env.VITE_SUPABASE_URL;

const SUPABASE_ANON_KEY = typeof process !== "undefined" && process.versions?.node
    ? process.env.VITE_SUPABASE_ANON_KEY
    : import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
export { supabase };
