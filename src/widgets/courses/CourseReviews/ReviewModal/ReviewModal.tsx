import { useId } from "react";
import { Trans } from "@lingui/react/macro";

import Modal from "@shared/ui/Modal/Modal";
import Rating from "@shared/ui/Rating/Rating";

import s from "./ReviewModal.module.scss";

interface ReviewModalProps {
  onClose: () => void;
}

export default function ReviewModal({ onClose }: ReviewModalProps) {
  const id = useId();

  return (
    <Modal open onClose={onClose} className={s.modal}>
      <div className={s.modalInner}>
        <h3 className={s.title}>
          Introduction to Notion for Creative Projects
        </h3>

        <form>
          <div className={s.rateRow}>
            <Trans>How would you rate this course?</Trans> <Rating />
          </div>

          <div className={s.formGroup}>
            <label htmlFor={`name-${id}`}>
              <Trans>Name</Trans>
            </label>
            <input type="text" id={`name-${id}`} className={s.input} />
          </div>

          <div className={s.formGroup}>
            <label htmlFor={`review-${id}`}>
              <Trans>My review</Trans>
            </label>
            <div className={s.textAreaWrapper}>
              <textarea id={`review-${id}`} className={s.textArea} rows={4} />
              <div className={s.counter}>0 / 2000</div>
            </div>
          </div>

          <div>
            <button type="button">
              <Trans>Cancel</Trans>
            </button>
            <button type="submit">
              <Trans>Submit Review</Trans>
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
