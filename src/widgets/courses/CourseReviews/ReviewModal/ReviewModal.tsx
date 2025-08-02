import { useId } from "react";
import { Trans } from "@lingui/react/macro";
import { Bounce, toast as notify } from "react-toastify";

import Modal from "@shared/ui/Modal/Modal";
import Rating from "@shared/ui/Rating/Rating";

import s from "./ReviewModal.module.scss";
import Close from "./assets/icons/Close";
import Success from './assets/icons/Success';

interface ReviewModalProps {
  onClose: () => void;
  logo: string
}

export default function ReviewModal({ onClose, logo }: ReviewModalProps) {
  const id = useId();

  function submit() {
    notify(NotificationSuccess, {
      position: "bottom-center",
      autoClose: 5000,
      closeButton: false,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
      icon: false,
      style: {
        background: "#4DB930",
        color: "#fff",
        padding: "0",
        minHeight: 'auto'
      },
    });


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

        <form className={s.form}>
          <div className={s.rateRow}>
            <Trans>How would you rate this course?</Trans> <Rating />
          </div>

          <div className={s.formGroup}>
            <label htmlFor={`review-${id}`}>
              <Trans>My review</Trans>
            </label>
            <div className={s.textAreaWrapper}>
              <textarea id={`review-${id}`} className={s.textArea} rows={5} />

              <div className={s.buttons}>
                <button onClick={onClose} type="button" className={s.buttonCancel}>
                  Cancel
                </button>
                <button onClick={submit} type="submit" className={s.buttonSubmit}>
                  Submit Review
                </button>
              </div>
            </div>
            <div className={s.counter}>0 / 2000</div>
          </div>
        </form>
      </div>
    </Modal>
  );
}

function NotificationSuccess() {
  return (
    <div className={s.toast}>
      <Success />
      <span className={s.toastText}>Review succesfully added! </span>
    </div>
  );
}
