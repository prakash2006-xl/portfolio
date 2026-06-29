import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testSupabase() {
  console.log('Testing Supabase connection...');
  
  // 1. Test Read (Should succeed because of public read policy)
  console.log('\n--- 1. Testing SELECT ---');
  const { data: selectData, error: selectError } = await supabase
    .from('app_state')
    .select('*');
    
  if (selectError) {
    console.error('SELECT ERROR:', selectError);
  } else {
    console.log('SELECT SUCCESS. Data:', selectData);
  }

  // 2. Test Write as Anon (Should FAIL because of RLS authenticated rule)
  console.log('\n--- 2. Testing UPSERT (Anonymous) ---');
  const { data: upsertData, error: upsertError } = await supabase
    .from('app_state')
    .upsert({ id: 'portfolio-cms-storage', state: { profile: { firstName: 'Agent Test' } } });
    
  if (upsertError) {
    console.error('UPSERT ERROR (Expected if RLS is working):', upsertError);
  } else {
    console.log('UPSERT SUCCESS (Unexpected! RLS is not restricting anon writes):', upsertData);
  }
}

testSupabase();
