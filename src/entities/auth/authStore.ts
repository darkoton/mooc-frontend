import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import type { ISignupRequest } from "./types/requests/Signup";
import { LS_KEYS } from "@shared/utils/const";
import { authService } from "./authService";
import type { ISignupResponse } from "./types/responses/Signup";
import type { ILoginRequest } from "./types/requests/Login";
import type { ILoginResponse } from "./types/responses/Login";

type State = {
  auth: boolean;
};

type Actions = {
  signup: (data: ISignupRequest) => Promise<ISignupResponse>;
  login: (data: ILoginRequest) => Promise<ILoginResponse>;
  setAuth: (auth: boolean) => void;
  logout: () => Promise<void>;
};

export const useAuthStore = create<State & Actions>()(
  immer((set) => ({
    auth: !!localStorage.getItem(LS_KEYS.ACCESS_TOKEN),

    signup: async (data) => {
      const response = await authService.signup(data);
      set((state) => {
        state.auth = true;
      });
      return response;
    },
    login: async (data) => {
      const response = await authService.login(data);
      set((state) => {
        state.auth = true;
      });
      return response;
    },
    setAuth: (auth) => {
      set((state) => {
        state.auth = auth;
      });
    },
    logout: async () => {
      await authService.logout();
      set((state) => {
        state.auth = false;
      });
    },
  }))
);
