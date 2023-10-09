import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Register: undefined;
};

export type HomeScreenRouteProp = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;

export type RegisterScreenRouteProp = NativeStackScreenProps<
  RootStackParamList,
  'Register'
>;
