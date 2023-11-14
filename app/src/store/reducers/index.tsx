import {combineReducers} from 'redux';
import auth from './auth';
import plaid from './plaid';

const appReducer = combineReducers({
  auth,
  plaid,
});

export default appReducer;

export type State = ReturnType<typeof appReducer>;
