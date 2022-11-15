import React from 'react';

import styles from '../styles/components/Grid.module.sass';

export default function Grid({ children }) {
  return <div className={styles.grid}>{children}</div>;
}
