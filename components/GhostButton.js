import React from 'react';
import Router from 'next/router';

import styles from '../styles/components/GhostButton.module.sass';

export default function GhostButton({ onClick, href, children, badge }) {
  const handleClick = (event) => {
    event.preventDefault();

    if (onClick) {
      onClick();
      return;
    }

    const external = href.startsWith('http');

    if (external) {
      window.location.href = href;
      return;
    }

    Router.push(href);
  };

  return (
    <div onClick={handleClick} className={styles.ghostbutton}>
      {children}
      {badge && <span className={styles.ghostbutton__badge} />}
    </div>
  );
}
