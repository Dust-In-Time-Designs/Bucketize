const express = require('express');
const {Configuration, PlaidApi, Products, PlaidEnvironments} = require('plaid');
const util = require('util');
const supabase = require('../../config/supabase');

const router = express.Router();

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_ENV = process.env.PLAID_ENV || 'sandbox';

const PLAID_PRODUCTS = (
  process.env.PLAID_PRODUCTS || Products.Transactions
).split(',');

const PLAID_COUNTRY_CODES = (process.env.PLAID_COUNTRY_CODES || 'US').split(
  ',',
);

const PLAID_REDIRECT_URI = process.env.PLAID_REDIRECT_URI || '';

const PLAID_ANDROID_PACKAGE_NAME = process.env.PLAID_ANDROID_PACKAGE_NAME || '';

const configuration = new Configuration({
  basePath: PlaidEnvironments[PLAID_ENV],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
      'PLAID-SECRET': PLAID_SECRET,
      'Plaid-Version': '2020-09-14',
    },
  },
});

const client = new PlaidApi(configuration);

// Create a link token with configs which we can then use to initialize Plaid Link client-side.
// See https://plaid.com/docs/#create-link-token
router.post('/create_link_token', async function (request, response, next) {
  try {
    // Fetch user from Supabase
    const {data: user, error} = await supabase.from('users').select();
    if (error) {
      throw new Error('Failed to fetch user data from the database.');
    }
    if (!user || !user[0]) {
      throw new Error('User not found.');
    }

    // Configure Plaid link token settings
    const configs = {
      user: {
        client_user_id: user[0].user_id,
      },
      client_name: 'Bucketize',
      products: PLAID_PRODUCTS,
      country_codes: PLAID_COUNTRY_CODES,
      language: 'en',
    };

    if (PLAID_REDIRECT_URI !== '') {
      configs.redirect_uri = PLAID_REDIRECT_URI;
    }

    if (PLAID_ANDROID_PACKAGE_NAME !== '') {
      configs.android_package_name = PLAID_ANDROID_PACKAGE_NAME;
    }

    // Attempt to create a Plaid link token
    const createTokenResponse = await client.linkTokenCreate(configs);
    response.json(createTokenResponse.data);
  } catch (err) {
    if (err.message === 'Failed to fetch user data from the database.') {
      response.status(500).json({message: err.message});
    } else if (err.message === 'User not found.') {
      response.status(404).json({message: err.message});
    } else if (
      err.message.startsWith('Failed to create link token with Plaid.')
    ) {
      response.status(500).json({
        message: 'Failed to create link token with Plaid.',
        details: err.message,
      });
    } else {
      next(err);
    }
  }
});

// Exchange token flow - exchange a Link public_token for
// an API access_token
// https://plaid.com/docs/#exchange-token-flow
router.post('/set_access_token', async function (request, response, next) {
  try {
    const PUBLIC_TOKEN = request.body.public_token;

    // Fetch user from Supabase
    const {data: user, error: userError} = await supabase
      .from('users')
      .select();
    if (userError) {
      throw new Error('Failed to fetch user data from the database.');
    }
    if (!user || !user[0]) {
      throw new Error('User not found.');
    }

    // Exchange public token for access token
    const tokenResponse = await client.itemPublicTokenExchange({
      public_token: PUBLIC_TOKEN,
    });

    const ACCESS_TOKEN = tokenResponse.data.access_token;
    const ITEM_ID = tokenResponse.data.item_id;

    // Insert the item into the database
    const {data: item, error: itemError} = await supabase.from('items').insert({
      user_id: user[0].user_id,
      plaid_access_token: ACCESS_TOKEN,
      plaid_item_id: ITEM_ID,
      status: 'good',
    });

    if (itemError) {
      throw new Error('Failed to insert item into the database.');
    }

    response.json(item);
  } catch (err) {
    if (err.message === 'Failed to fetch user data from the database.') {
      response.status(500).json({message: err.message});
    } else if (err.message === 'User not found.') {
      response.status(404).json({message: err.message});
    } else if (
      err.message.startsWith('Failed to insert item into the database.')
    ) {
      response.status(500).json({
        message: 'Failed to insert item into the database.',
        details: err.message,
      });
    } else {
      next(err);
    }
  }
});

const getAllTransactions = async token => {
  let cursor = null;
  let added = [];
  let hasMore = true;

  while (hasMore) {
    const req = {
      access_token: token,
      cursor: cursor,
    };
    const res = await client.transactionsSync(req);
    added = added.concat(res.data.added);
    hasMore = res.data.has_more;
    cursor = res.data.next_cursor;
  }

  return added.sort((a, b) => (a.date > b.date) - (a.date < b.date));
};

router.post('/initialize_data', async function (request, response, next) {
  try {
    const PUBLIC_TOKEN = request.body.public_token;
    const tokenResponse = await client.itemPublicTokenExchange({
      public_token: PUBLIC_TOKEN,
    });

    const ACCESS_TOKEN = tokenResponse.data.access_token;

    const {data: user, error: userError} = await supabase
      .from('users')
      .select();
    if (userError) throw userError;

    if (!user[0].plaid_access_token) {
      await supabase
        .from('users')
        .update({
          plaid_access_token: ACCESS_TOKEN,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user[0].user_id);
    }

    const transactions = await getAllTransactions(ACCESS_TOKEN);
    const balanceRes = await client.accountsBalanceGet({
      access_token: ACCESS_TOKEN,
    });

    const {data: item, error: itemError} = await supabase.from('items').insert({
      user_id: user[0].user_id,
      plaid_item_id: tokenResponse.data.item_id,
      status: 'good',
    });

    if (itemError) throw itemError;

    await Promise.all(
      balanceRes.data.accounts.map(account => {
        return supabase.from('accounts').insert({
          item_id: tokenResponse.data.item_id,
          plaid_account_id: account.account_id,
          name: account.name,
          mask: account.mask,
          official_name: account.official_name,
          type: account.type,
          subtype: account.subtype,
          balances: account.balances,
        });
      }),
    );

    await Promise.all(
      transactions.map(transaction => {
        return supabase.from('transactions').insert({
          account_id: transaction.account_id,
          plaid_transaction_id: transaction.transaction_id,
          category: transaction.personal_finance_category,
          category_icon_url: transaction.personal_finance_category_icon_url,
          type: transaction.type,
          name: transaction.name,
          amount: transaction.amount,
          iso_currency_code: transaction.iso_currency_code,
          unofficial_currency_code: transaction.unofficial_currency_code,
          date: transaction.date,
          pending: transaction.pending,
          account_owner: transaction.account_owner,
          authorized_date: transaction.authorized_date,
          merchant_name: transaction.merchant_name,
          original_description: transaction.original_description,
          logo_url: transaction.logo_url,
          website: transaction.website,
          counterparties: transaction.counterparties,
          location: transaction.location,
          payment_meta: transaction.payment_meta,
        });
      }),
    );

    response.json({
      item,
      latest_transactions: transactions,
      balance: balanceRes.data,
    });
  } catch (error) {
    next(error);
  }
});

//Retrieve a access_token
router.post('/retrieve_access_token', function (request, response, next) {
  Promise.resolve()
    .then(async function () {
      const {data: item, error} = await supabase.from('items').select();
      if (error) {
        return response.status(500).json({error});
      }
      response.json(item);
    })
    .catch(next);
});

// Retrieve ACH or ETF Auth data for an Item's accounts
// https://plaid.com/docs/#auth
router.get('/auth', function (request, response, next) {
  Promise.resolve()
    .then(async function () {
      const authResponse = await client.authGet({
        access_token: request.headers.access_token,
      });
      // prettyPrintResponse(authResponse);
      response.json(authResponse.data);
    })
    .catch(next);
});

// Retrieve Transactions for an Item
// https://plaid.com/docs/#transactions
router.get('/transactions', async function (request, response, next) {
  try {
    const {data, error} = await supabase.from('transactions').select();
    if (error) throw error;
    response.json(data);
  } catch (err) {
    return response.status(500).json({error: err.message});
  }
});

// Retrieve Identity for an Item
// https://plaid.com/docs/#identity
router.get('/identity', function (request, response, next) {
  Promise.resolve()
    .then(async function () {
      const identityResponse = await client.identityGet({
        access_token: request.headers.access_token,
      });
      // prettyPrintResponse(identityResponse);
      response.json({identity: identityResponse.data.accounts});
    })
    .catch(next);
});

// Retrieve real-time Balances for each of an Item's accounts
// https://plaid.com/docs/#balance
router.get('/balance', async function (request, response, next) {
  try {
    const {data, error} = await supabase.from('accounts').select();
    if (error) throw error;
    response.json(data);
  } catch (err) {
    return response.status(500).json({error: err.message});
  }
});

// Retrieve information about an Item
// https://plaid.com/docs/#retrieve-item
router.get('/item', async function (request, response, next) {
  try {
    const itemResponse = await client.itemGet({
      access_token: request.headers.access_token,
    });
    const configs = {
      institution_id: itemResponse.data.item.institution_id,
      country_codes: PLAID_COUNTRY_CODES,
    };
    const instResponse = await client.institutionsGetById(configs);
    response.json({
      item: itemResponse.data.item,
      institution: instResponse.data.institution,
    });
  } catch (error) {
    next(error);
  }
});

// Retrieve an Item's accounts
// https://plaid.com/docs/#accounts
router.get('/accounts', async function (request, response, next) {
  try {
    const {data, error} = await supabase.from('accounts').select();
    if (error) throw error;
    response.json(data);
  } catch (err) {
    return response.status(500).json({error: err.message});
  }
});

router.use('/api', function (error, request, response, next) {
  // prettyPrintResponse(error.response);
  response.json(formatError(error.response));
});

const prettyPrintResponse = response => {
  console.log(util.inspect(response.data, {colors: true, depth: 4}));
};

const formatError = error => {
  return {
    error: {...error.data, status_code: error.status},
  };
};

module.exports = router;
