import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://scupymotddkkebsmkybl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjdXB5bW90ZGRra2Vic21reWJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NDg4ODgsImV4cCI6MjA1NzAyNDg4OH0.wj3uqkcBsAENpHBBlTkkxOOTPPPkjfQpC4e9xtWo_RM";
const supabase = createClient(supabaseUrl, supabaseKey);
