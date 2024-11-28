export interface PostMessage {
  chatId: number;
  content: string;
}

export interface GetMessage {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  sentAt: string;
}