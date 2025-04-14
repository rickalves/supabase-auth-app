import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://wkflssszfhrwokgtzznz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrZmxzc3N6Zmhyd29rZ3R6em56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyNDk5OTQsImV4cCI6MjA1NzgyNTk5NH0.51eA7ersJ3udIijVviqt36EVQ67VoEstNsf9i4f5UD8'
)