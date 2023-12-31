const express = require('express');
const router = express.Router();
const supabase = require('../../config/supabase');

router.post('/register', async (req, res) => {
  try {
    const {email, password, firstName, lastName, phoneNumber, birthday} =
      req.body;

    const {data, error} = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          firstName,
          lastName,
          phoneNumber,
          birthday,
        },
      },
    });

    if (error) throw error;

    const {data: user, error: userError} = await supabase.from('users').insert({
      user_id: data.user.id,
      email: email,
    });

    if (userError) throw userError;

    const sessionUser = data.user?.user_metadata;
    const authUser = {
      firstName: sessionUser.firstName,
      lastName: sessionUser.lastName,
      phoneNumber: sessionUser.phoneNumber,
      birthday: sessionUser.birthday,
      email: data.user?.email,
      id: data.user?.id,
      accessToken: data?.session.access_token,
    };
    req.session.user = authUser;
    return res.json(authUser);
  } catch (err) {
    console.log('error: ', err.message);

    if (
      err.message.includes('duplicate key value violates unique constraint')
    ) {
      return res
        .status(409)
        .json({error: 'An account with this email already exists.'});
    }

    return res.status(500).json({
      error: err.message,
    });
  }
});

router.post('/login', async (req, res) => {
  const {email, password} = req.body;

  const {data, error} = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    return res.status(500).json({error: 'Internal server error'});
  } else {
    const user = data.user;
    const sessionUser = user?.user_metadata;
    const authUser = {
      firstName: sessionUser.firstName,
      lastName: sessionUser.lastName,
      phoneNumber: sessionUser.phoneNumber,
      birthday: sessionUser.birthday,
      email: user?.email,
      id: user?.id,
      accessToken: data?.session.access_token,
    };

    req.session.user = authUser;
    return res.json(authUser);
  }
});

router.post('/logout', async (req, res) => {
  const {error} = await supabase.auth.signOut();
  if (error) {
    console.log(error);
    return res.status(500).json({error: 'Internal server error'});
  } else {
    req.session.destroy();
    return res.json({message: 'Logout successful'});
  }
});

module.exports = router;
