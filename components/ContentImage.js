import React from 'react';

import styles from '../styles/components/ContentImage.module.sass';

import Image from './Image';

export default function ContentImage({ publicId }) {
  return (
    <div className={styles.contentImage}>
      <Image publicId={publicId} className={styles.contentImage__image} />
    </div>
  );
}
