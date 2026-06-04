import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabasePublishableKey);

let supabaseClient: SupabaseClient | undefined;

export function getSupabaseClient() {
  if (!isSupabaseConfigured) {
    throw new Error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY.");
  }

  supabaseClient ??= createClient(supabaseUrl, supabasePublishableKey);
  return supabaseClient;
}
