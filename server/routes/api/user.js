const express = require('express');
const supabaseClient = require('@supabase/supabase-js');

const router = express.Router();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

router.post('/accounts', function (request, response, next) {
  const dbClient = supabaseClient.createClient(SUPABASE_URL, SUPABASE_KEY, {
    global: {
      headers: {Authorization: request.headers.authorization},
    },
  });

  Promise.resolve().then(async function () {
    const user = await dbClient.from('accounts').select();
    if (!user.data) {
      const {data, error} = await dbClient
        .from('accounts')
        .insert([request.body])
        .select();
      if (error) {
        return error;
      } else {
        return data;
      }
    }
    response.json(user.data);
  });
});

router.post('/:id/plaid_token', async function (request, response, next) {
  console.log('in token store');
  const dbClient = supabaseClient.createClient(SUPABASE_URL, SUPABASE_KEY, {
    headers: {Authorization: request.headers.authorization},
  });
  // Need to encode and decode JWT token as per:
  // https://github.com/orgs/supabase/discussions/1067
  try {
    const {data: user, error} = await dbClient
      .from('accounts')
      .select('*')
      .eq('user_id', request.params.id)
      .single();

    if (error) {
      console.error('Error fetching user:', error);
      return response.json({error: 'Error fetching user'});
    }
    console.log(user);
    if (user) {
      const {data, error: updateError} = await dbClient
        .from('accounts')
        .select('*')
        .update({plaid_access_token: request.body.token})
        .eq('user_id', 'ec913d50-7968-453e-a159-6c08e255776a')
        .single();

      if (updateError) {
        console.error('Error updating user:', updateError);
        return response.json({error: 'Error updating user'});
      }

      console.log('data:', data);
      return response.json(data);
    } else {
      console.log('User not found');
      return response.json({error: 'User not found'});
    }
  } catch (e) {
    console.error('Unexpected error:', e);
    return response.json({error: 'Unexpected error occurred'});
  }
});

module.exports = router;
