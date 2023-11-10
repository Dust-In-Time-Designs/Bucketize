import {AUTH_LOGIN, AUTH_LOGOUT} from '../types';

const initialState = {
  user: null,
  accessToken: '',
  itemId: '',
};

type Action = {
  type: string;
  payload?: any;
};

export default (state: any = initialState, action: Action) => {
  switch (action.type) {
    case AUTH_LOGIN:
      console.log('payload', action.payload)
      return Object.assign({}, state, {
        user: action.payload,
      });
    case AUTH_LOGOUT:
      return Object.assign({}, state, {
        user: null,
      });
    default:
      return state;
  }
};
