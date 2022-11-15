import React from 'react';

import styles from '../styles/components/Summary.module.sass';

export default function SummaryCard({ count, description }) {
  return (
    <div className={styles.summary__card}>
      <span className={styles.summary__card_heading}>{count}+</span>
      {description}
    </div>
  );
}
