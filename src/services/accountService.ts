import {API_URL} from '@env';
import {Account} from '../models/user';

export const getAccount = async (account: Account) => {
  const res = await fetch(`${API_URL}/api/users/accounts`, {
    method: 'POST',
    body: JSON.stringify(account),
  });
  return res.json();
};

//This may be uneccesary
export const updatePlaidToken = async (token: string) => {
  const id = 'ec913d50-7968-453e-a159-6c08e255776a';
  const res = await fetch(`${API_URL}/api/users/${id}/plaid_token`, {
    method: 'POST',
    body: token,
  });
  return res.json();
};

