import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/components/ContentImage.module.sass';

import Image from './Image';

export default function ContentImage({ publicId }) {
  return (
    <div className={styles.contentImage}>
      <Image
        width={1280}
        height={720}
        objectFit="cover"
        publicId={publicId}
        className={styles.contentImage__image}
        alt="Content"
      />
    </div>
  );
}

ContentImage.propTypes = {
  publicId: PropTypes.number.isRequired,
};
