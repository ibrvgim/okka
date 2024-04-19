import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zhmyaujcerjqhewifbhc.supabase.co';
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpobXlhdWpjZXJqcWhld2lmYmhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3MDMyNzIsImV4cCI6MjAyNzI3OTI3Mn0.VIipzVFXLhKM1K1qxJJ-9lOP719ci2sjtDoiwxZyMJQ`;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
