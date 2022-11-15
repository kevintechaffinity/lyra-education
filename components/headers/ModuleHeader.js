import React, { useContext } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import pluralize from 'pluralize';

import ServiceContext from '../../context/ServiceContext';
import styles from '../../styles/components/ModuleHeader.module.sass';
import Icon from '../Icon';
import Image from '../Image';
import ScrollFade from '../ScrollFade';

const { DateTime } = require('luxon');

export default function ModuleHeader({ slug, item }) {
  const { completedToday, loggedIn, loginUrl, subscribeUrl, subscribed, callToAction, metadata } =
    useContext(ServiceContext);
  const { name, duration, author, updatedAt, status, assets } = item;

  const button = () => {
    if (completedToday && status === 'ACTIVE') return 'Tomorrow';
    if (status === 'COMPLETED') return 'Completed';
    if (status === 'ACTIVE') {
      return 'Continue';
    }
    if (status === 'READY') {
      return 'Start now';
    }
    return '';
  };

  const buttonClass = () => {
    if (completedToday && status === 'ACTIVE') return '';
    if (status === 'COMPLETED') return styles.moduleHeader__review;
    if (status === 'ACTIVE') return styles.moduleHeader__current;
    if (status === 'READY') return styles.moduleHeader__current;
    return '';
  };

  const durationPagination = () => (
    <Link href="/">
      <a>Home</a>
    </Link>
  );

  const durationFormatted = () => `${duration} ${pluralize('day', parseInt(duration, 10))}`;
  const authorFormatted = () => `By ${author}`;
  const dateFormatted = () =>
    `Last Updated: ${DateTime.fromISO(updatedAt, { zone: 'Africa/Johannesburg' }).toFormat('L/y')}`;

  const handleClick = (event) => {
    event.preventDefault();
    if (!loggedIn) {
      window.location.href = loginUrl;
      return;
    }

    if (!subscribed && metadata.subscribe) {
      window.location.href = subscribeUrl;
      return;
    }
    Router.push(slug);
  };

  return (
    <ScrollFade>
      <div className={styles.moduleHeader}>
        {assets && <Image publicId={assets.thumbnail} className={styles.moduleHeader__image} />}
        <div className={styles.moduleHeader__column}>
          <h3 className={styles.moduleHeader__title}>{name}</h3>
          {name && (
            <>
              <span className={styles.moduleHeader__details}>
                <span className={styles.moduleHeader__detailsitem}>
                  <Icon name="FaInbox" />
                  {durationFormatted()}
                </span>
                <span className={styles.moduleHeader__detailsitem}>
                  <Icon name="FaUserCircle" />
                  {authorFormatted()}
                </span>
                <span className={styles.moduleHeader__detailsitem}>
                  <Icon name="FaRegCalendarAlt" />
                  {dateFormatted()}
                </span>
              </span>
              <span className={styles.moduleHeader__detailsitem}>
                <Icon name="FaAngleLeft" />
                {durationPagination()}
              </span>{' '}
            </>
          )}
        </div>

        {status === 'COMPLETED' || completedToday || !subscribed ? (
          ''
        ) : (
          <a onClick={handleClick} className={`${styles.moduleHeader__status} ${buttonClass()}`}>
            {button()}
          </a>
        )}

        {!subscribed && metadata.subscribe && (
          <a onClick={handleClick} className={`${styles.moduleHeader__status} ${buttonClass()}`}>
            {callToAction}
          </a>
        )}
      </div>
    </ScrollFade>
  );
}
