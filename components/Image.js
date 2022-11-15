import React from 'react';
import { Image as ImageCloudinary } from 'cloudinary-react';

export default function Image({ publicId, className }) {
  return (
    <ImageCloudinary
      cloudName="dzabdxdw5"
      publicId={publicId}
      className={className}
      secure
      quality="auto"
      fetch_format="auto"
    />
  );
}
