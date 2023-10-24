import {API_URL} from '@env';

export const storeToken = async (
  id: string,
  plaid_token: string,
  supabase_token: string,
) => {
  const res = await fetch(
    //need to update the plaid token to be the id
    //trying to send a request to query for the user and add the plaid token to that user account
    `http://${API_URL}:8080/api/user/${id}/plaid_token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${supabase_token}`,
      },
      body: JSON.stringify({token: plaid_token}),
    },
  );
  return res.json();
};
