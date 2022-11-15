require('dotenv').config();
const withImages = require('next-images');

module.exports = withImages({
  publicRuntimeConfig: {
    appEnv: process.env.APP_ENV || 'production',
    hostApi: process.env.HOST_API || 'EMPTY',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    return config;
  },
});
