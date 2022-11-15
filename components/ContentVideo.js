import React, { useEffect } from 'react';

import styles from '../styles/components/ContentVideo.module.sass';

export default function ContentVideo({ publicId }) {
  useEffect(() => {
    const cloudinary = window.cloudinary.Cloudinary;
    const cld = cloudinary.new({ cloud_name: 'dzabdxdw5', secure: true });

    cld.videoPlayer('asset-player', {
      controls: true,
      showLogo: false,
      hideContextMenu: true,
      floatingWhenNotVisible: 'left',
      autoShowRecommendations: false,
      fontFace: 'Source Sans Pro',
      posterOptions: {
        transformation: {
          startOffset: '0',
        },
      },
      transformation: {
        quality: 'auto',
        fetch_format: 'auto',
      },
    });
  }, []);

  return (
    <div className={styles.contentVideo}>
      <video
        data-cld-source={publicId}
        id="asset-player"
        controls
        fetch_format="auto"
        secure="true"
        className={`${styles.contentVideo__player}`}
      />
    </div>
  );
}
