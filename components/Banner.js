import React, { useContext, useEffect, useState } from 'react';
import Router from 'next/router';

import ServiceContext from '../context/ServiceContext';
import { getModules } from '../services/http/Content';
import styles from '../styles/components/Banner.module.sass';

import Grid from './Grid';
import Icon from './Icon';
import Image from './Image';
import SignupButton from './SignupButton';

export default function Banner() {
  const [active, setActive] = useState(null);
  const [ready, setReady] = useState(null);

  const {
    assets,
    subscribed,
    callToAction,
    heading,
    description,
    fee,
    campaign,
    metadata,
    completedToday,
  } = useContext(ServiceContext);

  useEffect(() => {
    getModules().then((data) => {
      const activeModule = data.find((item) => item.status === 'ACTIVE');
      const readyModule = data.find((item) => item.status === 'READY');

      setActive(activeModule);
      setReady(readyModule);
    });
  }, []);

  const handleClick = (state) => {
    Router.push('/module/[module]', state.slug);
  };

  const button = () => {
    if (!subscribed && metadata.subscribe)
      return <SignupButton label={callToAction} prize={fee} campaign={campaign} />;

    if (completedToday)
      return (
        <button className={styles.banner__status} onClick={() => handleClick(active)} type="button">
          <span>{completedToday && 'Review Course'}</span>
          <Icon name="FaArrowRight" />
        </button>
      );

    if (active)
      return (
        <button className={styles.banner__status} onClick={() => handleClick(active)} type="button">
          <span>Continue Course</span>
          <Icon name="FaArrowRight" />
        </button>
      );

    if (ready)
      return (
        <button className={styles.banner__status} onClick={() => handleClick(ready)} type="button">
          <span>Start Course</span>
          <Icon name="FaArrowRight" />
        </button>
      );

    return null;
  };

  return (
    <div className={styles.banner}>
      <Image publicId={assets.banner} className={styles.banner__image} />
      <Grid>
        <div className={styles.banner__content}>
          <h1 dangerouslySetInnerHTML={{ __html: heading }} />
          <h2 dangerouslySetInnerHTML={{ __html: description }} />
          {button()}
        </div>
      </Grid>
      <div className={styles.banner__overlay} />
    </div>
  );
}
