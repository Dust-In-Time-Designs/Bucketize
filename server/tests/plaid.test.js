const request = require('supertest');
const sinon = require('sinon');
const {expect} = require('chai');
const app = require('../server');
const {client, supabase} = require('./utils');

describe('Plaid Routes', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('POST /create_link_token', () => {
    it('should create a link token', async () => {
      const mockUser = {user_id: '12345'};

      // Stub supabase call
      sinon
        .stub(supabase.from('users').prototype, 'select')
        .returns(Promise.resolve({data: [mockUser], error: null}));

      // Stub Plaid client
      sinon
        .stub(client, 'linkTokenCreate')
        .returns(Promise.resolve({data: 'sample_token'}));

      const response = await request(app).post('/create_link_token');

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('data', 'sample_token');
    });

    it('should return 401 if there is an error fetching user from Supabase', async () => {
      sinon
        .stub(supabase.from('users').prototype, 'select')
        .returns(Promise.resolve({data: null, error: 'Error fetching user'}));

      const response = await request(app).post('/create_link_token');

      expect(response.status).to.equal(401);
      expect(response.body).to.have.property('error', 'Error fetching user');
    });
    it('should return 500 if there is an error creating link token with Plaid', async () => {
      const mockUser = {user_id: '12345'};

      sinon
        .stub(supabase.from('users').prototype, 'select')
        .returns(Promise.resolve({data: [mockUser], error: null}));

      sinon.stub(client, 'linkTokenCreate').rejects(new Error('Plaid error'));

      const response = await request(app).post('/create_link_token');

      expect(response.status).to.equal(500);
    });
    it('should return 404 if no users are found in Supabase', async () => {
      sinon
        .stub(supabase.from('users').prototype, 'select')
        .returns(Promise.resolve({data: [], error: null}));

      const response = await request(app).post('/create_link_token');

      expect(response.status).to.equal(404);
    });
  });

  describe('POST /set_access_token', () => {
    it('should set an access token', async () => {
      const mockToken = 'public_token_sample';
      const mockUser = {user_id: '12345'};

      // ... similar stubs and then send request

      const response = await request(app)
        .post('/set_access_token')
        .send({public_token: mockToken});

      // ... assertions
    });

    // Add more tests for error scenarios
  });

  describe('POST /initialize_data', () => {
    it('should initialize data', async () => {
      const mockToken = 'public_token_sample';
      const mockUser = {user_id: '12345'};

      // ... similar stubs and then send request

      const response = await request(app)
        .post('/initialize_data')
        .send({public_token: mockToken});

      // ... assertions
    });

    // Add more tests for error scenarios
  });
});
