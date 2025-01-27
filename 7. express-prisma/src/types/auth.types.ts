export type User = {
  email: string;
  password: string;
  userId: string;
  createdAt: Date;
};

export type DecodedToken = {
  userId: string;
  iat: number;
  exp: number;
};
