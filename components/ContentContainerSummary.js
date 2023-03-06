import React from 'react';
import PropTypes from 'prop-types';
import { Remarkable } from 'remarkable';

import styles from '../styles/components/ContentContainerSummary.module.sass';

export default function ContentContainerSummary({ summary }) {
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

ContentContainerSummary.propTypes = {
  summary: PropTypes.string.isRequired,
};
