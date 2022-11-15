import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import cloudinary from 'cloudinary-core';

import styles from '../styles/components/ContentAudio.module.sass';

const cloudinaryCore = new cloudinary.Cloudinary({ cloud_name: 'dzabdxdw5' });

export default function ContentAudio({ name, publicId }) {
  return (
    <>
      <h1 className={styles.contentAudio__title}>{`Listen: ${name}`}</h1>
      <div className={styles.contentAudio}>
        <AudioPlayer
          src={cloudinaryCore.video_url(publicId)}
          customAdditionalControls={[]}
          customVolumeControls={[]}
        />
      </div>
    </>
  );
}
