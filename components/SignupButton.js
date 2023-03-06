import React from 'react';
import ReactRotatingText from 'react-rotating-text';
import PropTypes from 'prop-types';

import useService from '../hooks/useService';
import styles from '../styles/components/SignupButton.module.sass';

export default function SignupButton({ label, campaign }) {
  const { service } = useService();
  const { subscribeUrl, metadata } = service;

  if (!campaign) return null;
  if (!service) return null;

  return (
    <a href={subscribeUrl} className={styles.signupButton}>
      <span className={styles.signupButton__title}>{label}</span>
      <ReactRotatingText
        className={styles.signupButton__description}
        items={[campaign.replace(/(<([^>]+)>)/gi, ''), `Join ${metadata.title} today`]}
        pause={2500}
        emptyPause={500}
        deletingInterval={20}
        typingInterval={80}
      />
    </a>
  );
}

SignupButton.propTypes = {
  label: PropTypes.string.isRequired,
  campaign: PropTypes.string.isRequired,
};
