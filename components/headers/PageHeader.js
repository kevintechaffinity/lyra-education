import React from 'react';
import { FaInbox, FaRegCalendarAlt, FaUserCircle } from 'react-icons/fa';
import { DateTime } from 'luxon';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from '../../styles/components/PageHeader.module.sass';
import Image from '../Image';
import Loading from '../Loading';
import ScrollFade from '../ScrollFade';

export default function PageHeader({ item, module }) {
  const button = () => {
    if (!item.progress) return <Loading />;
    const index = item.progress.findIndex((o) => o.current);
    return `Page: ${index + 1} of ${item.progress.length}`;
  };

  const durationPagination = () => (
    <>
      <Link href={`/module/${item.moduleSlug}`}>{item.module}</Link> /{' '}
      <Link href={`/module/${item.moduleSlug}`}>{item.chapter}</Link>
    </>
  );

  const authorFormatted = () => `by ${item.author}`;
  const dateFormatted = () =>
    `Last Updated: ${DateTime.fromISO(item.updatedAt, {
      zone: 'Africa/Johannesburg',
    }).toFormat('L/y')}`;

  return (
    <ScrollFade>
      <div className={styles.pageHeader}>
        {module.assets && (
          <Image
            width={200}
            height={160}
            objectFit="cover"
            objectPosition="top"
            publicId={module.assets.thumbnail}
            className={styles.pageHeader__image}
            alt={item.name}
          />
        )}
        <div className={styles.pageHeader__column}>
          <h3 className={styles.pageHeader__title}>{item.name}</h3>
          {item.name && (
            <>
              <span className={styles.pageHeader__details}>
                <span className={styles.pageHeader__detailsitem}>
                  <i className="icon">
                    <FaUserCircle />
                  </i>
                  {authorFormatted()}
                </span>
                <span className={styles.pageHeader__detailsitem}>
                  <i className="icon">
                    <FaRegCalendarAlt />
                  </i>
                  {dateFormatted()}
                </span>
              </span>
              <span className={styles.pageHeader__detailsitem}>
                <i className="icon">
                  <FaInbox />
                </i>
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

PageHeader.propTypes = {
  item: PropTypes.shape({
    progress: PropTypes.arrayOf(
      PropTypes.shape({
        completed: PropTypes.bool,
        current: PropTypes.bool,
      }),
    ),
    moduleSlug: PropTypes.string,
    module: PropTypes.string,
    chapter: PropTypes.string,
    author: PropTypes.string,
    updatedAt: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  module: PropTypes.shape({
    assets: PropTypes.shape({
      thumbnail: PropTypes.string,
    }),
  }).isRequired,
};
