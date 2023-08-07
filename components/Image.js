import React from 'react';
import NextImage from 'next/legacy/image';
import PropTypes from 'prop-types';

import { BuildImageUrl, BuildPlaceholderUrl } from '../utilities/cloudinary';

export default function Image({ publicId, className, ...props }) {
  if (publicId === undefined) {
    // eslint-disable-next-line no-param-reassign
    publicId = 'production/assets/rimavxapoouxhr8v6tmn';
  }
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
