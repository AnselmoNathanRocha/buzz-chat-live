export interface PostChat {
  id: number;
  name: string;
  lastMessage: string;
  image: string;
  isRead: boolean;
}

export interface GetChat {
  id: number;
  name: string;
  lastMessage: string;
  image: string;
  isRead: boolean;
}
