import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { getLocale } from "./utils";

type State = {
  locale: string;
};

type Actions = {
  setLocale: (locale: string) => void;
};

export const useTranslationsStore = create<State & Actions>()(
  immer((set) => ({
    locale: getLocale(),

    setLocale: (locale) => {
      set((state) => {
        state.locale = locale;
      });
    },
  }))
);
