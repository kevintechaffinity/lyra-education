import React from 'react';

import styles from '../styles/components/ContentContainer.module.sass';

export default function ContentContainer({ children }) {
  return <div className={styles.contentContainer}>{children}</div>;
}
