import React from 'react';

import styles from '../styles/components/Steps.module.sass';

import Icon from './Icon';

export default function Steps({ page }) {
  const { progress, moduleSlug, chapter } = page;
  if (!progress) return null;
  const { previous, next, nextName, previousName } = progress.find((obj) => obj.current);

  return (
    <div className={styles.steps}>
      <a
        className={`${styles.steps__item} ${styles.steps__previous}`}
        href={`/module/${moduleSlug}/${previous || ''}`}
      >
        {previous && <Icon name="FaAngleLeft" />}
        <div className={styles.steps__content}>
          {previous ? 'Back' : 'Overview'}
          <label className={styles.steps__label}>{previousName || chapter}</label>
        </div>
      </a>
      <a
        className={`${styles.steps__item} ${styles.steps__next}`}
        href={`/module/${moduleSlug}/${next || ''}`}
      >
        <div className={`${styles.steps__right} ${styles.steps__content}`}>
          {next ? 'Next' : 'Completed'}
          <label className={styles.steps__label}>{nextName || chapter}</label>
        </div>
        {next && <Icon name="FaAngleRight" />}
      </a>
    </div>
  );
}
