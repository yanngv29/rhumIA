export interface User {
  id?: string;
  username: string;
  email: string;
  token?: string;
}

export interface UserRegister {
  username: string;
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}