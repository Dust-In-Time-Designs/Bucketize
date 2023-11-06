const request = require('supertest');
const sinon = require('sinon');
const {expect} = require('chai');
const app = require('../server');
const client = require('../config/plaid');
const supabase = require('../config/supabase');

const mockToken = 'public_token_sample';
const ACCESS_TOKEN = 'mock_access_token';
const mockUser = {user_id: '12345'};
const mockItem = {
  user_id: '12345',
  plaid_item_id: 'mock_item_id',
  status: 'good',
};

const mockTransaction = {
  account_id: 'BxBXxLj1m4HMXBm9WZZmCWVbPjX16EHwv99vp',
  account_owner: null,
  amount: 72.1,
  iso_currency_code: 'USD',
  unofficial_currency_code: null,
  counterparties: [
    {
      name: 'Walmart',
      type: 'merchant',
      logo_url: 'https://plaid-merchant-logos.plaid.com/walmart_1100.png',
      website: 'walmart.com',
      entity_id: 'O5W5j4dN9OR3E6ypQmjdkWZZRoXEzVMz2ByWM',
      confidence_level: 'VERY_HIGH',
    },
  ],
  date: '2023-09-24',
  authorized_date: '2023-09-22',
  location: {
    address: '13425 Community Rd',
    city: 'Poway',
    region: 'CA',
    postal_code: '92064',
    country: 'US',
    lat: 32.959068,
    lon: -117.037666,
    store_number: '1700',
  },
  name: 'PURCHASE WM SUPERCENTER #1700',
  merchant_name: 'Walmart',
  logo_url: 'https://plaid-merchant-logos.plaid.com/walmart_1100.png',
  website: 'walmart.com',
  payment_meta: {
    by_order_of: null,
    payee: null,
    payer: null,
    payment_method: null,
    payment_processor: null,
    ppd_id: null,
    reason: null,
    reference_number: null,
  },
  pending: false,
  category: {
    primary: 'GENERAL_MERCHANDISE',
    detailed: 'GENERAL_MERCHANDISE_SUPERSTORES',
    confidence_level: 'VERY_HIGH',
  },
  category_icon_url:
    'https://plaid-category-icons.plaid.com/PFC_GENERAL_MERCHANDISE.png',
  plaid_transaction_id: 'lPNjeW1nR6CDn5okmGQ6hEpMo4lLNoSrzqDje',
  original_description: 'Test Description.',
  type: 'online',
};

const mockBalanceResponse = {
  accounts: [
    {
      account_id: 'BxBXxLj1m4HMXBm9WZZmCWVbPjX16EHwv99vp',
      balances: {
        available: 100,
        current: 110,
        iso_currency_code: 'USD',
        limit: null,
        unofficial_currency_code: null,
      },
      mask: '0000',
      name: 'Plaid Checking',
      official_name: 'Plaid Gold Standard 0% Interest Checking',
      persistent_account_id:
        '8cfb8beb89b774ee43b090625f0d61d0814322b43bff984eaf60386e',
      subtype: 'checking',
      type: 'depository',
    },
    {
      account_id: 'dVzbVMLjrxTnLjX4G66XUp5GLklm4oiZy88yK',
      balances: {
        available: null,
        current: 410,
        iso_currency_code: 'USD',
        limit: 2000,
        unofficial_currency_code: null,
      },
      mask: '3333',
      name: 'Plaid Credit Card',
      official_name: 'Plaid Diamond 12.5% APR Interest Credit Card',
      subtype: 'credit card',
      type: 'credit',
    },
    {
      account_id: 'Pp1Vpkl9w8sajvK6oEEKtr7vZxBnGpf7LxxLE',
      balances: {
        available: null,
        current: 65262,
        iso_currency_code: 'USD',
        limit: null,
        unofficial_currency_code: null,
      },
      mask: '7777',
      name: 'Plaid Student Loan',
      official_name: null,
      subtype: 'student',
      type: 'loan',
    },
  ],
  item: {
    available_products: ['balance', 'identity', 'investments'],
    billed_products: ['assets', 'auth', 'liabilities', 'transactions'],
    consent_expiration_time: null,
    error: null,
    institution_id: 'ins_3',
    item_id: 'eVBnVMp7zdTJLkRNr33Rs6zr7KNJqBFL9DrE6',
    update_type: 'background',
    webhook: 'https://www.genericwebhookurl.com/webhook',
  },
  request_id: 'qk5Bxes3gDfv4F2',
};

describe('Plaid Routes', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('POST /api/plaid/create_link_token', () => {
    let mockSupabase;

    beforeEach(() => {
      mockSupabase = {select: sinon.stub()};
      sinon.stub(supabase, 'from').returns(mockSupabase);
      sinon.stub(client, 'linkTokenCreate');
    });

    it('should create a link token', async () => {
      mockSupabase.select.resolves({data: [mockUser], error: null});
      client.linkTokenCreate.resolves({
        link_token: 'sample_token',
        expiration: '2023-10-31T20:38:48Z',
        request_id: 'some_request_id',
      });

      const response = await request(app).post('/api/plaid/create_link_token');
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('link_token', 'sample_token');
    });

    it('should return 500 if there is an error fetching user from Supabase', async () => {
      mockSupabase.select.resolves({data: null, error: 'Error fetching user'});

      const response = await request(app).post('/api/plaid/create_link_token');
      expect(response.status).to.equal(500);
      expect(response.body).to.have.property(
        'message',
        'Failed to fetch user data from the database.',
      );
    });

    it('should return 500 if there is an error creating link token with Plaid', async () => {
      mockSupabase.select.resolves({data: [mockUser], error: null});
      client.linkTokenCreate.rejects(new Error('Plaid error'));

      const response = await request(app).post('/api/plaid/create_link_token');
      expect(response.status).to.equal(500);
    });

    it('should return 404 if no users are found in Supabase', async () => {
      mockSupabase.select.resolves({data: [], error: null});

      const response = await request(app).post('/api/plaid/create_link_token');
      expect(response.status).to.equal(404);
    });
  });

  describe('POST /set_access_token', () => {
    let selectStub, insertStub;

    beforeEach(() => {
      const fromStub = sinon.stub(supabase, 'from');
      selectStub = sinon.stub();
      insertStub = sinon.stub();
      fromStub.withArgs('users').returns({select: selectStub});
      sinon.stub(client, 'itemPublicTokenExchange');
      fromStub.withArgs('items').returns({insert: insertStub});
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should set an access token', async () => {
      selectStub.resolves({data: [mockUser], error: null});
      client.itemPublicTokenExchange.resolves({
        data: {
          access_token: 'mock_access_token',
          item_id: 'mock_item_id',
        },
      });
      insertStub.resolves({data: [mockItem], error: null});

      const response = await request(app)
        .post('/api/plaid/set_access_token')
        .send({public_token: mockToken});

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('user_id', mockUser.user_id);
      expect(response.body).to.have.property(
        'plaid_item_id',
        mockItem.plaid_item_id,
      );
      expect(response.body).to.have.property('status', mockItem.status);
    });

    it('should return error if no public_token provided', async () => {
      client.itemPublicTokenExchange.rejects(
        new Error('Public token not provided'),
      );
      const response = await request(app)
        .post('/api/plaid/set_access_token')
        .send({});

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error');
    });

    it('should return error if invalid public_token provided', async () => {
      client.itemPublicTokenExchange.rejects(
        new Error('Invalid public token provided'),
      );
      const response = await request(app)
        .post('/api/plaid/set_access_token')
        .send({public_token: 'invalid_token'});

      expect(response.status).to.equal(500);
      expect(response.body).to.have.property('error');
    });
  });

  describe('POST /initialize_data', () => {
    let fromStub;
    let selectStub, updateStub, insertStub;
    let tokenExchangeStub, balanceGetStub, transactionsSyncStub;

    beforeEach(() => {
      fromStub = sinon.stub(supabase, 'from');

      selectStub = sinon.stub();
      updateStub = sinon.stub().returnsThis();
      updateStub.eq = sinon.stub().resolves({data: [mockUser], error: null});
      insertStub = sinon.stub();

      fromStub.withArgs('users').returns({
        select: selectStub,
        update: () => updateStub,
      });
      fromStub.withArgs('items').returns({insert: insertStub});
      fromStub.withArgs('accounts').returns({insert: insertStub});
      fromStub.withArgs('transactions').returns({insert: insertStub});

      tokenExchangeStub = sinon.stub(client, 'itemPublicTokenExchange');
      balanceGetStub = sinon.stub(client, 'accountsBalanceGet');
      transactionsSyncStub = sinon.stub(client, 'transactionsSync');
      transactionsSyncStub.callsFake(async req => {
        return {
          data: {
            added: [mockTransaction],
            has_more: false,
            next_cursor: null,
          },
        };
      });
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should initialize data', async () => {
      tokenExchangeStub.resolves({
        data: {
          access_token: ACCESS_TOKEN,
          item_id: 'mock_item_id',
        },
      });

      selectStub.resolves({data: [mockUser], error: null});
      updateStub.eq.resolves({data: [mockUser], error: null});
      balanceGetStub.resolves({data: mockBalanceResponse});
      insertStub.resolves({data: [], error: null});

      const response = await request(app)
        .post('/api/plaid/initialize_data')
        .send({public_token: mockToken});

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
      expect(response.body).to.include.keys(
        'item',
        'latest_transactions',
        'balance',
      );
    });

    it('should return error if no public_token provided', async () => {
      const response = await request(app)
        .post('/api/plaid/initialize_data')
        .send({});

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error');
    });

    it('should return error if invalid public_token provided', async () => {
      const response = await request(app)
        .post('/api/plaid/initialize_data')
        .send({public_token: 'invalid_token'});

      expect(response.status).to.equal(500);
      expect(response.body).to.have.property('error');
    });

    it('should return error if failed to fetch user data', async () => {
      selectStub.resolves({data: null, error: 'Error fetching user'});

      const response = await request(app)
        .post('/api/plaid/initialize_data')
        .send({public_token: ACCESS_TOKEN});

      expect(response.status).to.equal(500);
      expect(response.body).to.have.property('error');
    });
  });
});
