import { httpClient } from "./http-client";
import { GetMessage, PostMessage } from "../models/Message";

class MessageService {
  async get(): Promise<GetMessage[]> {
    const response = await httpClient.get("/message");
    return response.data;
  }

  async getById(chatId: number): Promise<GetMessage[]> {
    const response = await httpClient.get(`/message/${chatId}`);
    return response.data;
  }

  async create(data: PostMessage) {
    const response = await httpClient.post("/message", data);
    return response.data;
  }
}

export const messageService = new MessageService();
