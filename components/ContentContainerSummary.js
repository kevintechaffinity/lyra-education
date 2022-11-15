import React from 'react';
import { Remarkable } from 'remarkable';

import styles from '../styles/components/ContentContainerSummary.module.sass';

export default function ContentContainer({ summary }) {
  const md = new Remarkable();
  md.set({
    html: true,
    breaks: true,
  });

  if (!summary) return null;

  return (
    <span
      className={styles.contentContainerSummary}
      dangerouslySetInnerHTML={{ __html: md.render(summary) }}
    />
  );
}
