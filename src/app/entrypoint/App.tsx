import { Suspense, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { ToastContainer } from "react-toastify";

import { useTranslationsStore } from "@entities/translations";
import Spinner from "@shared/ui/Spinner/Spinner";
import { router } from "../router/router";
import { useGetUserData } from "../hooks/useGetUserData";

function App() {
  const locale = useTranslationsStore((state) => state.locale);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const { messages } = await import(
          `../../locales/${locale}/translations.po`
        );
        i18n.load(locale, messages);
        i18n.activate(locale);
        // eslint-disable-next-line
      } catch { }
    };

    loadTranslations();
  }, [locale]);

  useGetUserData();

  return (
    <I18nProvider i18n={i18n}>
      <Suspense fallback={<Spinner />}>
        <RouterProvider router={router} />
        <ToastContainer />
      </Suspense>
    </I18nProvider>
  );
}

export default App;
