const express = require('express');
const router = express.Router();
const supabase = require('../../config/supabase');

router.post('/register', async (req, res) => {
  const {email, password, firstName, lastName, phoneNumber, birthday} =
    req.body;

  const {user, session, error} = await supabase.auth.signUp({
    email,
    password,
    data: {
      firstName,
      lastName,
      phoneNumber,
      birthday,
    },
  });

  if (error) {
    console.log(error);
    return res.status(500).json({error: 'Internal server error'});
  } else {
    const sessionUser = user?.user_metadata;
    const authUser = {
      firstName: sessionUser.firstName,
      lastName: sessionUser.lastName,
      phoneNumber: sessionUser.phoneNumber,
      birthday: sessionUser.birthday,
      email: user?.email,
      id: user?.id,
      accessToken: session?.access_token,
    };
    req.session.user = authUser;
    return res.json(authUser);
  }
});

router.post('/login', async (req, res) => {
  const {email, password} = req.body;
  console.log(supabase)
  const {user, session, error} = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  console.log(user, session, error)
  if (error) {
    console.log(error);
    return res.status(500).json({error: 'Internal server error'});
  } else {
    const sessionUser = user?.user_metadata;
    const authUser = {
      firstName: sessionUser.firstName,
      lastName: sessionUser.lastName,
      phoneNumber: sessionUser.phoneNumber,
      birthday: sessionUser.birthday,
      email: user?.email,
      id: user?.id,
      accessToken: session?.access_token,
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
