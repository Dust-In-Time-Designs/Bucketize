const request = require('supertest');
const sinon = require('sinon');
const {expect} = require('chai');
const app = require('../server');
const {client, supabase} = require('./utils');

describe('Plaid Routes', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('POST /api/plaid/create_link_token', () => {
    let mockSupabase, selectStub, linkTokenStub;

    beforeEach(() => {
      mockSupabase = {select: sinon.stub()};
      sinon.stub(supabase, 'from').returns(mockSupabase);
      linkTokenStub = sinon.stub(client, 'linkTokenCreate');
    });

    it('should create a link token', async () => {
      const mockUser = {user_id: '12345'};
      mockSupabase.select.resolves({data: [mockUser], error: null});
      linkTokenStub.resolves({data: 'sample_token'});

      const response = await request(app).post('/api/plaid/create_link_token');
      console.log(response.status, response.body);

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('data', 'sample_token');
    });

    it('should return 401 if there is an error fetching user from Supabase', async () => {
      mockSupabase.select.resolves({data: null, error: 'Error fetching user'});

      const response = await request(app).post('/api/plaid/create_link_token');

      expect(response.status).to.equal(401);
      expect(response.body).to.have.property('error', 'Error fetching user');
    });

    it('should return 500 if there is an error creating link token with Plaid', async () => {
      const mockUser = {user_id: '12345'};

      mockSupabase.select.resolves({data: [mockUser], error: null});
      linkTokenStub.rejects(new Error('Plaid error'));

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
    let selectStub, linkTokenStub;

    beforeEach(() => {
      selectStub = sinon.stub(supabase.from('users'), 'select');
      linkTokenStub = sinon.stub(client, 'linkTokenCreate');
    });

    it('should set an access token', async () => {
      const mockToken = 'public_token_sample';
      const mockUser = {user_id: '12345'};

      selectStub.returns(Promise.resolve({data: [mockUser], error: null}));
      linkTokenStub.returns(Promise.resolve({data: 'sample_token'}));

      const response = await request(app)
        .post('/set_access_token')
        .send({public_token: mockToken});

      response.should.have.status(200);
      response.body.should.be.an('object');
      response.body.should.have.property('item');
    });

    it('should return error if no public_token provided', async () => {
      const response = await request(app).post('/set_access_token').send({});
      response.should.have.status(400);
      response.body.should.have.property('error');
    });

    it('should return error if invalid public_token provided', async () => {
      const response = await request(app)
        .post('/set_access_token')
        .send({public_token: 'invalid_token'});
      response.should.have.status(500);
      response.body.should.have.property('error');
    });
  });

  describe('POST /initialize_data', () => {
    let selectStub, linkTokenStub;

    beforeEach(() => {
      selectStub = sinon.stub(supabase.from('users'), 'select');
      linkTokenStub = sinon.stub(client, 'linkTokenCreate');
    });

    it('should initialize data', async () => {
      const mockToken = 'public_token_sample';
      const mockUser = {user_id: '12345'};

      selectStub.returns(Promise.resolve({data: [mockUser], error: null}));
      linkTokenStub.returns(Promise.resolve({data: 'sample_token'}));

      const response = await request(app)
        .post('/initialize_data')
        .send({public_token: mockToken});

      response.should.have.status(200);
      response.body.should.be.an('object');
      response.body.should.have.properties([
        'item',
        'latest_transactions',
        'balance',
      ]);
    });

    it('should return error if no public_token provided', async () => {
      const response = await request(app).post('/initialize_data').send({});
      response.should.have.status(400);
      response.body.should.have.property('error');
    });

    it('should return error if invalid public_token provided', async () => {
      const response = await request(app)
        .post('/initialize_data')
        .send({public_token: 'invalid_token'});
      response.should.have.status(500);
      response.body.should.have.property('error');
    });

    it('should return error if failed to fetch user data', async () => {
      sinon
        .stub(supabase.from('users').prototype, 'select')
        .returns(Promise.resolve({data: null, error: 'Error fetching user'}));

      const response = await request(app)
        .post('/initialize_data')
        .send({public_token: 'valid_token'});
      response.should.have.status(500);
      response.body.should.have.property('error');
    });
  });
});
