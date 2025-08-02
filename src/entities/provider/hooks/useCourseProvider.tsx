import { useProvidersStore } from "../store/provider";
import { IProvider } from "../types/Provider";

export const useCourseProvider = (providerId: string | number) => {
  const providers = useProvidersStore(
    (state: { providers: IProvider[] }) => state.providers
  );

  return providers.find((p) => String(p.uuid) === String(providerId));
};
