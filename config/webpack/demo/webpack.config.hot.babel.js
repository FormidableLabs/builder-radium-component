import cloneDeep from 'lodash.clonedeep';
import merge from 'lodash.merge';
import omit from 'lodash.omit';
import base from './webpack.config.dev.babel';

// Clone our own module object.
const mod = cloneDeep(base.module);
const firstLoader = mod.loaders[0];

// Update loaders array. First loader needs react-hot-loader.
firstLoader.loaders = [require.resolve('react-hot-loader')]
  .concat(firstLoader.loader ? [firstLoader.loader] : [])
  .concat(firstLoader.loaders || []);

// Remove single loader if any.
firstLoader.loader = null;

export default merge({}, omit(base, 'entry', 'module'), {
  entry: {
    app: [
      require.resolve('webpack/hot/dev-server'),
      './demo/app.jsx'
    ]
  },

  module: mod
});
