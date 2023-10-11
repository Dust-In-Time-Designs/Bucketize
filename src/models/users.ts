export type CreateUser = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phoneNumber: string;
  birthday: Date;
};

export type User = {
  id: number;
  userId: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phoneNumber: string;
  birthday: Date;
};
