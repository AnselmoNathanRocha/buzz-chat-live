export interface PostMessage {
  chatId: number;
  content: string;
}

export interface GetMessage {
  id: number;
  senderId: number;
  content: string;
  sentAt: string;
  isSender: boolean;
}