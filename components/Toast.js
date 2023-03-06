import React from 'react';
import {
  FaCheckCircle,
  FaDotCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaTimesCircle,
} from 'react-icons/fa';
import { toast } from 'react-toastify';

import styles from '../styles/components/Toast.module.sass';

export function Icon(type) {
  switch (type) {
    case 'success':
      return <FaCheckCircle />;
    case 'info':
      return <FaInfoCircle />;
    case 'error':
      return <FaTimesCircle />;
    case 'warning':
      return <FaExclamationCircle />;
    default:
      return <FaDotCircle />;
  }
}

function ToastMessage({ type, title, message, link = null }) {
  return toast[type](
    <div className={styles.toast}>
      <div className={styles.toast__title}>
        {Icon(type)}
        <span>{title}</span>
      </div>
      <div className={styles.toast__message} dangerouslySetInnerHTML={{ __html: message }} />
      {link}
    </div>,
  );
}

ToastMessage.dismiss = toast.dismiss;

export default ToastMessage;
