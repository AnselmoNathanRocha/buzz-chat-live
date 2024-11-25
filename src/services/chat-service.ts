import { httpClient } from "./http-client";
import { GetChat, PostChat } from "../models/Chat";

class ChatService {
  async get(): Promise<GetChat[]> {
    const response = await httpClient.get("/chats");
    return response.data;
  }

  async create(data: PostChat) {
    await httpClient.post("/chats", data);
  }
}

export const chatService = new ChatService();
