import { createClient } from "@supabase/supabase-js"

export const supabaseUrl = "https://mkzkgpaefpfdzqhhlmra.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1remtncGFlZnBmZHpxaGhsbXJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk5ODY2NTUsImV4cCI6MjAzNTU2MjY1NX0.AoW1HwpfdSXNn4LsCzhJ4CrkdASwnKngepvJ_kxcUYU"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
