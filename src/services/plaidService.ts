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

const handleCreateLinkToken = async (token: String) => {
  try {
    const response = await fetch(`${API_URL}/api/plaid/create_link_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data.link_token;
  } catch (error) {
    return null;
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

const handleInitializeData = async (publicToken: string) => {
  try {
    const response = await fetch(`${API_URL}/api/plaid/initialize_data`, {
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

const handleRetrieveAccessToken = async (token: string) => {
  try {
    const response = await fetch(`${API_URL}/api/plaid/retrieve_access_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
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

const handleGetBalance = async () => {
  try {
    const response = await fetch(`${API_URL}/api/plaid/balance`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

const handleGetTransactions = async () => {
  try {
    const response = await fetch(`${API_URL}/api/plaid/transactions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};

const handleGetAccounts = async (
  authToken: string,
  plaidAccessToken: string,
) => {
  try {
    const response = await fetch(`${API_URL}/api/plaid/accounts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        access_token: plaidAccessToken,
        Authorization: `Bearer ${authToken}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};

const handleGetAssets = async (authToken: string, plaidAccessToken: string) => {
  try {
    const response = await fetch(`${API_URL}/api/plaid/assets`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        access_token: plaidAccessToken,
        Authorization: `Bearer ${authToken}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};

const handleGetItems = async (authToken: string, plaidAccessToken: string) => {
  try {
    const response = await fetch(`${API_URL}/api/plaid/item`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        access_token: plaidAccessToken,
        Authorization: `Bearer ${authToken}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};

export {
  handlePlaidInfo,
  handleCreateLinkToken,
  handleSetAccessToken,
  handlePlaidAuth,
  handleRetrieveAccessToken,
  handleGetBalance,
  handleGetTransactions,
  handleGetAccounts,
  handleGetAssets,
  handleGetItems,
  handleInitializeData,
};
