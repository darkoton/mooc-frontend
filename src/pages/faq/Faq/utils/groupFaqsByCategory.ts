import { type IFaq } from "@entities/faq";

export const groupFaqsByCategory = (faq: IFaq[]) => {
  return faq.reduce(
    (acc, faq) => {
      const categoryIndex = acc.findIndex(
        (accFaq) => accFaq[0] === faq.category
      );

      if (categoryIndex !== -1) {
        acc[categoryIndex][1].push(faq);
      } else {
        acc.push([faq.category, [faq]]);
      }

      return acc;
    },
    [] as [string, IFaq[]][]
  );
};
