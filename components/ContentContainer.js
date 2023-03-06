import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/components/ContentContainer.module.sass';

export default function ContentContainer({ children }) {
  return <div className={styles.contentContainer}>{children}</div>;
}

ContentContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
