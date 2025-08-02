import { Fragment } from "react";
import { Trans, useLingui } from "@lingui/react/macro";

import Header from "@widgets/app/Header";
import Footer from "@widgets/app/Footer";
import PageTopSection from "@widgets/app/PageTopSection";
import { routes } from "@app/router/routes";
import Container from "@shared/ui/Container/Container";
import Accordion from "@shared/ui/Accordion";
import Spinner from "@shared/ui/Spinner/Spinner";
import { useFaq } from "./hooks/useFaq";

import s from "./Faq.module.scss";

export default function FaqPage() {
  const { t } = useLingui();

  const { faq, isLoading, error } = useFaq();

  const getMainContent = () => {
    if (isLoading) {
      return (
        <div className={s.loadingWrapper}>
          <Spinner />
        </div>
      );
    }

    if (error) {
      return (
        <p className={s.errorTxt}>
          <Trans>Unexpected error occured. Please try again later</Trans>
        </p>
      );
    }

    return faq.map((faqItem, i) => (
      <Fragment key={faqItem[0]}>
        <div className={s.faqCategoryBox}>
          <h4 className={s.faqCategory}>{faqItem[0]}</h4>

          <div className={s.faqItemsContainer}>
            {faqItem[1].map((faqItemData, i) => {
              const notLastItem = i !== faqItem[1].length - 1;

              return (
                <Fragment key={faqItemData.id}>
                  <Accordion
                    summary={faqItemData.question}
                    details={faqItemData.answer}
                  />
                  {notLastItem && <hr className={s.faqItemsHr} />}
                </Fragment>
              );
            })}
          </div>
        </div>

        {i !== faq.length - 1 && <hr className={s.faqCategoryBoxHr} />}
      </Fragment>
    ));
  };

  return (
    <div className={s.pageWrapper}>
      <Header />
      <main>
        <PageTopSection
          title={t`FaqPageTitle`}
          breadcrumbs={[{ label: "FAQ", href: routes.FAQ }]}
          className={s.topSection}
        />
        <section className={s.mainSection}>
          <Container className={s.mainSectionContainer}>
            {getMainContent()}
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
