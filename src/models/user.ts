export type CreateUser = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phoneNumber: string;
  birthday: Date;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string | undefined;
  phoneNumber: string;
  birthday: Date;
  accessToken: string;
};

export type PlaidAuth = {
  accessToken: string;
  itemId: string;
};
