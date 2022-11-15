import React from 'react';

import styles from '../../styles/components/StaticHeader.module.sass';
import ScrollFade from '../ScrollFade';

export default function StaticHeader({ title, children }) {
  return (
    <ScrollFade>
      <div className={styles.staticHeader}>
        <div className={styles.staticHeader__column}>
          <h3 className={styles.staticHeader__title} dangerouslySetInnerHTML={{ __html: title }} />
          <p
            className={styles.staticHeader__description}
            dangerouslySetInnerHTML={{ __html: children }}
          />
        </div>
      </div>
    </ScrollFade>
  );
}
