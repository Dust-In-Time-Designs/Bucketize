export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  birthday: Date;
};

export type CreateUser = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  birthday: Date;
};
