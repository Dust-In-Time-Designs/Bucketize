import {API_URL} from '@env';

const handlePlaidInfo = async () => {
  try {
    const response = await fetch(`${API_URL}/api/plaid/info`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const handleCreateLinkToken = async () => {
  try {
    const response = await fetch(`${API_URL}/api/plaid/create_link_token`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const handleCreateLinkTokenForPayment = async () => {
  try {
    const response = await fetch(
      `${API_URL}/api/plaid/create_link_token_for_payment`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const handleSetAccessToken = async (publicToken: string) => {
  try {
    const response = await fetch(`${API_URL}/api/plaid/set_access_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({public_token: publicToken}),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const handlePlaidAuth = async () => {
  try {
    const response = await fetch(`${API_URL}/api/plaid/auth`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// Define other Plaid related functions similarly.

export {
  handlePlaidInfo,
  handleCreateLinkToken,
  handleCreateLinkTokenForPayment,
  handleSetAccessToken,
  handlePlaidAuth,
  // Add other Plaid related functions here
};
