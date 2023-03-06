import React from 'react';
import { AdvancedVideo } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { videoCodec } from '@cloudinary/url-gen/actions/transcode';
import { auto, vp9 } from '@cloudinary/url-gen/qualifiers/videoCodec';
import PropTypes from 'prop-types';

import Fallback from '../public/images/fallback.jpg';
import styles from '../styles/components/ContentVideo.module.sass';
import { BuildThumbnail } from '../utilities/cloudinary';

export default function ContentVideo({ publicId, poster }) {
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dzabdxdw5',
    },
  });

  const sources = [
    {
      type: 'mp4',
      codecs: ['avc1.4d002a'],
      transcode: videoCodec(auto()),
    },
    {
      type: 'webm',
      codecs: ['vp8', 'vorbis'],
      transcode: videoCodec(vp9()),
    },
  ];

  const myVideo = cld.video(publicId);

  return (
    <div className={styles.contentVideo}>
      <AdvancedVideo
        cldVid={myVideo}
        controls
        playsInline
        preload="true"
        poster={poster ? BuildThumbnail(poster, 1280, 720) : Fallback.src}
        sources={sources}
        className={`${styles.contentVideo__player}`}
      />
    </div>
  );
}

ContentVideo.defaultProps = {
  poster: null,
};

ContentVideo.propTypes = {
  publicId: PropTypes.string.isRequired,
  poster: PropTypes.string,
};
