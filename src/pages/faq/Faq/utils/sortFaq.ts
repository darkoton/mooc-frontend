import { type IFaq } from "@entities/faq";

export const sortFaq = (faq: IFaq[]) => {
  faq.sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );
};
