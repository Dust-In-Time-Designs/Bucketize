import {PLAID_TOKEN} from '../types';

const initialState = {
  accessToken: '',
  itemId: '',
};

type Action = {
  type: string;
  payload?: any;
};

export default (state: any = initialState, action: Action) => {
  switch (action.type) {
    case PLAID_TOKEN:
      return Object.assign({}, state, {
        accessToken: action.payload,
        itemId: action.payload.itemId,
      });
    default:
      return state;
  }
};
