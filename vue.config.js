module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule("eslint")
      .use("eslint-loader")
      .loader("eslint-loader")
      .tap((options) => ({
        ...options,
        fix: true,
        failOnWarning: false,
        failOnError: true,
        emitWarning: true,
      }));
  },
};
