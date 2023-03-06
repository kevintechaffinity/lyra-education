import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from '../../styles/components/OutlineContainer.module.sass';

export default function Page({ page, index }) {
  return (
    <div className={styles.outlineContainer__page}>
      {page.status === 'COMPLETED' ? (
        <span className={styles.outlineContainer__label}>
          <b>Page {index + 1}: </b>
          <Link href={page.slug}>{page.name}</Link>
        </span>
      ) : (
        <span className={styles.outlineContainer__label}>
          <b>Page {index + 1}: </b>
          {page.name}
        </span>
      )}
      {page.status === 'COMPLETED' && (
        <i className="icon">
          <FaCheckCircle />
        </i>
      )}
    </div>
  );
}

Page.propTypes = {
  page: PropTypes.shape({
    name: PropTypes.string,
    slug: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
