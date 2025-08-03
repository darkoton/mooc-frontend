import { useId, useState } from "react";
import { Trans } from "@lingui/react/macro";

import Modal from "@shared/ui/Modal/Modal";
import Rating from "@shared/ui/Rating/Rating";

import s from "./ReviewModal.module.scss";
import Close from "./assets/icons/Close";
import { IPostReviewRequest, useReviewsStore } from "@entities/review";
import { useParams } from "react-router-dom";
import { useUserStore } from "@entities/user";

interface ReviewModalProps {
  onClose: () => void;
  logo: string
}

export default function ReviewModal({ onClose, logo }: ReviewModalProps) {
  const id = useId();
  const { uuid } = useParams();
  const { user } = useUserStore()

  const [form, setForm] = useState<IPostReviewRequest>({
    course: uuid || '',
    username: user ? (user.first_name + ' ' + user.last_name) : '',
    text: '',
    rating: 0
  })

  const { postReview } = useReviewsStore()

  async function submit() {

    await postReview(form)
    onClose()

  }

  return (
    <Modal open onClose={onClose} className={s.modal}>
      <div className={s.modalInner}>
        <button className={s.modalClose} onClick={onClose}>
          <Close />
        </button>

        <img className={s.logo} src={logo} alt='Logo' />
        <h3 className={s.title}>
          <Trans>Introduction to Notion for Creative Projects</Trans>
        </h3>

        <div className={s.form}>
          <div className={s.rateRow}>
            <Trans>How would you rate this course?</Trans> <Rating value={form.rating} onChange={(value) => { setForm({ ...form, rating: value }) }} />
          </div>

          <div className={s.formGroup}>
            <label htmlFor={`review-${id}`}>
              <Trans>My review</Trans>
            </label>
            <div className={s.textAreaWrapper}>
              <textarea onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setForm({ ...form, text: e.target.value })
              }}
                id={`review-${id}`} className={s.textArea} rows={5} />

              <div className={s.buttons}>
                <button onClick={onClose} type="button" className={s.buttonCancel}>
                  Cancel
                </button>
                <button onClick={submit} type="button" className={s.buttonSubmit}>
                  Submit Review
                </button>
              </div>
            </div>
            <div className={s.counter}>0 / 2000</div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

