export interface PostChat {
  id: number;
  name: string;
  lastMessage: string;
  image: string;
  isRead: boolean;
}

interface User {
  userId: number;
  name: string;
  nickname: string;
  photo: string;
  phone: string;
}

interface Message {
  senderId: number;
  content: string;
  timestamp: string;
}

export interface GetChat {
  chatId: number;
  name: string;
  users: User;
  messages: Message;
  lastMessage: Message;
  hasMessages: boolean;
  createdAt: string;
  updatedAt: boolean;
}

// {
//   "chatId": 1,
//   "name": "Nathan Rocha - Camile <3",
//   "users": [
//     {
//       "userId": 1,
//       "name": "Nathan Rocha",
//       "email": "nathan@gmail.com",
//       "phone": "11981913481",
//       "photo": ""
//     },
//     {
//       "userId": 2,
//       "name": "Camile Vitória",
//       "email": "camile@gmail.com",
//       "phone": "19983798966",
//       "photo": ""
//     }
//   ],
//   "messages": [],
//   "lastMessage": null,
//   "createdAt": "2024-11-28T08:58:24.178Z",
//   "updatedAt": "2024-11-28T08:58:24.179Z"
// }