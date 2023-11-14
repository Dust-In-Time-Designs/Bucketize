import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {NavigatorScreenParams} from '@react-navigation/native';

export type BottomTabParamList = {
  Dashboard: undefined;
  Transactions: undefined;
};

export type DashboardTabScreenRouteProp = RouteProp<
  BottomTabParamList,
  'Dashboard'
>;
export type TransactionScreenRouteProp = RouteProp<
  BottomTabParamList,
  'Transactions'
>;

export type RootStackParamList = {
  Home: undefined;
  Register: undefined;
  Login: undefined;
  Plaid: undefined;
  LoggedIn: NavigatorScreenParams<BottomTabParamList> | undefined;
};

export type HomeScreenRouteProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

export type RegisterScreenRouteProp = StackNavigationProp<
  RootStackParamList,
  'Register'
>;

export type LoginScreenRouteProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

export type DashboardScreenRouteProp = StackNavigationProp<
  BottomTabParamList,
  'Dashboard'
>;

export type PlaidScreenRouteProp = StackNavigationProp<
  RootStackParamList,
  'Plaid'
>;

export type PlaidCounterparty = {
  name: string;
  type: string;
  logo_url: string | null;
  website: string | null;
  entity_id: string | null;
  confidence_level: string | null;
};

export type PlaidLocation = {
  address: string | null;
  city: string | null;
  region: string | null;
  postal_code: string | null;
  country: string | null;
  lat: string | null;
  lon: string | null;
  store_number: string | null;
};

export type PlaidPaymentMeta = {
  by_order_of: string | null;
  payee: string | null;
  payer: string | null;
  payment_method: string | null;
  payment_processor: string | null;
  ppd_id: string | null;
  reason: string | null;
  reference_number: string | null;
};

export type PlaidPersonalFinanceCategory = {
  primary: string;
  detailed: string;
  confidence_level: string | null;
};

export type PlaidTransaction = {
  account_id: string;
  account_owner: string | null;
  amount: number;
  authorized_date: string | null;
  iso_currency_code: string | null;
  unofficial_currency_code: string | null;
  counterparties: PlaidCounterparty[];
  date: string;
  location: PlaidLocation;
  name: string;
  merchant_name: string | null;
  merchant_entity_id: string | null;
  original_description: string | null;
  logo_url: string | null;
  website: string | null;
  payment_meta: PlaidPaymentMeta;
  payment_channel: string;
  pending: boolean;
  pending_transaction_id: string | null;
  personal_finance_category: PlaidPersonalFinanceCategory | null;
  personal_finance_category_icon_url: string;
  plaid_transaction_id: string;
  type: string | null;
  created_at: string;
  updated_at: string;
};

export type PlaidBalance = {
  available: number | null;
  current: number | null;
  iso_currency_code: string | null;
  limit: number | null;
  unofficial_currency_code: string | null;
  last_updated_datetime: string | null;
};

export type PlaidAccount = {
  account_id: string;
  item_id: string;
  balances: PlaidBalance;
  mask: string | null;
  name: string;
  official_name: string | null;
  persistent_account_id: string;
  subtype: string | null;
  type: string;
  verification_status: string;
};

export type PlaidError = {
  error_type: string;
  error_code: string;
  error_message: string;
  display_message: string | null;
  request_id: string;
  causes: string[];
  status: number | null;
  documentation_url: string;
  suggested_action: string | null;
};

export type PlaidItem = {
  available_products: string[];
  billed_products: string[];
  products: string[];
  consented_products: string[];
  error: PlaidError | null;
  institution_id: string | null;
  item_id: string;
  update_type: string;
  webhook: string | null;
  consent_expiration_time: string | null;
};
