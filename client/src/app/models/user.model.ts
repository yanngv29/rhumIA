export interface User {
  id?: string;
  username: string;  // This is the field used in the frontend
  email: string;
  token?: string;
}

export interface UserRegister {
  name: string;  // This matches what the backend expects
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