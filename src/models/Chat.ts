export interface PostChat {
  id: number;
  name: string;
  lastMessage: string;
  image: string;
  isRead: boolean;
}

export interface GetChat {
  id: number;
  idUser: number;
  receiverId: number;
  nameContact: string;
  namphoneeContact: string;
  photoUser: string;
  lastMessage: string;
  createdAt: string;
  updatedAt: boolean;
}
