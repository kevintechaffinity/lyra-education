import React from 'react';

import styles from '../styles/components/Loading.module.sass';

export default function Loading() {
  return (
    <div className={`${styles.loading}`}>
      <div className={styles.loading__content}>
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}
