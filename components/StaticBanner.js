import React, { useContext } from 'react';

import ServiceContext from '../context/ServiceContext';
import styles from '../styles/components/StaticBanner.module.sass';

import Image from './Image';

export default function StaticBanner() {
  const { assets } = useContext(ServiceContext);

  return (
    <div className={styles.staticBanner}>
      {assets ? <Image publicId={assets.banner} className={styles.staticBanner__image} /> : ''}
    </div>
  );
}
