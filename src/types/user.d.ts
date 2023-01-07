export type NewUser = {
  name: string;
  lastname: string;
  email: string;
  password: string;
  repeat_password: string;
};

export type UpdateUser = {
  name: string;
  lastname: string;
};
