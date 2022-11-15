import React, { useContext } from 'react';

import ServiceContext from '../context/ServiceContext';
import styles from '../styles/components/CompletedToday.module.sass';

export default function CompletedToday() {
  const { completedToday } = useContext(ServiceContext);
  if (!completedToday) return null;

  return (
    <div className={styles.completedToday}>
      <span className={styles.completedToday__heading}>Done for today</span>
      <p>You have completed your course material for today. Continue your journey tomorrow.</p>
    </div>
  );
}
