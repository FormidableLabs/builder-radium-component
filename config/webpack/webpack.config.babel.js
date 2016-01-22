import path from 'path';
import webpack from 'webpack';

// Replace with `__dirname` if using in project root.
const ROOT = process.cwd();

// Get Paths to give node_modules by resolving based on assumed presence of
// `package.json`.
const _archNodeModules = arch => {
  const archDir = path.dirname(
    require.resolve(path.join(arch, 'package.json'))
  );
  return path.join(archDir, 'node_modules');
};

// **Little Hacky**: Infer the filename and library name from the package name.
//
// Assumptions:
// - `package.json`'s `name` field is name of dist files.
// - PascalCased version of that name is exported class name.
const PKG = require(path.join(ROOT, 'package.json'));
const libPath = (PKG.name || '').toLowerCase();
if (!libPath) { throw new Error('Need package.json:name field'); }
// PascalCase (with first character capitalized).
const libName = libPath
  .replace(/^\s+|\s+$/g, '')
  .replace(/(^|[-_ ])+(.)/g, (match, first, second) => {
    // Second match group is the character we want to change. Throw away first.
    return second.toUpperCase();
  });

export default {
  cache: true,
  entry: path.join(ROOT, 'src/index.js'),
  externals: [
    {
      'react': {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      }
    }
  ],
  output: {
    path: path.join(ROOT, 'dist'),
    filename: libPath + '.min.js',
    library: libName,
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: [
      'node_modules',
      _archNodeModules('builder-radium-component'),
      _archNodeModules('builder-radium-component-dev')
    ]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        // **Note**: Cannot use shorthand `'babel-loader'` or `'babel'` when
        // we are playing around with `NODE_PATH` in builder. Manually
        // resolve path.
        loader: require.resolve('babel-loader'),
        query: {
          babelrc: false,
          presets: ['es2015-webpack', 'stage-0', 'react'],
          plugins: [
            'syntax-class-properties',
            'syntax-decorators',
            'transform-class-properties',
            'transform-decorators-legacy'
          ]
        }
      }, {
        test: /\.css$/,
        loader: require.resolve('style-loader') + '!' + require.resolve('css-loader')
      }, {
        test: /\.(png|jpg)$/,
        loader: require.resolve('url-loader') + '?limit=8192'
      }
    ]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      // Signal production, so that webpack removes non-production code that
      // is in condtionals like: `if (process.env.NODE_ENV === 'production')`
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.SourceMapDevToolPlugin('[file].map')
  ]
};
