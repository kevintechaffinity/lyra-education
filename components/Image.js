import React from 'react';
import NextImage from 'next/legacy/image';
import PropTypes from 'prop-types';

import { BuildImageUrl, BuildPlaceholderUrl } from '../utilities/cloudinary';

export default function Image({ publicId, className, ...props }) {
  return (
    <NextImage
      placeholder="blur"
      blurDataURL={BuildPlaceholderUrl(publicId)}
      src={BuildImageUrl(publicId)}
      className={className}
      {...props}
    />
  );
}

Image.defaultProps = {
  className: null,
};

Image.propTypes = {
  publicId: PropTypes.string.isRequired,
  className: PropTypes.string,
};
