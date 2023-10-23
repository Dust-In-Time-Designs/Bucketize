const client = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_KEY;

const supabaseClient = auth => {
  return client.createClient(supabaseUrl, supabaseAnonKey, auth);
};

exports.supabaseClient = supabaseClient;
