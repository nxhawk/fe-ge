import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://edlqemjesqxpazxwuwcw.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkbHFlbWplc3F4cGF6eHd1d2N3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwOTQyNzYsImV4cCI6MjA1OTY3MDI3Nn0.iORJLOTvPliYCQ5uFZFXN4bKdD6WslsimQ4CvT80Rsg';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
