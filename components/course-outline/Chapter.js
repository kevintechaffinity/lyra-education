import React from 'react';
import { DateTime } from 'luxon';
import PropTypes from 'prop-types';

import styles from '../../styles/components/OutlineContainer.module.sass';

import Page from './Page';

export default function Chapter({ chapter, days, index }) {
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

Chapter.propTypes = {
  chapter: PropTypes.shape({
    name: PropTypes.string,
    pages: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        position: PropTypes.number,
        name: PropTypes.string,
        slug: PropTypes.string,
        status: PropTypes.string,
      }),
    ),
    status: PropTypes.string,
  }).isRequired,
  days: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};
