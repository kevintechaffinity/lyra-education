import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import { Cloudinary } from '@cloudinary/url-gen';
import PropTypes from 'prop-types';

import styles from '../styles/components/ContentAudio.module.sass';

export default function ContentAudio({ name, publicId }) {
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dzabdxdw5',
    },
  });

  const audio = cld.video(publicId).toURL();

  return (
    <>
      <h1 className={styles.contentAudio__title}>{`Listen: ${name}`}</h1>
      <div className={styles.contentAudio}>
        <AudioPlayer src={audio} customAdditionalControls={[]} customVolumeControls={[]} />
      </div>
    </>
  );
}

ContentAudio.propTypes = {
  publicId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};
