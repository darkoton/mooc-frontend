import React from 'react';
import s from "./SuccessNotification.module.scss";

type SuccessNotificationProps = {
  text: string
  Icon: React.FC
}

export function SuccessNotification(props: SuccessNotificationProps) {
  return () => (
    <div className={s.toast}>
      <props.Icon />
      <span className={s.toastText}>{props.text}</span>
    </div>
  );
}
