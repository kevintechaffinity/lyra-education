import React from 'react';

import styles from '../../styles/components/OutlineContainer.module.sass';

import Page from './Page';

const { DateTime } = require('luxon');

export default function Chapter({ chapter, days, index, status }) {
  const label = () => {
    const tomorrow = DateTime.local().plus({ days: 1 }).toFormat('dd LLL y');
    const today = DateTime.local().toFormat('dd LLL y');
    const date = DateTime.local().plus({ days }).toFormat('dd LLL y');

    if (chapter.status === 'COMPLETED') {
      return 'Completed';
    }

    if (tomorrow === date) return 'Tomorrow';
    if (today === date) return 'Today';

    return date;
  };

  if (status === 'INACTIVE') return '';

  return (
    <span className={`${styles.outlineContainer__chapter}`}>
      <div className={styles.outlineContainer__heading}>
        <span className={styles.outlineContainer__heading_label}>
          Day {index + 1}: {chapter.name}
        </span>
        <span href="/" className={styles.outlineContainer__button}>
          {label()}
        </span>
      </div>
      {chapter.pages.map((page, i) => (
        <Page page={page} key={i} index={i} />
      ))}
    </span>
  );
}
