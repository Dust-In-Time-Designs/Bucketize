import {API_URL} from '@env';
import {CreateUser, User} from '../models/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const handleRegister = async (user: CreateUser) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    if (response.ok) {
      const authUser: User = {
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        birthday: data.birthday,
        email: data.email,
        id: data.id,
        accessToken: data.accessToken,
      };
      return {user: authUser};
    } else {
      return {error: data.error || 'An error occurred during registration.'};
    }
  } catch (error) {
    console.error(error);
    return {error: 'Network error or invalid server response.'};
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
    AsyncStorage.setItem('user', JSON.stringify(authUser));
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
  AsyncStorage.removeItem('user');
  if (response.status !== 200) {
    console.log(data.error);
  } else {
    return true;
  }
};
