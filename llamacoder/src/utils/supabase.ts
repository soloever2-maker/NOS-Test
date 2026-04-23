import { createClient } from "@supabase/supabase-js";

// Replace these with your actual Supabase credentials
// Project Settings > API > URL and anon/public key
const supabaseUrl = "https://your-project-id.supabase.co";
const supabaseAnonKey = "your-anon-key-here";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);