import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Register: undefined;
  Login: undefined;
  Dashboard: {userId: string};
};

export type HomeScreenRouteProp = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;

export type RegisterScreenRouteProp = NativeStackScreenProps<
  RootStackParamList,
  'Register'
>;

export type LoginScreenRouteProp = NativeStackScreenProps<
  RootStackParamList,
  'Login'
>;

export type DashboardScreenRouteProp = NativeStackScreenProps<
  RootStackParamList,
  'Dashboard'
>;
