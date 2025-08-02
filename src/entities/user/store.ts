import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { type IUser } from "./types/User";
import { type UpdateUserRequest } from "./types/requests/UpdateUser";
import userService from "./service";

type State = {
  user: IUser | null;
};

type Actions = {
  get: () => Promise<void>;
  update: (data: UpdateUserRequest) => Promise<void>;
  clear: () => void;
};

export const useUserStore = create<State & Actions>()(
  immer((set) => ({
    user: null,

    get: async () => {
      const user = await userService.get();
      set((state) => {
        state.user = user;
      });
    },
    update: async (data) => {
      const updatedUser = await userService.update(data);
      set((state) => {
        state.user = updatedUser;
      });
    },
    clear() {
      set((state) => {
        state.user = null;
      });
    },
  }))
);
