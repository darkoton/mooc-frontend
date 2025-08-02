import { api } from "@shared/api/api";

import type { ISignupRequest } from "./types/requests/Signup";
import type { ISignupResponse } from "./types/responses/Signup";
import type { ILoginRequest } from "./types/requests/Login";
import type { ILoginResponse } from "./types/responses/Login";

class AuthService {
  async signup(data: ISignupRequest): Promise<ISignupResponse> {
    return (await api.post("/auth/signup/", data)).data;
  }

  async login(data: ILoginRequest): Promise<ILoginResponse> {
    return (await api.post("/auth/login/", data)).data;
  }

  async logout() {
    return (await api.post("/auth/logout")).data;
  }
}

const authService = new AuthService();

export { authService };
