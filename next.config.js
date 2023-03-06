require('dotenv').config();

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withPWA = require('next-pwa')({
  disable: process.env.APP_ENV === 'development',
  dest: 'public',
});

module.exports = withPWA(
  withBundleAnalyzer({
    reactStrictMode: false,
    publicRuntimeConfig: {
      appEnv: process.env.APP_ENV || 'production',
      hostApi: process.env.HOST_API || 'EMPTY',
      cloudinaryCloudName: 'dzabdxdw5',
    },
    images: {
      domains: ['res.cloudinary.com'],
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    async rewrites() {
      return [{ source: '/local-api/:path*', destination: '/api/:path*' }];
    },
    webpack(config) {
      return config;
    },
  }),
);
