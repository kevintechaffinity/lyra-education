import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/components/Overlay.module.sass';

export default function Overlay({ children, clickBehaviour, show }) {
  return (
    <div
      onClick={clickBehaviour}
      className={show ? `${styles.overlay} ${styles.overlay__active}` : styles.overlay__inactive}
    >
      {children}
    </div>
  );
}

Overlay.defaultProps = {
  show: false,
};

Overlay.propTypes = {
  children: PropTypes.node.isRequired,
  clickBehaviour: PropTypes.func.isRequired,
  show: PropTypes.bool,
};
