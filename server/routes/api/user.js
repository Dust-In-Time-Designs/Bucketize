const express = require('express');
const supabase = require('../../config/supabase');

const router = express.Router();

router.post('/accounts', function (request, response, next) {
  Promise.resolve().then(async function () {
    const user = await supabase.from('accounts').select();
    if (!user.data) {
      const {data, error} = await supabase
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
  try {
    const {data: user, error} = await supabase
      .from('accounts')
      .select('*')
      .eq('user_id', request.params.id)
      .single();

    if (error) {
      console.error('Error fetching user:', error);
      return response.json({error: 'Error fetching user'});
    }
    if (user) {
      user.plaid_access_token = request.body.token;
      const {data, error: updateError} = await supabase
        .from('accounts')
        .upsert(user)
        .eq('user_id', user.user_id)

      if (updateError) {
        console.error('Error updating user:', updateError);
        return response.json({error: 'Error updating user'});
      }

      return response.json(data);
    } else {
      return response.json({error: 'User not found'});
    }
  } catch (e) {
    console.error('Unexpected error:', e);
    return response.json({error: 'Unexpected error occurred'});
  }
});

module.exports = router;
