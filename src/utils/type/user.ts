export type Current = {
  email: string;
  firstname: string;
  lastname: string;
};

export type UserSlice = {
  isLoggedIn: boolean;
  accessToken: string;
};
