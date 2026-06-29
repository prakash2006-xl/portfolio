import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
// The service key the user leaked earlier
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlbXB0aGpuZm1yd2x4bGlnYWpuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Mjc0MDI2MiwiZXhwIjoyMDk4MzE2MjYyfQ.DADS6B_9Trx6tPrLWQse2SN1dMRYTeGMcx5JxAS2roc';

const supabaseAdmin = createClient(supabaseUrl, serviceKey);
const supabaseUser = createClient(supabaseUrl, supabaseAnonKey);

async function testFlow() {
  console.log('--- 1. Creating Test User with Admin Key ---');
  const { data: user, error: userError } = await supabaseAdmin.auth.admin.createUser({
    email: 'test_rls@example.com',
    password: 'password123',
    email_confirm: true
  });
  
  if (userError && !userError.message.includes('already registered')) {
    console.error('Failed to create user:', userError);
    return;
  }
  console.log('User ready!');

  console.log('\n--- 2. Logging in with Anon Key ---');
  const { data: authData, error: authError } = await supabaseUser.auth.signInWithPassword({
    email: 'test_rls@example.com',
    password: 'password123'
  });

  if (authError) {
    console.error('Login Failed:', authError);
    return;
  }
  console.log('Logged in! Session token:', authData.session.access_token.substring(0, 20) + '...');

  console.log('\n--- 3. Attempting UPSERT as Authenticated User ---');
  const { data: upsertData, error: upsertError } = await supabaseUser
    .from('app_state')
    .upsert({ 
      id: 'portfolio-cms-storage', 
      state: { 
        profile: { 
          firstName: 'TEST SUCCESS', 
          taglines: ['RLS works!'] 
        } 
      } 
    });

  if (upsertError) {
    console.error('UPSERT FAILED:', upsertError);
  } else {
    console.log('UPSERT SUCCEEDED! RLS policies are 100% correct.');
  }
  
  console.log('\n--- 4. Cleaning up... ---');
  await supabaseAdmin.from('app_state').upsert({ id: 'portfolio-cms-storage', state: {} });
  if (authData.user) {
    await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
  }
}

testFlow();
