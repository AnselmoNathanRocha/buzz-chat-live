import { httpClient } from "./http-client";
import { PostContact } from "../models/Contact";
import { GetChat } from "@/models/Chat";

class ContactService {
  async get(): Promise<GetChat[]> {
    const response = await httpClient.get("/contact");
    return response.data;
  }

  async create(data: PostContact) {
    await httpClient.post("/contact", data);
  }
}

export const contactService = new ContactService();
