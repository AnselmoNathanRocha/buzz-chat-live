import { httpClient } from "./http-client";
import { GetContact, PostContact } from "../models/Contact";

class ContactService {
  async get(): Promise<GetContact[]> {
    const response = await httpClient.get("/contacts");
    return response.data;
  }

  async create(data: PostContact) {
    await httpClient.post("/contacts", data);
  }
}

export const contactService = new ContactService();
