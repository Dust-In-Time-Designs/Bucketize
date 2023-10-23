import {API_URL} from '@env';
import {Account} from '../models/user';

export const getAccount = async (account: Account, token: string) => {
  const res = await fetch(`http://${API_URL}:8080/api/users/accounts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(account),
  });
  return res.json();
};
