export interface PostMessage {
  receiverId: number;
  message: string;
}

export interface GetMessage {
  id: number;
  senderId: number;
  receiverId: number;
  message: string;
  sentAt: string;
}