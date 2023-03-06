import React from 'react';
import PropTypes from 'prop-types';

import styles from '../../styles/components/OutlineContainer.module.sass';

import Chapter from './Chapter';

export default function OutlineContainer({ chapters, slug }) {
  if (!chapters) return null;
  let days = 0;

  const calcDays = (status) => {
    if (status !== 'PENDING') return days;
    days += 1;
    return days;
  };

  return (
    <div className={styles.outlineContainer}>
      <h4>Course outline</h4>
      {chapters.map((chapter, index) => (
        <Chapter
          chapter={chapter}
          key={index}
          index={index}
          days={calcDays(chapter.status)}
          slug={slug}
        />
      ))}
    </div>
  );
}

OutlineContainer.propTypes = {
  chapters: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.string,
    }),
  ).isRequired,
  slug: PropTypes.string.isRequired,
};
