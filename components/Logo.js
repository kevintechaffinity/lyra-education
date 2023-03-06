import React from 'react';
import Link from 'next/link';

import useService from '../hooks/useService';
import styles from '../styles/components/Logo.module.sass';

import Image from './Image';

export default function Logo() {
  const { service } = useService();
  const { assets } = service;

  if (!service) return null;

  return (
    <Link href="/" className={styles.logo}>
      <Image width="128" height="48" objectFit="contain" publicId={assets.logo} alt="Logo" />
    </Link>
  );
}
