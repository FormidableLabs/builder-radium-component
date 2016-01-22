/**
 * Webpack frontend test configuration.
 */
import path from 'path';
import merge from 'lodash.merge';
import prodCfg from './webpack.config.babel';

// Replace with `__dirname` if using in project root.
const ROOT = process.cwd();

export default {
  cache: true,
  context: path.join(ROOT, 'test/client'),
  entry: './main',
  output: {
    filename: 'main.js',
    publicPath: '/assets/'
  },
  resolve: merge({}, prodCfg.resolve, {
    alias: {
      // Allow root import of `src/FOO` from ROOT/src.
      src: path.join(ROOT, 'src')
    }
  }),
  module: prodCfg.module,
  devtool: 'source-map'
};
