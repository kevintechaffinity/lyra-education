import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/components/Hero.module.sass';

import Image from './Image';

export default function Hero({ banner }) {
  return (
    <div className={styles.hero}>
      <Image
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        publicId={banner}
        className={styles.hero__image}
        alt="Bannner"
      />
    </div>
  );
}

Hero.propTypes = {
  banner: PropTypes.string.isRequired,
};
