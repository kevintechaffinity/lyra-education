import React, { useContext } from 'react';
import Link from 'next/link';

import ServiceContext from '../context/ServiceContext';
import styles from '../styles/components/Footer.module.sass';

import Icon from './Icon';

export default function Footer() {
  const { title, loginUrl, unsubscribeUrl, subscribeUrl, subscribed, loggedIn, metadata } =
    useContext(ServiceContext);

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__column}>
          {!subscribed && metadata.subscribe ? (
            <a href={subscribeUrl}>
              <span dangerouslySetInnerHTML={{ __html: `Join ${title}` }} />
              <Icon name="FaAngleRight" />
            </a>
          ) : (
            <Link href="/progress">
              <a>
                Your Progress
                <Icon name="FaAngleRight" />
              </a>
            </Link>
          )}

          {!loggedIn && (
            <a href={loginUrl}>
              Login
              <Icon name="FaAngleRight" />
            </a>
          )}

          {subscribed && metadata.unsubscribe && (
            <a href={unsubscribeUrl}>
              <span dangerouslySetInnerHTML={{ __html: 'Unsubscribe' }} />
            </a>
          )}

          <Link href="/terms-and-conditions">
            <a>
              Terms and Conditions
              <Icon name="FaAngleRight" />
            </a>
          </Link>

          <div className={styles.footer__copy}>
            Copyright <b>{title}</b>. Product of <b>MaxLife</b>
            <sup style={{ fontSize: '12px', top: '-5px', position: 'relative' }}>&trade;</sup>
            <br />
            All rights reserved 2020 - {new Date().getFullYear()}.
          </div>
        </div>
      </div>
    </footer>
  );
}
