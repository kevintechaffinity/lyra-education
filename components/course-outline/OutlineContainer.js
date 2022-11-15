import React from 'react';

import styles from '../../styles/components/OutlineContainer.module.sass';

import Chapter from './Chapter';

export default function OutlineContainer({ chapters, slug }) {
  if (!chapters) return '';
  let days = 0;

  const calcDays = (status) => {
    if (status !== 'PENDING') return days;
    days += 1;
    return days;
  };

  return (
    <div className={styles.outlineContainer}>
      <h4>Course outline</h4>
      {chapters.map((chapter, i) => (
        <Chapter chapter={chapter} key={i} index={i} days={calcDays(chapter.status)} slug={slug} />
      ))}
    </div>
  );
}
