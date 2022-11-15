import React, { useContext } from 'react';
import Link from 'next/link';

import ServiceContext from '../context/ServiceContext';
import styles from '../styles/components/Logo.module.sass';

import Image from './Image';

export default function Logo() {
  const { assets } = useContext(ServiceContext);

  return (
    <Link href="/">
      <a className={styles.logo}>
        <Image publicId={assets.logo} className={styles.logo__image} />
      </a>
    </Link>
  );
}
