export type Login = {
  email: string;
  password: string;
};

export type SignUp = Login & {
  name: string;
};
