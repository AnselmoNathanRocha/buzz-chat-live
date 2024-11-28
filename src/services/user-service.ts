import { httpClient } from "./http-client";
import { GetUser, PostLogin, PostUser } from "@/models/User";

class UserService {
  async get(): Promise<GetUser> {
    const response = await httpClient.get("/user");
    return response.data;
  }

  async getById(id: number): Promise<GetUser> {
    const response = await httpClient.get(`/user/${id}`);
    return response.data;
  }

  async create(data: PostUser) {
    const response = await httpClient.post("/user", data);
    return response.data;
  }

  async authentication(data: PostLogin) {
    const response = await httpClient.post("/auth/login", data);
    return response;
  }
}

export const userService = new UserService();
