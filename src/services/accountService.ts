import {API_URL} from '@env';

export const appInfo = async () => {
  const res = await fetch(`http://${API_URL}:8080/api/info`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res;
};

export const getAccount = async (account, token) => {
  console.log('in getAccount');
  const res = await fetch(`http://${API_URL}:8080/api/users/accounts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(account),
  });
  return res;
};
