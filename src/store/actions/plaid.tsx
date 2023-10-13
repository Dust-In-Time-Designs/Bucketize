import {PLAID_TOKEN} from '../types';
import {PlaidAuth} from '../../models/user';

const getPlaidToken = (payload: PlaidAuth) => ({
  type: PLAID_TOKEN,
  payload,
});

export default {
  getPlaidToken,
};
