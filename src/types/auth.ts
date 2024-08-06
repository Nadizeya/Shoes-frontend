import { UserT } from "./user";

export type SignInCredentialT = {
  username: string; // this will be email or phone as value but key name will be username as payload
  password: string;
};

export type SignInResponseT = {
  access_token: string;
  user: UserT;
};
