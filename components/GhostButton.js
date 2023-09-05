import React from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';

import styles from '../styles/components/GhostButton.module.sass';

export default function GhostButton({ onClick, href, children }) {
  const handleClick = (event) => {
    event.preventDefault();

    if (onClick) {
      onClick();
      return;
    }

    const external = href.startsWith('http');

    if (external) {
      window.location.href = window.location.href + 'login';
      return;
    }

    Router.push(href);
  };

  return (
    <div onClick={handleClick} className={styles.ghostbutton}>
      {children}
    </div>
  );
}

GhostButton.defaultProps = {
  onClick: null,
  href: null,
};

GhostButton.propTypes = {
  onClick: PropTypes.func,
  href: PropTypes.string,
  children: PropTypes.node.isRequired,
};
