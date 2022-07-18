module.exports = {
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
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
