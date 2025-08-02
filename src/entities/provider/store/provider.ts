import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { providerService } from "../services/provider";
import { IProvider } from "../types/Provider";

type State = {
  providers: IProvider[];
};

type Actions = {
  getProviders: () => Promise<void>;
};

export const useProvidersStore = create<State & Actions>()(
  immer((set) => ({
    providers: [],

    getProviders: async () => {
      try {
        const providers = await providerService.getAll();
        set((state) => {
          state.providers = providers;
        });
        // eslint-disable-next-line no-empty
      } catch {}
    },
  }))
);
