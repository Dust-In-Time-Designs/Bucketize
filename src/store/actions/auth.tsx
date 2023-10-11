import {AUTH_LOGIN, AUTH_LOGOUT} from '../types';
import {User} from '../../models/user';

const loginUser = (payload: User) => ({
  type: AUTH_LOGIN,
  payload,
});

const logoutUser = () => ({
  type: AUTH_LOGOUT,
});

export default {
  loginUser,
  logoutUser,
};
