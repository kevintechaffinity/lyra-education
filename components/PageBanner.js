import React, { useContext } from 'react';

import ServiceContext from '../context/ServiceContext';
import styles from '../styles/components/PageBanner.module.sass';

import Image from './Image';

export default function PageBanner() {
  const { assets } = useContext(ServiceContext);

  return (
    <div className={styles.pageBanner}>
      {assets ? <Image publicId={assets.banner} className={styles.pageBanner__image} /> : ''}
    </div>
  );
}
