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
};
