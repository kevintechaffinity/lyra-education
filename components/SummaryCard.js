import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/components/Summary.module.sass';

export default function SummaryCard({ count, description }) {
  return (
    <div className={styles.summary__card}>
      <span className={styles.summary__card_heading}>{count}+</span>
      {description}
    </div>
  );
}

SummaryCard.propTypes = {
  count: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
};
