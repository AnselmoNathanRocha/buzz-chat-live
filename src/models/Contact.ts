export interface PostContact {
  nickname: string;
  phone: string;
}

export interface GetContact {
  contactId: number;
  userId: number;
  chatId: number;
  name: string;
  nickname: string;
  phone: string;
  statusMessage: string;
  photo: string;
  createdAt: string;
  updatedAt: string;
}