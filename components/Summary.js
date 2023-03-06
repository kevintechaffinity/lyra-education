import React from 'react';
import PropTypes from 'prop-types';

import useService from '../hooks/useService';
import styles from '../styles/components/Summary.module.sass';

import CompletedToday from './CompletedToday';
import Grid from './Grid';
import ScrollFade from './ScrollFade';
import SummaryCard from './SummaryCard';

export default function Summary({ items }) {
  const { service } = useService();
  const { metadata } = service;

  if (!service) return null;

  if (items.length === 0) return null;

  const courses = items.length || 1;
  const days = items.reduce((a, b) => a + b.duration, 0);
  const completed = courses * days * 0.75;

  return (
    <ScrollFade>
      <Grid>
        <div className={styles.summary}>
          <div className={styles.summary__section}>
            <SummaryCard count={courses} description="Modules" />
            <SummaryCard count={days} description="Days" />
            <SummaryCard count={Number(completed.toFixed())} description="Completed" />
          </div>
          <div
            className={styles.summary__label}
            dangerouslySetInnerHTML={{ __html: metadata.descriptionOther }}
          />
        </div>
        <CompletedToday />
      </Grid>
    </ScrollFade>
  );
}

Summary.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      duration: PropTypes.number,
    }),
  ).isRequired,
};
