// supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fcefvdpfcoqmadgsfnyn.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjZWZ2ZHBmY29xbWFkZ3NmbnluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwNzkzODgsImV4cCI6MjA3NTY1NTM4OH0.idw80I4byZNE0mCgEwZqEvYD4HfHvnpR_pYW5CFfVrQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false
  }
});

