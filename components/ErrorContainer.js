import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from '../styles/components/Error.module.sass';

export default function ErrorContainer({ statusCode }) {
  return (
    <div className={styles.error}>
      <h3 className={styles.error__title}>
        {statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}
      </h3>
      <Link href="/">
        <button className={styles.error__button} type="button">
          Return Home
        </button>
      </Link>
    </div>
  );
}

ErrorContainer.propTypes = {
  statusCode: PropTypes.string.isRequired,
};
