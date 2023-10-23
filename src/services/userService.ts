import {supabase} from '../config/initSupabase';
import {CreateUser, User} from '../models/user';
const {auth} = supabase;

// supabase.auth.onAuthStateChange((event, session) => {
//   console.log(event, session);
// });

export const handleRegister = async (user: CreateUser) => {
  const response = await auth.signUp({
    email: user.email,
    password: user.password,
    options: {
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        birthday: user.birthday,
      },
    },
  });
  if (response.error) {
    console.log(response.error);
  } else {
    const sessionUser = response.data.session?.user.app_metadata;
    const authUser: User = {
      firstName: sessionUser?.user_metadata.firstName,
      lastName: sessionUser?.user_metadata.lastName,
      phoneNumber: sessionUser?.user_metadata.phoneNumber,
      birthday: sessionUser?.user_metadata.birthday,
      email: sessionUser?.email,
      id: sessionUser?.id,
      accessToken: response.data.session.access_token,
    };
    return authUser;
  }
};

export const handleLogin = async (email: string, password: string) => {
  const response = await auth.signInWithPassword({email, password});
  if (response.error) {
    console.log(response.error);
  } else {
    const sessionUser = response.data.session?.user;
    const authUser: User = {
      firstName: sessionUser?.user_metadata.firstName,
      lastName: sessionUser?.user_metadata.lastName,
      phoneNumber: sessionUser?.user_metadata.phoneNumber,
      birthday: sessionUser?.user_metadata.birthday,
      email: sessionUser?.email,
      id: sessionUser?.id,
      accessToken: response.data.session.access_token,
    };
    return authUser;
  }
};

export const handleLogout = async () => {
  const {error} = await supabase.auth.signOut();
  if (error) {
    console.log(error);
  } else {
    return true;
  }
};
