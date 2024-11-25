import { httpClient } from "./http-client";
import { GetMessage, PostMessage } from "../models/Message";

class MessageService {
  async get(): Promise<GetMessage[]> {
    const response = await httpClient.get("/messages");
    return response.data;
  }

  async create(data: PostMessage) {
    const response = await httpClient.post("/messages", data);
    return response.data;
  }
}

export const messageService = new MessageService();
