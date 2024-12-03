import { httpClient } from "./http-client";

class VerifyTokenService {
  async get(): Promise<{ message: string }> {
    const response = await httpClient.get("/auth/token");
    return response.data;
  }
}

export const verifyTokenService = new VerifyTokenService();
