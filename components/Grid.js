import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/components/Grid.module.sass';

export default function Grid({ children }) {
  return <div className={styles.grid}>{children}</div>;
}

Grid.propTypes = {
  children: PropTypes.node.isRequired,
};
