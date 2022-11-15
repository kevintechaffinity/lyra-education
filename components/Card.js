import React, { useContext } from 'react';
import Router from 'next/router';
import pluralize from 'pluralize';
import { Remarkable } from 'remarkable';

import ServiceContext from '../context/ServiceContext';
import styles from '../styles/components/Card.module.sass';

import Icon from './Icon';
import Image from './Image';
import ScrollFade from './ScrollFade';

const { DateTime } = require('luxon');

export default function Card({ course }) {
  const { completedToday } = useContext(ServiceContext);
  const { slug, name, duration, author, updatedAt, caption, status, assets } = course;

  const button = () => {
    if (duration === 0) {
      return 'Coming soon';
    }
    if (completedToday && status === 'ACTIVE') return 'Review';
    if (status === 'READY') return 'Start now';
    if (status === 'ACTIVE') {
      return 'Continue';
    }
    if (status === 'PENDING') {
      return 'Module';
    }
    if (status === 'COMPLETED') {
      return 'Completed';
    }
    return '';
  };

  const className = () => {
    if (completedToday && status === 'ACTIVE') {
      return styles.card__review;
    }
    if (status === 'READY') {
      return styles.card__current;
    }
    if (status === 'ACTIVE') {
      return styles.card__current;
    }
    if (status === 'PREVIEW') {
      return styles.card__preview;
    }
    if (status === 'COMPLETED') {
      return styles.card__completed;
    }
    return '';
  };

  const handleClick = () => {
    if (!['READY', 'ACTIVE', 'COMPLETED'].includes(status)) return;
    Router.push('/module/[module]', slug);
  };

  const durationFormatted = () => `${duration} ${pluralize('day', duration)}`;
  const dateFormatted = () => {
    if (duration === 0) return 'Coming Soon';
    return `Last Updated: ${DateTime.fromISO(updatedAt, { zone: 'Africa/Johannesburg' }).toFormat(
      'L/y',
    )}`;
  };

  const md = new Remarkable();
  md.set({
    html: true,
    breaks: true,
  });

  return (
    <ScrollFade threshold={0.1}>
      <div onClick={() => handleClick()} className={`${styles.card} ${className()}`}>
        <span className={styles.card__status}>
          <span>{button()}</span>
          <Icon name="FaArrowRight" />
        </span>
        <Image publicId={assets.thumbnail} className={styles.card__image} />
        <div className={styles.card__column}>
          <h3 className={styles.card__title}>{name}</h3>
          <span className={styles.card__details}>
            {duration !== 0 && (
              <span className={styles.card__detailsitem}>
                <Icon name="FaInbox" />
                {durationFormatted()}
              </span>
            )}
            <span className={styles.card__detailsitem}>
              <Icon name="FaUserCircle" />
              {`by ${author}`}
            </span>
            <span className={styles.card__detailsitem}>
              <Icon name="FaRegCalendarAlt" />
              {dateFormatted()}
            </span>
          </span>
          <span
            className={styles.card__description}
            dangerouslySetInnerHTML={{ __html: md.render(caption) }}
          />
        </div>
      </div>
    </ScrollFade>
  );
}
