import React, { useContext } from 'react';

import ServiceContext from '../context/ServiceContext';
import styles from '../styles/components/ModuleBanner.module.sass';

import Image from './Image';

export default function ModuleBanner() {
  const { assets } = useContext(ServiceContext);

  return (
    <div className={styles.moduleBanner}>
      {assets ? <Image publicId={assets.banner} className={styles.moduleBanner__image} /> : ''}
    </div>
  );
}
