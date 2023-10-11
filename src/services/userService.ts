import {supabase} from '../config/initSupabase';
import {CreateUser} from '../models/users';
const {auth} = supabase;

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
    return response.data.session;
  }
};

export const handleLogin = async (email: string, password: string) => {
  const response = await auth.signInWithPassword({email, password});
  if (response.error) {
    console.log(response.error);
  } else {
    return response.data.session;
  }
};
