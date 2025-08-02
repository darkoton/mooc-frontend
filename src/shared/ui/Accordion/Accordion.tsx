import { useRef, useState, type ReactNode } from "react";
import clsx from "clsx";

import { useAccordionHeight } from "./hooks/useAccordionHeight";

import s from "./Accordion.module.scss";

interface AccordionProps {
  summary: ReactNode;
  details: string;
  summaryClassName?: string;
  detailsClassName?: string;
}

export default function Accordion({
  summary,
  details,
  summaryClassName,
  detailsClassName,
}: AccordionProps) {
  const [open, setOpen] = useState(false);

  const detailsRef = useRef<HTMLDivElement>(null);

  useAccordionHeight(detailsRef, open);

  return (
    <div className={clsx(s.accordion, open && s.accordionOpen)}>
      <h3 className={clsx(s.summary, summaryClassName)}>
        <button className={s.summaryBtn} onClick={() => setOpen(!open)}>
          {summary}
        </button>
      </h3>

      <div
        ref={detailsRef}
        className={clsx(s.details, detailsClassName)}
        style={{ maxHeight: open ? "auto" : 0 }}
      >
        <div
          className={s.detailsInner}
          dangerouslySetInnerHTML={{ __html: details }}
        />
      </div>
    </div>
  );
}
