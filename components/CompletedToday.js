import React, { useEffect } from 'react';
import { getCookie, setCookie } from 'cookies-next';

import useCompleted from '../hooks/useCompleted';
import styles from '../styles/components/CompletedToday.module.sass';
import { addOneDay } from '../utilities/date';

import Toast from './Toast';

export default function CompletedToday() {
  const { completionStatus } = useCompleted();

  useEffect(() => {
    if (!completionStatus?.completedToday) return;

    const allowToast = getCookie('completed_today_toast');

    if (!allowToast) {
      Toast({
        type: 'success',
        title: 'Done for today',
        message:
          'You have completed your course material for today. Continue your journey <b>tomorrow</b>.',
      });
      setCookie('completed_today_toast', true, { expires: addOneDay(new Date()) });
    }
  }, [completionStatus]);

  if (!completionStatus?.completedToday) return null;

  return (
    <div className={styles.completedToday}>
      <span className={styles.completedToday__heading}>Done for today</span>
      <p>
        You have completed your course material for today.
        <br />
        Continue your journey tomorrow.
      </p>
    </div>
  );
}
