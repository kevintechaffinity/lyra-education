import React, { useEffect, useState } from 'react';
import ReactRotatingText from 'react-rotating-text';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import useService from '../hooks/useService';
import styles from '../styles/components/SignupButton.module.sass';

export default function SignupButton({ label, campaign }) {
  const { service } = useService();
  const { subscribeUrl, metadata } = service;
  const [updatedSubscribeUrl, setUpdatedSubscribeUrl] = useState(subscribeUrl);
  const router = useRouter();
  const { galaxi } = router.query;

  const setCookie = (name, value, days) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    const cookieValue =
      encodeURIComponent(value) + (days ? `; expires=${expirationDate.toUTCString()}` : '');
    document.cookie = `${name}=${cookieValue}; path=/`;
  };

  const getCookie = (name) => {
    const cookieValue = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
    return cookieValue ? decodeURIComponent(cookieValue.pop()) : '';
  };

  useEffect(() => {
    if (galaxi) {
      setCookie('galaxi', galaxi, 7);
    }

    const myCookieValue = getCookie('galaxi');

    if (myCookieValue) {
      if (!updatedSubscribeUrl.includes('?galaxi=')) {
        const updatedUrl = `${updatedSubscribeUrl}?galaxi=${myCookieValue}`;
        setUpdatedSubscribeUrl(updatedUrl);
      }
    }
  });

  if (!campaign) return null;
  if (!service) return null;

  return (
    <a href={updatedSubscribeUrl} className={styles.signupButton}>
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
