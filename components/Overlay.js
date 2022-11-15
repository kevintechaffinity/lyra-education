import React from 'react';

import styles from '../styles/components/Overlay.module.sass';

export default function Overlay({ children, clickBehaviour, show }) {
  return (
    <div
      onClick={clickBehaviour}
      className={show ? `${styles.overlay} ${styles.overlay__active}` : styles.overlay__inactive}
    >
      {children}
    </div>
  );
}
