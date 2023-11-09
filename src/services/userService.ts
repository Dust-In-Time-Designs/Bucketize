import {API_URL} from '@env';
import {CreateUser, User} from '../models/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const handleRegister = async (user: CreateUser) => {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  if (response.status !== 200) {
    console.log(data.error);
  } else {
    const authUser: User = {
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      birthday: data.birthday,
      email: data.email,
      id: data.id,
      accessToken: data.accessToken,
    };
    return authUser;
  }
};

export const handleLogin = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password}),
  });
  const data = await response.json();
  if (response.status !== 200) {
    console.log(data.error);
  } else {
    const authUser: User = {
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      birthday: data.birthday,
      email: data.email,
      id: data.id,
      accessToken: data.accessToken,
    };
    return authUser;
  }
};

export const handleLogout = async () => {
  const response = await fetch(`${API_URL}/api/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  AsyncStorage.removeItem('sb-pkotgkvsnarjmufqcwxj-auth-token');
  if (response.status !== 200) {
    console.log(data.error);
  } else {
    return true;
  }
};
