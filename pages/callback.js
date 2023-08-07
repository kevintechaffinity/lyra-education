import React, { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { getCookie, setCookie } from 'cookies-next';
import Link from 'next/link';
import PropTypes from 'prop-types';

import Banner from '../components/Banner';
import CardContainer from '../components/CardContainer';
import GhostButton from '../components/GhostButton';
import Grid from '../components/Grid';
import Summary from '../components/Summary';
import Toast from '../components/Toast';
import useCompleted from '../hooks/useCompleted';
import useModules from '../hooks/useModules';
import useSubscribed from '../hooks/useSubscribed';
import { addOneDay } from '../utilities/date';

export default function Index({ allowPopup }) {
  const { modules } = useModules();
  const [limit, setLimit] = useState(10);
  const { completionStatus } = useCompleted();
  const { subscriptionStatus } = useSubscribed();

  useEffect(() => {
    allowPopup();
  }, [allowPopup]);

  useEffect(() => {
    if (!modules) return;
    if (completionStatus?.completedToday) return;
    if (!subscriptionStatus.subscribed) return;

    const allowToast = getCookie('course_reminder_toast');
    const activeCourse = modules.find((module) => module.status === 'ACTIVE');
    if (!activeCourse) return;

    if (!allowToast) {
      Toast({
        type: 'info',
        title: 'Reminder',
        message: `Don't forget to complete your <b>${activeCourse.name}</b> course!`,
        link: (
          <Link href={activeCourse.slug}>
            Continue
            <FaArrowRight />
          </Link>
        ),
      });
      setCookie('course_reminder_toast', true, { expires: addOneDay(new Date()) });
    }
  }, [completionStatus, subscriptionStatus, modules]);

  if (!modules) return null;

  const handleClick = () => {
    setLimit(1000);
  };

  return (
    <>
      <Banner />
      <Summary items={modules} />
      <Grid>
        <CardContainer items={modules.filter((o) => o.status !== 'COMPLETED').slice(0, limit)} />
        {modules.length >= limit && <GhostButton onClick={handleClick}>Browse more</GhostButton>}
      </Grid>
    </>
  );
}

Index.propTypes = {
  allowPopup: PropTypes.func.isRequired,
};
