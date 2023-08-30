import { buildUrl, buildVideoUrl } from 'cloudinary-build-url';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { cloudinaryCloudName } = publicRuntimeConfig;

export const BuildImageUrl = (id) =>
  buildUrl(id, {
    cloud: {
      cloudName: cloudinaryCloudName,
    },
  });

export const BuildVideoUrl = (id) =>
  buildVideoUrl(id, {
    cloud: {
      cloudName: cloudinaryCloudName,
    },
  });

export const BuildPlaceholderUrl = (id) =>
  buildUrl(id, {
    cloud: {
      cloudName: cloudinaryCloudName,
    },
    transformations: {
      effect: 'blur:1000',
      quality: 1,
    },
  });

export const BuildThumbnail = (id, width, height) =>
  buildUrl(id, {
    cloud: {
      cloudName: 'dexvrwlip',
    },
    transformations: {
      format: 'png',
      quality: 50,
      crop: 'fill',
      width,
      height,
      gravity: 'face',
    },
  });
