import { createClient } from '@supabase/supabase-js';

const isNode = typeof process !== "undefined" && process.versions?.node;


let SUPABASE_URL, SUPABASE_ANON_KEY;

if (isNode) {
    // Load dotenv dynamically
    const dotenv = import('dotenv');
    dotenv.config();
    
    SUPABASE_URL = process.env.VITE_SUPABASE_URL;
    SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;
} else {
  // Frontend (Browser)
  SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
  SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
}


const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
export { supabase };
