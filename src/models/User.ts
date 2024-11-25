export interface PostUser {
  name: string;
  phone: string;
  dateOfBirth: string;
  email: string;
  password: string;
}

export interface GetUser {
  id: number;
  name: string;
  phone: string;
  dateOfBirth: string;
  email: string;
  password: string;
  chats: [];
  contacts: [];
  photo: string;
  statusText: string;
  blacklist: [];
}

export interface PostLogin {
  email: string;
  password: string;
}
