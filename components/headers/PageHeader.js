import React from 'react';
import Link from 'next/link';

import styles from '../../styles/components/PageHeader.module.sass';
import Icon from '../Icon';
import Image from '../Image';
import Loading from '../Loading';
import ScrollFade from '../ScrollFade';

const { DateTime } = require('luxon');

export default function PageHeader({ item, module, status }) {
  const button = () => {
    if (!item.progress) return <Loading />;
    const index = item.progress.findIndex((o) => o.current);
    return `Page: ${index + 1} of ${item.progress.length}`;
  };

  const durationPagination = () => (
    <>
      <Link href={`/module/${item.moduleSlug}`}>
        <a>{item.module}</a>
      </Link>{' '}
      /{' '}
      <Link href={`/module/${item.moduleSlug}`}>
        <a>{item.chapter}</a>
      </Link>
    </>
  );

  const authorFormatted = () => `by ${item.author}`;
  const dateFormatted = () => {
    if (status === 'PREVIEW')
      return `Coming: ${DateTime.fromISO(item.updatedAt, { zone: 'Africa/Johannesburg' }).toFormat(
        'L/y',
      )}`;
    return `Last Updated: ${DateTime.fromISO(item.updatedAt, {
      zone: 'Africa/Johannesburg',
    }).toFormat('L/y')}`;
  };

  return (
    <ScrollFade>
      <div className={styles.pageHeader}>
        {module.assets && (
          <Image publicId={module.assets.thumbnail} className={styles.pageHeader__image} />
        )}
        <div className={styles.pageHeader__column}>
          <h3 className={styles.pageHeader__title}>{item.name}</h3>
          {item.name && (
            <>
              <span className={styles.pageHeader__details}>
                <span className={styles.pageHeader__detailsitem}>
                  <Icon name="FaUserCircle" />
                  {authorFormatted()}
                </span>
                <span className={styles.pageHeader__detailsitem}>
                  <Icon name="FaRegCalendarAlt" />
                  {dateFormatted()}
                </span>
              </span>
              <span className={styles.pageHeader__detailsitem}>
                <Icon name="FaInbox" />
                {durationPagination()}
              </span>
            </>
          )}
        </div>
        <div className={styles.pageHeader__status}>{button()}</div>
      </div>
    </ScrollFade>
  );
}
