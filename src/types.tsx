import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  Register: undefined;
  Login: undefined;
  Dashboard: undefined;
  WalletDetails: {accessToken: string; itemId: string};
  Plaid: undefined;
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
  RootStackParamList,
  'Dashboard'
>;

export type WalletDetailsScreenRouteProp = StackNavigationProp<
  RootStackParamList,
  'WalletDetails'
>;

export type PlaidScreenRouteProp = StackNavigationProp<
  RootStackParamList,
  'Plaid'
>;

export type WalletDetails = {accessToken: string; itemId: string};
