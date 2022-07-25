module.exports = {
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack5: true,
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
  webpack: config => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  images: {
    domains: [
      'assets.otherside.xyz',
      'connectable-events.s3.ap-northeast-2.amazonaws.com',
      'user-images.githubusercontent.com',
    ],
  },
};
