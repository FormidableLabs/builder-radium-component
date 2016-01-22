/**
 * Webpack frontend test (w/ coverage) configuration.
 */
import merge from 'lodash.merge';
import testCfg from './webpack.config.test.babel';

export default merge({}, testCfg, {
  module: {
    preLoaders: [
      // Manually instrument client code for code coverage.
      // https://github.com/deepsweet/isparta-loader handles ES6 + normal JS.
      {
        test: /src\/.*\.jsx?$/,
        exclude: /(test|node_modules)\//,
        loader: require.resolve('isparta-loader')
      }
    ]
  }
});
