import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://drmakcnqbxnllugyswjm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRybWFrY25xYnhubGx1Z3lzd2ptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEyMDQ3NTksImV4cCI6MjAzNjc4MDc1OX0.CPrzfWbfggShXw7-MJpdB1jd1S1cQvQ7jBgVgEvREUg";

export const supabase = createClient(supabaseUrl, supabaseKey);