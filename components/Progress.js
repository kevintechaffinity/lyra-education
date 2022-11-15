import React from 'react';

import styles from '../styles/components/Progress.module.sass';

export default function Progress({ progress }) {
  if (!progress) return null;

  return (
    <div className={styles.progress}>
      {progress.map((item, index) => (
        <div
          className={`${styles.progress__item} ${item.completed ? styles.progress__active : ''} ${
            item.current ? styles.progress__current : ''
          }`}
          key={index}
        />
      ))}
    </div>
  );
}
