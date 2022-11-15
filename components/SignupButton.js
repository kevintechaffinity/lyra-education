import React, { useContext } from 'react';
import ReactRotatingText from 'react-rotating-text';

import ServiceContext from '../context/ServiceContext';
import styles from '../styles/components/SignupButton.module.sass';

export default function SignupButton({ label, campaign }) {
  const { subscribeUrl, title } = useContext(ServiceContext);

  if (!campaign) return null;

  return (
    <a href={subscribeUrl} className={styles.signupButton}>
      <span className={styles.signupButton__title}>{label}</span>
      <ReactRotatingText
        className={styles.signupButton__description}
        items={[campaign.replace(/(<([^>]+)>)/gi, ''), `Join ${title} today`]}
        pause={2500}
        emptyPause={500}
        deletingInterval={20}
        typingInterval={80}
      />
    </a>
  );
}
