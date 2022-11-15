import React from 'react';
import Link from 'next/link';

import styles from '../../styles/components/OutlineContainer.module.sass';
import Icon from '../Icon';

export default function Page({ page, index }) {
  return (
    <div className={styles.outlineContainer__page}>
      {page.status === 'COMPLETED' ? (
        <span className={styles.outlineContainer__label}>
          <b>Page {index + 1}: </b>
          <Link href={page.slug}>
            <a>{page.name}</a>
          </Link>
        </span>
      ) : (
        <span className={styles.outlineContainer__label}>
          <b>Page {index + 1}: </b>
          {page.name}
        </span>
      )}
      {page.status === 'COMPLETED' && <Icon name="FaCheckCircle" />}
    </div>
  );
}
