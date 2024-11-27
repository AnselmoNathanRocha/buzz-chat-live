import { httpClient } from "./http-client";
import { GetChat, PostChat } from "../models/Chat";

class ChatService {
  async get(): Promise<GetChat[]> {
    const response = await httpClient.get("/chat");
    return response.data;
  }

  async create(data: PostChat) {
    await httpClient.post("/chat", data);
  }
}

export const chatService = new ChatService();
