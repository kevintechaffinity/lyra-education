import React, { useContext } from 'react';

import ServiceContext from '../context/ServiceContext';
import styles from '../styles/components/Summary.module.sass';

import CompletedToday from './CompletedToday';
import Grid from './Grid';
import ScrollFade from './ScrollFade';
import SummaryCard from './SummaryCard';

export default function Summary({ items }) {
  if (items.length === 0) return '';
  const courses = items.length || 1;
  const days = items.reduce((a, b) => a + b.duration, 0);
  const completed = courses * days * 0.75;

  const { descriptionOther } = useContext(ServiceContext);

  return (
    <ScrollFade threshold={0.4}>
      <Grid>
        <div className={styles.summary}>
          <div className={styles.summary__section}>
            <SummaryCard count={courses} description="Modules" />
            <SummaryCard count={days} description="Days" />
            <SummaryCard count={completed.toFixed(0)} description="Completed" />
          </div>
          <div
            className={styles.summary__label}
            dangerouslySetInnerHTML={{ __html: descriptionOther }}
          />
        </div>
        <CompletedToday />
      </Grid>
    </ScrollFade>
  );
}
