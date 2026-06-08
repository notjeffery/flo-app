import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://taefgbjwhzisndmknapd.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhZWZnYmp3aHppc25kbWtuYXBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzNjk3MDYsImV4cCI6MjA4Njk0NTcwNn0.Af81TqeQqZpMfSX49HcFVd9lsL-zYmtku60nsOMgM_o'

export const supabase = createBrowserClient(supabaseUrl, supabaseKey)