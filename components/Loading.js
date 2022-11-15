import React from 'react';

import styles from '../styles/components/Loading.module.sass';

export default function Loading({ page }) {
  return (
    <div className={`${styles.loading} ${page ? styles.loading__page : ''} `}>
      <div className={styles.loading__content}>
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}
